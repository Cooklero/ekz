<?php
include 'connection.php';
header("Expires: Thu, 01 Jan 1970 00:00:01 GMT");
ob_start();
  
    $stmt = $connection->prepare("SELECT * FROM `alllesons` ORDER BY `subject_name` ASC");
    $stmt->execute();

    $subjects = array();
    if ($stmt->rowCount() > 0) {
        $subjects = $stmt->fetchAll(PDO::FETCH_ASSOC);        
      	echo json_encode($subjects, JSON_UNESCAPED_UNICODE);
    }else {
            echo "Нет данных для обработки";
        }
    $connection = null; 


?>