<?php

declare(strict_types=1);

namespace App\Application\Actions\Tasks;

use App\Infrastructure\Database\Connection;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class CreateTaskAction
{
    public function __construct(private readonly Connection $db) {}

    public function __invoke(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $columnId = (int)$args['id'];
        $body = (array)$request->getParsedBody();
        $title = trim((string)($body['title'] ?? ''));

        if (!$title) {
            $response->getBody()->write(json_encode(['error' => 'Título é obrigatório']));
            return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
        }

        $maxStmt = $this->db->get()->prepare(
            'SELECT COALESCE(MAX(position_order), 0) FROM tasks WHERE column_id = ?'
        );
        $maxStmt->execute([$columnId]);
        $maxPos = (int)$maxStmt->fetchColumn();

        $stmt = $this->db->get()->prepare(
            'INSERT INTO tasks (column_id, title, position_order) VALUES (?, ?, ?)
             RETURNING id, column_id, title, priority, due_date, assignee_id, position_order, created_at'
        );
        $stmt->execute([$columnId, $title, $maxPos + 1000]);

        $response->getBody()->write(json_encode($stmt->fetch()));
        return $response->withStatus(201)->withHeader('Content-Type', 'application/json');
    }
}
