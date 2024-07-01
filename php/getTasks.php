<?php
include 'connection.php';
header("Expires: Thu, 01 Jan 1970 00:00:01 GMT");
ob_start();

    $stmt = $connection->prepare("SELECT id_works, id_pr, description, title, difficulty, type, time, noteText, HaveSolut, date, filePath, solutPath, HaveFile, solutName, fileName FROM `works`");
    $stmt->bindValue(':userId ',  $userId );
    $stmt->execute();

    $tasks = array();
    if ($stmt->rowCount() > 0) {
        $tasks = $stmt->fetchAll(PDO::FETCH_ASSOC);        
      	echo json_encode($tasks, JSON_UNESCAPED_UNICODE);
    }else {
            echo "Нет данных для обработки";
        }
    $connection = null; 


?>
