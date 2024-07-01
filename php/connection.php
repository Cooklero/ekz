<?php
// Данные для подключения к базе данных
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "kst";

// Создание объекта PDO с использованием DSN (Data Source Name)
try {
    $connection = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    // Установка режима ошибок PDO в исключения для более удобной обработки ошибок
    $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

} catch(PDOException $e) {
    echo "Ошибка подключения: " . $e->getMessage();
}

?>