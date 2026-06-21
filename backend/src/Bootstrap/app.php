<?php

declare(strict_types=1);

use DI\ContainerBuilder;
use Slim\Factory\AppFactory;

return function (): \Slim\App {
    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../../');
    $dotenv->safeLoad();

    $builder = new ContainerBuilder();
    $builder->addDefinitions(require __DIR__ . '/dependencies.php');
    $container = $builder->build();

    AppFactory::setContainer($container);
    $app = AppFactory::create();

    (require __DIR__ . '/middleware.php')($app);
    (require __DIR__ . '/routes.php')($app);

    return $app;
};
