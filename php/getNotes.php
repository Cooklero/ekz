<?php
include 'connection.php';
header("Expires: Thu, 01 Jan 1970 00:00:01 GMT");
ob_start();
    $id = $_POST['userId'];
    
    $stmt = $connection->prepare("SELECT note_text, created_at FROM `notes` WHERE userId =:id;");
    $stmt->bindValue(':id',  $id);
    $stmt->execute();
    $notes = array();
    if ($stmt->rowCount() > 0) {
        $notes = $stmt->fetchAll(PDO::FETCH_ASSOC);       
      	echo json_encode($notes, JSON_UNESCAPED_UNICODE);
    }else{
        $notes[]="Нет данных для обработки";
        echo json_encode($notes, JSON_UNESCAPED_UNICODE);
        }
    $connection = null; 
?>