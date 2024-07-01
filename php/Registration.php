<?php
include 'connection.php';
header("Expires: Thu, 01 Jan 1970 00:00:01 GMT");
ob_start();

    $login = $_POST['login'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $password = $_POST['pass'];

    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
  
    $stmt = $connection->prepare("SELECT * FROM reactdb WHERE login = :login  AND password is NULL");
    $stmt->bindValue(':login', $login);
    $stmt->execute();
   
    if ($stmt->rowCount() > 0) {
        $stmt2 = $connection->prepare("UPDATE reactdb SET password  = :password , email  = :email ,  phone  = :phone  WHERE login  = :login ");
        
        $stmt2->bindValue(':login', $login);
        $stmt2->bindValue(':password', $hashedPassword);
        $stmt2->bindValue(':email', $email);
        $stmt2->bindValue(':phone', $phone);

        $stmt2->execute();
        echo "Succes";
    }else{
        echo "Faile";
    }
   

    $connection = null; 



?>