<?php
include 'connection.php';
header("Expires: Thu, 01 Jan 1970 00:00:01 GMT");
ob_start();
$id = $_POST['taskId'];

    $stmt = $connection->prepare("DELETE FROM works WHERE `id_works` = $id");
    $stmt->bindValue(':userId ',  $userId );
    $stmt->execute();

    $connection = null; 


?>
