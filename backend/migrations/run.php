<?php

declare(strict_types=1);

require __DIR__ . '/../vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->safeLoad();

$host = $_ENV['DB_HOST'] ?? 'postgres';
$port = $_ENV['DB_PORT'] ?? '5432';
$dbname = $_ENV['DB_NAME'] ?? 'myapp_db';
$user = $_ENV['DB_USER'] ?? 'postgres';
$pass = $_ENV['DB_PASS'] ?? 'postgres';

$pdo = new PDO(
    "pgsql:host=$host;port=$port;dbname=$dbname",
    $user,
    $pass,
    [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
);

$files = glob(__DIR__ . '/*.sql');
sort($files);

foreach ($files as $file) {
    echo "Running: " . basename($file) . "\n";
    $sql = file_get_contents($file);
    $pdo->exec($sql);
    echo "Done: " . basename($file) . "\n";
}

echo "All migrations completed.\n";
