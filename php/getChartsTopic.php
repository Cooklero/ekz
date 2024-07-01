<?php
include 'connection.php';
header("Expires: Thu, 01 Jan 1970 00:00:01 GMT");
ob_start();
    $id = $_POST['subject_id'];

    $stmt = $connection->prepare("SELECT* FROM topic WHERE  subject_id = :id");
    $stmt->bindValue(':id',  $id );
    $stmt->execute();

    $topics = array();
    if ($stmt->rowCount() > 0) {
        $topics = $stmt->fetchAll(PDO::FETCH_ASSOC);         
      	echo json_encode($topics, JSON_UNESCAPED_UNICODE);
    }else{
        $topics[]="Нет данных для обработки";
        echo json_encode($topics, JSON_UNESCAPED_UNICODE);
        }
    $connection = null; 


?>