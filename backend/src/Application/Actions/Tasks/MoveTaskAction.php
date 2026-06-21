<?php

declare(strict_types=1);

namespace App\Application\Actions\Tasks;

use App\Infrastructure\Database\Connection;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class MoveTaskAction
{
    public function __construct(private readonly Connection $db) {}

    public function __invoke(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $id = (int)$args['id'];
        $body = (array)$request->getParsedBody();
        $columnId = isset($body['column_id']) ? (int)$body['column_id'] : null;
        $positionOrder = isset($body['position_order']) ? (int)$body['position_order'] : null;

        if ($columnId === null || $positionOrder === null) {
            $response->getBody()->write(json_encode(['error' => 'column_id e position_order são obrigatórios']));
            return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
        }

        $pdo = $this->db->get();
        $pdo->beginTransaction();

        try {
            $pdo->prepare(
                'UPDATE tasks SET position_order = position_order + 1
                 WHERE column_id = ? AND position_order >= ? AND id != ?'
            )->execute([$columnId, $positionOrder, $id]);

            $stmt = $pdo->prepare(
                'UPDATE tasks SET column_id = ?, position_order = ? WHERE id = ?
                 RETURNING id, column_id, title, priority, due_date, assignee_id, position_order'
            );
            $stmt->execute([$columnId, $positionOrder, $id]);
            $task = $stmt->fetch();

            $pdo->commit();

            if (!$task) {
                $response->getBody()->write(json_encode(['error' => 'Tarefa não encontrada']));
                return $response->withStatus(404)->withHeader('Content-Type', 'application/json');
            }

            $response->getBody()->write(json_encode($task));
            return $response->withHeader('Content-Type', 'application/json');
        } catch (\Throwable $e) {
            $pdo->rollBack();
            $response->getBody()->write(json_encode(['error' => 'Erro ao mover tarefa']));
            return $response->withStatus(500)->withHeader('Content-Type', 'application/json');
        }
    }
}
