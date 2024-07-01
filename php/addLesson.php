<?php
include 'connection.php';
header("Expires: Thu, 01 Jan 1970 00:00:01 GMT");
ob_start();

    $stmt = $connection->prepare("INSERT INTO `alllesons` (`subject_name`) VALUES (:lesson)");
    $stmt->bindValue(':lesson',  $_POST['lesson'] );
    $stmt->execute();

    $connection = null; 


?>
