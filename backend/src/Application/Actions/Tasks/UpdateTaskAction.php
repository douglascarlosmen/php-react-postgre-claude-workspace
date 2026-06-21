<?php

declare(strict_types=1);

namespace App\Application\Actions\Tasks;

use App\Infrastructure\Database\Connection;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class UpdateTaskAction
{
    public function __construct(private readonly Connection $db) {}

    public function __invoke(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $id = (int)$args['id'];
        $body = (array)$request->getParsedBody();

        $fields = [];
        $values = [];

        if (isset($body['title'])) {
            $fields[] = 'title = ?';
            $values[] = trim((string)$body['title']);
        }
        if (array_key_exists('description', $body)) {
            $fields[] = 'description = ?';
            $values[] = $body['description'] ?: null;
        }
        if (array_key_exists('due_date', $body)) {
            $fields[] = 'due_date = ?';
            $values[] = $body['due_date'] ?: null;
        }
        if (array_key_exists('priority', $body)) {
            $fields[] = 'priority = ?';
            $values[] = $body['priority'] ?: null;
        }
        if (array_key_exists('assignee_id', $body)) {
            $fields[] = 'assignee_id = ?';
            $values[] = $body['assignee_id'] ? (int)$body['assignee_id'] : null;
        }
        if (isset($body['column_id'])) {
            $fields[] = 'column_id = ?';
            $values[] = (int)$body['column_id'];
        }

        if (empty($fields)) {
            $response->getBody()->write(json_encode(['error' => 'Nenhum campo para atualizar']));
            return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
        }

        $values[] = $id;
        $sql = 'UPDATE tasks SET ' . implode(', ', $fields) . ' WHERE id = ?
                RETURNING id, column_id, title, description, due_date, priority, assignee_id, position_order, created_at';

        $stmt = $this->db->get()->prepare($sql);
        $stmt->execute($values);
        $task = $stmt->fetch();

        if (!$task) {
            $response->getBody()->write(json_encode(['error' => 'Tarefa não encontrada']));
            return $response->withStatus(404)->withHeader('Content-Type', 'application/json');
        }

        $response->getBody()->write(json_encode($task));
        return $response->withHeader('Content-Type', 'application/json');
    }
}
