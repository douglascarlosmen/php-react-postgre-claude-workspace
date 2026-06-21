<?php

declare(strict_types=1);

namespace App\Application\Actions\Columns;

use App\Infrastructure\Database\Connection;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class DeleteColumnAction
{
    public function __construct(private readonly Connection $db) {}

    public function __invoke(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $id = (int)$args['id'];

        $stmt = $this->db->get()->prepare('DELETE FROM columns WHERE id = ? RETURNING id');
        $stmt->execute([$id]);

        if (!$stmt->fetch()) {
            $response->getBody()->write(json_encode(['error' => 'Coluna não encontrada']));
            return $response->withStatus(404)->withHeader('Content-Type', 'application/json');
        }

        return $response->withStatus(204);
    }
}
