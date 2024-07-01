<?php
include 'connection.php';
header("Expires: Thu, 01 Jan 1970 00:00:01 GMT");
ob_start();
  
    $stmt = $connection->prepare("SELECT * FROM `pr`");
    $stmt->bindValue(':userId ',  $userId );
    $stmt->execute();

    $pr = array();
    if ($stmt->rowCount() > 0) {
        $pr = $stmt->fetchAll(PDO::FETCH_ASSOC);        
      	echo json_encode($pr, JSON_UNESCAPED_UNICODE);
    }else {
            echo "Нет данных для обработки";
        }
    $connection = null; 


?>