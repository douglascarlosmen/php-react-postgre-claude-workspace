<?php

declare(strict_types=1);

namespace App\Application\Actions\Boards;

use App\Infrastructure\Database\Connection;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class CreateBoardAction
{
    public function __construct(private readonly Connection $db) {}

    public function __invoke(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $userId = $request->getAttribute('user_id');
        $projectId = (int)$args['id'];
        $body = (array)$request->getParsedBody();
        $name = trim((string)($body['name'] ?? ''));

        if (!$name) {
            $response->getBody()->write(json_encode(['error' => 'Nome é obrigatório']));
            return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
        }

        $check = $this->db->get()->prepare('SELECT id FROM projects WHERE id = ? AND owner_id = ?');
        $check->execute([$projectId, $userId]);
        if (!$check->fetch()) {
            $response->getBody()->write(json_encode(['error' => 'Projeto não encontrado']));
            return $response->withStatus(404)->withHeader('Content-Type', 'application/json');
        }

        $stmt = $this->db->get()->prepare(
            'INSERT INTO boards (project_id, name) VALUES (?, ?) RETURNING id, project_id, name, created_at'
        );
        $stmt->execute([$projectId, $name]);

        $response->getBody()->write(json_encode($stmt->fetch()));
        return $response->withStatus(201)->withHeader('Content-Type', 'application/json');
    }
}
