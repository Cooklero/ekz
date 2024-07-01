<?php
include 'connection.php';
header("Expires: Thu, 01 Jan 1970 00:00:01 GMT");
ob_start();

    $userId = $_POST['userId'];
    $subjectName = $_POST['subject'];
    

    $stmt = $connection->prepare("INSERT INTO `lesson` (`lessonName`, `user_id`) VALUES ('$subjectName', $userId)");
    $stmt->bindValue(':userId ',  $userId );
    $stmt->execute();

    $users = array();
    
    $connection = null; 


?>