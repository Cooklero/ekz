
<?php
include 'connection.php';
header("Expires: Thu, 01 Jan 1970 00:00:01 GMT");
ob_start();

    $stmt = $connection->prepare("UPDATE `works` SET `title`=:name WHERE `id_works`= :taskId");
    $stmt->bindValue(':taskId',  $_POST['taskId']);
    $stmt->bindValue(':name',  $_POST['name'] );
    $stmt->execute();

    $connection = null; 


?>
