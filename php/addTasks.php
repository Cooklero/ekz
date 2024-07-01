<?php
include 'connection.php';
header("Expires: Thu, 01 Jan 1970 00:00:01 GMT");
ob_start();

    $prId = $_POST['prId'];
    $taskName = $_POST['taskName'];
    $diff = $_POST['diff'];
    $time = $_POST['time'];
    $type = $_POST['type'];
    $haveSolution = $_POST['haveSolution'];
    $haveFiles = $_POST['haveFiles'];
    $taskDate = $_POST['taskDate'];
    echo $prId;
    echo $taskName;
    echo $diff;
    echo $time;
    echo $type;
    echo $haveSolution;
    echo $haveFiles;
    echo $taskDate;

    $stmt = $connection->prepare("INSERT INTO works (`title`,`id_pr`,`difficulty`,`time`,`type`,`HaveSolut`,`HaveFile`,`date`) VALUES ('$taskName', $prId,'$diff',$time,'$type','$haveSolution','$haveFiles','$taskDate')");
    $stmt->bindValue(':userId ',  $userId );
    
    $stmt->execute();

  
    
    $connection = null; 


?>