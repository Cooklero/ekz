<?php
$servername = "127.0.0.1";
$username = "root";
$password = "";
$dbname = "kst";

$connection = new mysqli($servername, $username, $password, $dbname);

if ($connection->connect_error) {
    die("Ошибка соединения с базой данных: " . $connection->connect_error);
}
?>