<?php

declare(strict_types=1);

namespace App\Application\Actions\Projects;

use App\Infrastructure\Database\Connection;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class CreateProjectAction
{
    public function __construct(private readonly Connection $db) {}

    public function __invoke(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        $userId = $request->getAttribute('user_id');
        $body = (array)$request->getParsedBody();
        $name = trim((string)($body['name'] ?? ''));

        if (!$name) {
            $response->getBody()->write(json_encode(['error' => 'Nome é obrigatório']));
            return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
        }

        $stmt = $this->db->get()->prepare(
            'INSERT INTO projects (name, owner_id) VALUES (?, ?) RETURNING id, name, created_at'
        );
        $stmt->execute([$name, $userId]);

        $response->getBody()->write(json_encode($stmt->fetch()));
        return $response->withStatus(201)->withHeader('Content-Type', 'application/json');
    }
}
