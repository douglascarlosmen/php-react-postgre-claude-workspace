<?php

declare(strict_types=1);

namespace App\Application\Actions\Columns;

use App\Infrastructure\Database\Connection;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class UpdateColumnAction
{
    public function __construct(private readonly Connection $db) {}

    public function __invoke(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $id = (int)$args['id'];
        $body = (array)$request->getParsedBody();
        $name = trim((string)($body['name'] ?? ''));

        if (!$name) {
            $response->getBody()->write(json_encode(['error' => 'Nome é obrigatório']));
            return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
        }

        $stmt = $this->db->get()->prepare(
            'UPDATE columns SET name = ? WHERE id = ? RETURNING id, board_id, name, position_order'
        );
        $stmt->execute([$name, $id]);
        $col = $stmt->fetch();

        if (!$col) {
            $response->getBody()->write(json_encode(['error' => 'Coluna não encontrada']));
            return $response->withStatus(404)->withHeader('Content-Type', 'application/json');
        }

        $response->getBody()->write(json_encode($col));
        return $response->withHeader('Content-Type', 'application/json');
    }
}
