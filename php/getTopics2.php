<?php
include 'connection.php';
header("Expires: Thu, 01 Jan 1970 00:00:01 GMT");
ob_start();

    $stmt = $connection->prepare("SELECT* FROM topic");
    $stmt->bindValue(':userId',  $userId );
    $stmt->execute();

    $topics = array();
    if ($stmt->rowCount() > 0) {
        $topics = $stmt->fetchAll(PDO::FETCH_ASSOC);             
      	echo json_encode($topics, JSON_UNESCAPED_UNICODE);
    }else{
            echo "Нет данных для обработки";
        }
    $connection = null; 


?>