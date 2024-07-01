<?php
include 'connection.php';
header("Expires: Thu, 01 Jan 1970 00:00:01 GMT");
ob_start();
  
    $stmt = $connection->prepare("SELECT* FROM reactdb WHERE login is NULL AND password is NULL");
    $stmt->execute();

    $users = array();
    if ($stmt->rowCount() > 0) {
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);        
      	echo json_encode($users, JSON_UNESCAPED_UNICODE);
    }else {
            echo "Нет данных для обработки";
        }
    $connection = null; 


?>