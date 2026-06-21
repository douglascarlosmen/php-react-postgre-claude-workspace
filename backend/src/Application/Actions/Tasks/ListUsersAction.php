<?php

declare(strict_types=1);

namespace App\Application\Actions\Tasks;

use App\Infrastructure\Database\Connection;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class ListUsersAction
{
    public function __construct(private readonly Connection $db) {}

    public function __invoke(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        $stmt = $this->db->get()->query('SELECT id, username FROM users ORDER BY username ASC');

        $response->getBody()->write(json_encode($stmt->fetchAll()));
        return $response->withHeader('Content-Type', 'application/json');
    }
}
