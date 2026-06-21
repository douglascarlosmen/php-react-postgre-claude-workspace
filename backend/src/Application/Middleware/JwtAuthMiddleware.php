<?php

declare(strict_types=1);

namespace App\Application\Middleware;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Slim\Psr7\Response;

class JwtAuthMiddleware implements MiddlewareInterface
{
    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
    {
        $authHeader = $request->getHeaderLine('Authorization');

        if (!$authHeader || !str_starts_with($authHeader, 'Bearer ')) {
            return $this->unauthorized();
        }

        $token = substr($authHeader, 7);

        try {
            $secret = $_ENV['JWT_SECRET'] ?? 'kanban_jwt_secret_32_chars_min_x';
            $decoded = JWT::decode($token, new Key($secret, 'HS256'));
            $request = $request->withAttribute('user_id', (int)$decoded->sub);
            return $handler->handle($request);
        } catch (\Throwable) {
            return $this->unauthorized();
        }
    }

    private function unauthorized(): ResponseInterface
    {
        $response = new Response();
        $response->getBody()->write(json_encode(['error' => 'Não autorizado']));
        return $response
            ->withStatus(401)
            ->withHeader('Content-Type', 'application/json');
    }
}
