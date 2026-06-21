<?php

declare(strict_types=1);

namespace App\Application\Actions\Columns;

use App\Infrastructure\Database\Connection;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class ListColumnsAction
{
    public function __construct(private readonly Connection $db) {}

    public function __invoke(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $boardId = (int)$args['id'];

        $stmt = $this->db->get()->prepare(
            'SELECT c.id, c.name, c.position_order,
                    t.id AS task_id, t.title, t.priority, t.due_date,
                    t.position_order AS task_order, t.assignee_id,
                    u.username AS assignee_name
             FROM columns c
             LEFT JOIN tasks t ON t.column_id = c.id
             LEFT JOIN users u ON u.id = t.assignee_id
             WHERE c.board_id = ?
             ORDER BY c.position_order ASC, t.position_order ASC'
        );
        $stmt->execute([$boardId]);

        $rows = $stmt->fetchAll();
        $columns = [];

        foreach ($rows as $row) {
            $colId = $row['id'];
            if (!isset($columns[$colId])) {
                $columns[$colId] = [
                    'id' => $row['id'],
                    'name' => $row['name'],
                    'position_order' => (int)$row['position_order'],
                    'tasks' => [],
                ];
            }

            if ($row['task_id'] !== null) {
                $columns[$colId]['tasks'][] = [
                    'id' => (int)$row['task_id'],
                    'title' => $row['title'],
                    'priority' => $row['priority'],
                    'due_date' => $row['due_date'],
                    'position_order' => (int)$row['task_order'],
                    'assignee_id' => $row['assignee_id'] ? (int)$row['assignee_id'] : null,
                    'assignee_name' => $row['assignee_name'],
                    'column_id' => $colId,
                ];
            }
        }

        $response->getBody()->write(json_encode(array_values($columns)));
        return $response->withHeader('Content-Type', 'application/json');
    }
}
