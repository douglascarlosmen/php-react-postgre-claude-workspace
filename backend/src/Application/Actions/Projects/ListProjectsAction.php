<?php

declare(strict_types=1);

namespace App\Application\Actions\Projects;

use App\Infrastructure\Database\Connection;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class ListProjectsAction
{
    public function __construct(private readonly Connection $db) {}

    public function __invoke(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        $userId = $request->getAttribute('user_id');

        $stmt = $this->db->get()->prepare(
            'SELECT id, name, created_at FROM projects WHERE owner_id = ? ORDER BY created_at DESC'
        );
        $stmt->execute([$userId]);

        $response->getBody()->write(json_encode($stmt->fetchAll()));
        return $response->withHeader('Content-Type', 'application/json');
    }
}
