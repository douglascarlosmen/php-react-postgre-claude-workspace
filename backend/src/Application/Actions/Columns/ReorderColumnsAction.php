<?php

declare(strict_types=1);

namespace App\Application\Actions\Columns;

use App\Infrastructure\Database\Connection;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class ReorderColumnsAction
{
    public function __construct(private readonly Connection $db) {}

    public function __invoke(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $body = (array)$request->getParsedBody();
        $order = $body['order'] ?? [];

        if (!is_array($order) || empty($order)) {
            $response->getBody()->write(json_encode(['error' => 'order[] é obrigatório']));
            return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
        }

        $pdo = $this->db->get();
        $stmt = $pdo->prepare('UPDATE columns SET position_order = ? WHERE id = ?');

        foreach ($order as $index => $colId) {
            $stmt->execute([($index + 1) * 1000, (int)$colId]);
        }

        $response->getBody()->write(json_encode(['success' => true]));
        return $response->withHeader('Content-Type', 'application/json');
    }
}
