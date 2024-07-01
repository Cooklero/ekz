<?php
include 'connection.php';
header("Expires: Thu, 01 Jan 1970 00:00:01 GMT");
ob_start();

    $id_topic = $_POST['topicId'];
    $prName = $_POST['prName'];
    $prDiff = $_POST['prDiff'];
    echo $prName;
    echo $id_topic;
    echo $prDiff;

    $stmt = $connection->prepare("INSERT INTO pr (`prName`,`prDiff`,`id_topic`) VALUES ('$prName', '$prDiff',$id_topic)");
    $stmt->bindValue(':userId',  $userId );
    $stmt->execute();
    
    $connection = null; 


?>