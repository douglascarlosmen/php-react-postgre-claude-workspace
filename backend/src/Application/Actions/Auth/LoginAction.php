<?php

declare(strict_types=1);

namespace App\Application\Actions\Auth;

use App\Infrastructure\Database\Connection;
use Firebase\JWT\JWT;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class LoginAction
{
    public function __construct(private readonly Connection $db) {}

    public function __invoke(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        $body = (array)$request->getParsedBody();
        $username = trim((string)($body['username'] ?? ''));
        $password = (string)($body['password'] ?? '');

        if (!$username || !$password) {
            return $this->json($response, ['error' => 'Usuário e senha são obrigatórios'], 400);
        }

        $stmt = $this->db->get()->prepare(
            'SELECT id, username, password_hash FROM users WHERE username = ?'
        );
        $stmt->execute([$username]);
        $user = $stmt->fetch();

        if (!$user || !password_verify($password, $user['password_hash'])) {
            return $this->json($response, ['error' => 'Credenciais inválidas'], 401);
        }

        $secret = $_ENV['JWT_SECRET'] ?? 'kanban_jwt_secret_32_chars_min_x';
        $now = time();
        $payload = [
            'sub' => $user['id'],
            'username' => $user['username'],
            'iat' => $now,
            'exp' => $now + 86400,
        ];

        $token = JWT::encode($payload, $secret, 'HS256');

        return $this->json($response, [
            'token' => $token,
            'user' => ['id' => $user['id'], 'username' => $user['username']],
        ]);
    }

    private function json(ResponseInterface $response, mixed $data, int $status = 200): ResponseInterface
    {
        $response->getBody()->write(json_encode($data));
        return $response->withStatus($status)->withHeader('Content-Type', 'application/json');
    }
}
