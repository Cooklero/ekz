<?php
include 'connection.php';
header("Expires: Thu, 01 Jan 1970 00:00:01 GMT");
ob_start();
    $id = $_POST['userId'];
    $stmt = $connection->prepare("SELECT lesson_id, lessonName FROM reactdb JOIN lesson ON reactdb.id = lesson.user_id WHERE id = :userId");
    $stmt->bindValue(':userId',  $id );
    $stmt->execute();

    $lessons = array();
    if ($stmt->rowCount() > 0) {
        $lessons = $stmt->fetchAll(PDO::FETCH_ASSOC);         
      	echo json_encode($lessons, JSON_UNESCAPED_UNICODE);
    }else{
            echo "Нет данных для обработки";
        }
    $connection = null; 


?>