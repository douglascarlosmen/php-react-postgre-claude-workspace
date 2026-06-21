<?php

declare(strict_types=1);

namespace App\Application\Actions\Subtasks;

use App\Infrastructure\Database\Connection;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class CreateSubtaskAction
{
    public function __construct(private readonly Connection $db) {}

    public function __invoke(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $taskId = (int)$args['id'];
        $body = (array)$request->getParsedBody();
        $title = trim((string)($body['title'] ?? ''));

        if (!$title) {
            $response->getBody()->write(json_encode(['error' => 'Título é obrigatório']));
            return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
        }

        $stmt = $this->db->get()->prepare(
            'INSERT INTO subtasks (task_id, title) VALUES (?, ?) RETURNING id, task_id, title, is_completed'
        );
        $stmt->execute([$taskId, $title]);

        $response->getBody()->write(json_encode($stmt->fetch()));
        return $response->withStatus(201)->withHeader('Content-Type', 'application/json');
    }
}
