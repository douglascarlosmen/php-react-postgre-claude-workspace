<?php

declare(strict_types=1);

namespace App\Application\Actions\Projects;

use App\Infrastructure\Database\Connection;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class UpdateProjectAction
{
    public function __construct(private readonly Connection $db) {}

    public function __invoke(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $userId = $request->getAttribute('user_id');
        $body = (array)$request->getParsedBody();
        $name = trim((string)($body['name'] ?? ''));
        $id = (int)$args['id'];

        if (!$name) {
            $response->getBody()->write(json_encode(['error' => 'Nome é obrigatório']));
            return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
        }

        $stmt = $this->db->get()->prepare(
            'UPDATE projects SET name = ? WHERE id = ? AND owner_id = ? RETURNING id, name, created_at'
        );
        $stmt->execute([$name, $id, $userId]);
        $project = $stmt->fetch();

        if (!$project) {
            $response->getBody()->write(json_encode(['error' => 'Projeto não encontrado']));
            return $response->withStatus(404)->withHeader('Content-Type', 'application/json');
        }

        $response->getBody()->write(json_encode($project));
        return $response->withHeader('Content-Type', 'application/json');
    }
}
