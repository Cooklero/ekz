<?php
include 'connection.php';
header("Expires: Thu, 01 Jan 1970 00:00:01 GMT");
ob_start();

    $subjectId = $_POST['subjectId'];
    $topicName = $_POST['topicName'];
    
echo $topicName;
echo $subjectId;
    $stmt = $connection->prepare("INSERT INTO topic (`topicName`,`subject_id`) VALUES ('$topicName', $subjectId)");
    $stmt->bindValue(':userId ',  $userId );
    $stmt->execute();

    $users = array();
    
    $connection = null; 


?>