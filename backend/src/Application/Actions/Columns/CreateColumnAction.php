<?php

declare(strict_types=1);

namespace App\Application\Actions\Columns;

use App\Infrastructure\Database\Connection;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class CreateColumnAction
{
    public function __construct(private readonly Connection $db) {}

    public function __invoke(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $boardId = (int)$args['id'];
        $body = (array)$request->getParsedBody();
        $name = trim((string)($body['name'] ?? ''));

        if (!$name) {
            $response->getBody()->write(json_encode(['error' => 'Nome é obrigatório']));
            return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
        }

        $maxStmt = $this->db->get()->prepare(
            'SELECT COALESCE(MAX(position_order), 0) AS max_pos FROM columns WHERE board_id = ?'
        );
        $maxStmt->execute([$boardId]);
        $maxPos = (int)$maxStmt->fetchColumn();

        $stmt = $this->db->get()->prepare(
            'INSERT INTO columns (board_id, name, position_order) VALUES (?, ?, ?)
             RETURNING id, board_id, name, position_order'
        );
        $stmt->execute([$boardId, $name, $maxPos + 1000]);

        $col = $stmt->fetch();
        $col['tasks'] = [];

        $response->getBody()->write(json_encode($col));
        return $response->withStatus(201)->withHeader('Content-Type', 'application/json');
    }
}
