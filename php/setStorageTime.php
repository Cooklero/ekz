<?php
include 'connection.php';
header("Expires: Thu, 01 Jan 1970 00:00:01 GMT");
ob_start();

    $stmt = $connection->prepare("UPDATE reactdb SET  noteStorageTime = :noteStorageTime WHERE id = :userId;");
    $stmt->bindValue(':userId',  $_POST['userId'] );
    $stmt->bindValue(':noteStorageTime',  $_POST['noteStorageTime'] );
    $stmt->execute();
    $connection = null; 
?>