<?php

declare(strict_types=1);

use App\Application\Middleware\CorsMiddleware;
use Slim\App;

return function (App $app): void {
    $app->addBodyParsingMiddleware();
    $app->addRoutingMiddleware();
    $app->add(CorsMiddleware::class);
    $app->addErrorMiddleware(
        displayErrorDetails: ($_ENV['APP_ENV'] ?? 'production') === 'development',
        logErrors: true,
        logErrorDetails: true,
    );
};
