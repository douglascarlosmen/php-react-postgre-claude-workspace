<?php

declare(strict_types=1);

namespace App\Application\Actions\Subtasks;

use App\Infrastructure\Database\Connection;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class UpdateSubtaskAction
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
        if (isset($body['is_completed'])) {
            $fields[] = 'is_completed = ?';
            $values[] = (bool)$body['is_completed'];
        }

        if (empty($fields)) {
            $response->getBody()->write(json_encode(['error' => 'Nenhum campo para atualizar']));
            return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
        }

        $values[] = $id;
        $stmt = $this->db->get()->prepare(
            'UPDATE subtasks SET ' . implode(', ', $fields) . ' WHERE id = ?
             RETURNING id, task_id, title, is_completed'
        );
        $stmt->execute($values);
        $sub = $stmt->fetch();

        if (!$sub) {
            $response->getBody()->write(json_encode(['error' => 'Subtarefa não encontrada']));
            return $response->withStatus(404)->withHeader('Content-Type', 'application/json');
        }

        $response->getBody()->write(json_encode($sub));
        return $response->withHeader('Content-Type', 'application/json');
    }
}
