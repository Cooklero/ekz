<?php
include 'connection.php';
header("Expires: Thu, 01 Jan 1970 00:00:01 GMT");
ob_start();
    $id = $_POST['subject_id'];

    $stmt = $connection->prepare("SELECT difficulty, COUNT(*) as variaty FROM lesson JOIN topic on lesson.lesson_id = topic.subject_id JOIN pr on topic.topic_id = pr.id_topic JOIN works on pr.pr_id = works.id_pr WHERE subject_id =:userId GROUP BY difficulty ORDER by CASE `difficulty` WHEN '1 уровень' THEN 1 WHEN '2 уровень' THEN 2 WHEN '3 уровень' THEN 3 WHEN '4 уровень' THEN 4 WHEN '5 уровень' THEN 5 WHEN '6 уровень' THEN 6 END");
    $stmt->bindValue(':userId',  $id );
    $stmt->execute();

    $difficulties = array();
    if ($stmt->rowCount() > 0) {
        $difficulties = $stmt->fetchAll(PDO::FETCH_ASSOC);         
      	echo json_encode($difficulties, JSON_UNESCAPED_UNICODE);
    }else{
        $difficulties[]="Нет данных для обработки";
            echo json_encode($difficulties, JSON_UNESCAPED_UNICODE);
        }
    $connection = null; 


?>