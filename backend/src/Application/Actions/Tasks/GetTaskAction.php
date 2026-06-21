<?php

declare(strict_types=1);

namespace App\Application\Actions\Tasks;

use App\Infrastructure\Database\Connection;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class GetTaskAction
{
    public function __construct(private readonly Connection $db) {}

    public function __invoke(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $id = (int)$args['id'];
        $pdo = $this->db->get();

        $stmt = $pdo->prepare(
            'SELECT t.id, t.column_id, t.title, t.description, t.due_date, t.priority,
                    t.position_order, t.created_at, t.assignee_id, u.username AS assignee_name
             FROM tasks t
             LEFT JOIN users u ON u.id = t.assignee_id
             WHERE t.id = ?'
        );
        $stmt->execute([$id]);
        $task = $stmt->fetch();

        if (!$task) {
            $response->getBody()->write(json_encode(['error' => 'Tarefa não encontrada']));
            return $response->withStatus(404)->withHeader('Content-Type', 'application/json');
        }

        $subStmt = $pdo->prepare(
            'SELECT id, title, is_completed FROM subtasks WHERE task_id = ? ORDER BY id ASC'
        );
        $subStmt->execute([$id]);
        $task['subtasks'] = $subStmt->fetchAll();

        if ($task['assignee_id']) {
            $task['assignee_id'] = (int)$task['assignee_id'];
        }

        $response->getBody()->write(json_encode($task));
        return $response->withHeader('Content-Type', 'application/json');
    }
}
