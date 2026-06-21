<?php

declare(strict_types=1);

use App\Infrastructure\Database\Connection;
use DI\ContainerBuilder;
use Psr\Container\ContainerInterface;

return [
    Connection::class => function (ContainerInterface $c): Connection {
        return new Connection(
            host: $_ENV['DB_HOST'] ?? 'postgres',
            port: (int)($_ENV['DB_PORT'] ?? 5432),
            dbname: $_ENV['DB_NAME'] ?? 'myapp_db',
            user: $_ENV['DB_USER'] ?? 'postgres',
            password: $_ENV['DB_PASS'] ?? 'postgres',
        );
    },
];
