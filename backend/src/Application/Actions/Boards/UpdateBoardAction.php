<?php

declare(strict_types=1);

namespace App\Application\Actions\Boards;

use App\Infrastructure\Database\Connection;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class UpdateBoardAction
{
    public function __construct(private readonly Connection $db) {}

    public function __invoke(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $userId = $request->getAttribute('user_id');
        $id = (int)$args['id'];
        $body = (array)$request->getParsedBody();
        $name = trim((string)($body['name'] ?? ''));

        if (!$name) {
            $response->getBody()->write(json_encode(['error' => 'Nome é obrigatório']));
            return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
        }

        $stmt = $this->db->get()->prepare(
            'UPDATE boards SET name = ? WHERE id = ? AND project_id IN
             (SELECT id FROM projects WHERE owner_id = ?)
             RETURNING id, project_id, name, created_at'
        );
        $stmt->execute([$name, $id, $userId]);
        $board = $stmt->fetch();

        if (!$board) {
            $response->getBody()->write(json_encode(['error' => 'Board não encontrado']));
            return $response->withStatus(404)->withHeader('Content-Type', 'application/json');
        }

        $response->getBody()->write(json_encode($board));
        return $response->withHeader('Content-Type', 'application/json');
    }
}
