<?php
include 'connection.php';
header("Expires: Thu, 01 Jan 1970 00:00:01 GMT");
ob_start();
    
    $stmt = $connection->prepare("UPDATE reactdb SET name = :name, email = :email, organization = :organization, phone = :phone WHERE id = :userId;");
    $stmt->bindValue(':userId',  $_POST['userId']);
    $stmt->bindValue(':name',  $_POST['name'] );
    $stmt->bindValue(':email',  $_POST['email'] );
    $stmt->bindValue(':organization',  $_POST['organization'] );
    $stmt->bindValue(':phone',  $_POST['phone'] );
    $stmt->execute();
    $connection = null; 
?>