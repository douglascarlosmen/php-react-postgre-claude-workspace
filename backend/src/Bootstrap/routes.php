<?php

declare(strict_types=1);

use App\Application\Actions\Auth\LoginAction;
use App\Application\Actions\Auth\MeAction;
use App\Application\Actions\Boards\CreateBoardAction;
use App\Application\Actions\Boards\DeleteBoardAction;
use App\Application\Actions\Boards\ListBoardsAction;
use App\Application\Actions\Boards\UpdateBoardAction;
use App\Application\Actions\Columns\CreateColumnAction;
use App\Application\Actions\Columns\DeleteColumnAction;
use App\Application\Actions\Columns\ListColumnsAction;
use App\Application\Actions\Columns\ReorderColumnsAction;
use App\Application\Actions\Columns\UpdateColumnAction;
use App\Application\Actions\Projects\CreateProjectAction;
use App\Application\Actions\Projects\DeleteProjectAction;
use App\Application\Actions\Projects\ListProjectsAction;
use App\Application\Actions\Projects\UpdateProjectAction;
use App\Application\Actions\Subtasks\CreateSubtaskAction;
use App\Application\Actions\Subtasks\DeleteSubtaskAction;
use App\Application\Actions\Subtasks\UpdateSubtaskAction;
use App\Application\Actions\Tasks\CreateTaskAction;
use App\Application\Actions\Tasks\DeleteTaskAction;
use App\Application\Actions\Tasks\GetTaskAction;
use App\Application\Actions\Tasks\ListUsersAction;
use App\Application\Actions\Tasks\MoveTaskAction;
use App\Application\Actions\Tasks\UpdateTaskAction;
use App\Application\Middleware\JwtAuthMiddleware;
use Slim\App;
use Slim\Routing\RouteCollectorProxy;

return function (App $app): void {
    $app->post('/api/auth/login', LoginAction::class);

    $app->group('/api', function (RouteCollectorProxy $group) {
        $group->get('/auth/me', MeAction::class);
        $group->get('/users', ListUsersAction::class);

        $group->get('/projects', ListProjectsAction::class);
        $group->post('/projects', CreateProjectAction::class);
        $group->put('/projects/{id}', UpdateProjectAction::class);
        $group->delete('/projects/{id}', DeleteProjectAction::class);

        $group->get('/projects/{id}/boards', ListBoardsAction::class);
        $group->post('/projects/{id}/boards', CreateBoardAction::class);
        $group->put('/boards/{id}', UpdateBoardAction::class);
        $group->delete('/boards/{id}', DeleteBoardAction::class);

        $group->get('/boards/{id}/columns', ListColumnsAction::class);
        $group->post('/boards/{id}/columns', CreateColumnAction::class);
        $group->patch('/boards/{id}/columns/reorder', ReorderColumnsAction::class);
        $group->put('/columns/{id}', UpdateColumnAction::class);
        $group->delete('/columns/{id}', DeleteColumnAction::class);

        $group->post('/columns/{id}/tasks', CreateTaskAction::class);
        $group->get('/tasks/{id}', GetTaskAction::class);
        $group->put('/tasks/{id}', UpdateTaskAction::class);
        $group->delete('/tasks/{id}', DeleteTaskAction::class);
        $group->patch('/tasks/{id}/move', MoveTaskAction::class);

        $group->post('/tasks/{id}/subtasks', CreateSubtaskAction::class);
        $group->put('/subtasks/{id}', UpdateSubtaskAction::class);
        $group->delete('/subtasks/{id}', DeleteSubtaskAction::class);
    })->add(JwtAuthMiddleware::class);
};
