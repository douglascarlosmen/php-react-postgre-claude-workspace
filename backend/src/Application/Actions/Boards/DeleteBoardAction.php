<?php

declare(strict_types=1);

namespace App\Application\Actions\Boards;

use App\Infrastructure\Database\Connection;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class DeleteBoardAction
{
    public function __construct(private readonly Connection $db) {}

    public function __invoke(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $userId = $request->getAttribute('user_id');
        $id = (int)$args['id'];

        $stmt = $this->db->get()->prepare(
            'DELETE FROM boards WHERE id = ? AND project_id IN
             (SELECT id FROM projects WHERE owner_id = ?) RETURNING id'
        );
        $stmt->execute([$id, $userId]);

        if (!$stmt->fetch()) {
            $response->getBody()->write(json_encode(['error' => 'Board não encontrado']));
            return $response->withStatus(404)->withHeader('Content-Type', 'application/json');
        }

        return $response->withStatus(204);
    }
}
