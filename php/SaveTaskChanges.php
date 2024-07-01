<?php
include 'connection.php';
header("Expires: Thu, 01 Jan 1970 00:00:01 GMT");
ob_start();

    $stmt = $connection->prepare("UPDATE works SET type = :type, difficulty = :diff, noteText = :note, description = :descrip WHERE id_works = :taskId");
    $stmt->bindValue(':taskId',  $_POST['taskId']);
    $stmt->bindValue(':type',  $_POST['type'] );
    $stmt->bindValue(':diff',  $_POST['diff'] );
    $stmt->bindValue(':note',  $_POST['note'] );
    $stmt->bindValue(':descrip',  $_POST['descrip'] );
    $stmt->execute();
    $connection = null; 
?>