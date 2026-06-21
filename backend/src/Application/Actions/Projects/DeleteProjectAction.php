<?php

declare(strict_types=1);

namespace App\Application\Actions\Projects;

use App\Infrastructure\Database\Connection;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class DeleteProjectAction
{
    public function __construct(private readonly Connection $db) {}

    public function __invoke(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $userId = $request->getAttribute('user_id');
        $id = (int)$args['id'];

        $stmt = $this->db->get()->prepare(
            'DELETE FROM projects WHERE id = ? AND owner_id = ? RETURNING id'
        );
        $stmt->execute([$id, $userId]);

        if (!$stmt->fetch()) {
            $response->getBody()->write(json_encode(['error' => 'Projeto não encontrado']));
            return $response->withStatus(404)->withHeader('Content-Type', 'application/json');
        }

        return $response->withStatus(204);
    }
}
