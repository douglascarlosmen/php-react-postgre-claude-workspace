<?php

declare(strict_types=1);

namespace App\Application\Actions\Boards;

use App\Infrastructure\Database\Connection;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class ListBoardsAction
{
    public function __construct(private readonly Connection $db) {}

    public function __invoke(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $userId = $request->getAttribute('user_id');
        $projectId = (int)$args['id'];

        $stmt = $this->db->get()->prepare(
            'SELECT b.id, b.name, b.created_at FROM boards b
             JOIN projects p ON p.id = b.project_id
             WHERE b.project_id = ? AND p.owner_id = ?
             ORDER BY b.created_at ASC'
        );
        $stmt->execute([$projectId, $userId]);

        $response->getBody()->write(json_encode($stmt->fetchAll()));
        return $response->withHeader('Content-Type', 'application/json');
    }
}
