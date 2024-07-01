<?php
include 'connection.php';
header("Expires: Thu, 01 Jan 1970 00:00:01 GMT");
ob_start();

    $user_id = $_POST['user_id'];
    $textOfNote = $_POST['textOfNote'];
    $created_at = $_POST['created_at'];

    $stmt1 = $connection->prepare("SELECT * FROM `notes`  WHERE `created_at` = :created_at AND `userId`= :user_id");
    $stmt1->bindValue(':user_id',  $user_id );
    $stmt1->bindValue(':created_at',  $created_at );
    $stmt1->execute();
    if ($stmt1->rowCount() < 1) {
        $stmt2 = $connection->prepare("INSERT INTO  `notes` (`note_text`,`created_at`,`userId`) VALUES ( :textOfNote, :created_at, :user_id)");
        $stmt2->bindValue(':textOfNote',  $textOfNote );
        $stmt2->bindValue(':created_at',  $created_at );
        $stmt2->bindValue(':user_id',  $user_id );
        $stmt2->execute();
        echo "added";echo __DIR__;
    }else{
        $stmt3 = $connection->prepare("UPDATE `notes` SET `note_text` = :textOfNote WHERE `created_at` =:created_at AND `userId`= :user_id");
        $stmt3->bindValue(':textOfNote',  $textOfNote );
        $stmt3->bindValue(':created_at',  $created_at );
        $stmt3->bindValue(':user_id',  $user_id );
        $stmt3->execute();
        echo "changed";
    }
    $connection = null; 


?>