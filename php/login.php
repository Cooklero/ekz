<?php
include 'connection.php';
header("Expires: Thu, 01 Jan 1970 00:00:01 GMT");
ob_start();

    
    $username = $_POST['login'];
    $password = $_POST['password'];

    $stmt = $connection->prepare("SELECT * FROM `reactdb` WHERE login = :username");    
    $stmt->bindValue(':username', $username);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
    
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
            $id = $row["id"];
            $hashedPasswordFromDatabase = $row["password"];
            $fir = $row["login"];
            $isAdm = $row["isAdmin"];
            $name = $row["name"];
            $email = $row["email"];
            $phone = $row["phone"];
            $organization = $row["organization"];
            
            if (password_verify($password, $hashedPasswordFromDatabase)) 
            {
                
                ob_end_clean();
                if($isAdm == 1){
                    echo "Admin access";
                    
                }else{
                    echo "Access;$id;$name;$email;$phone;$organization;$isAdm"; 
                }
                
               
                
            }
            else{
                ob_end_clean();
                echo "Access denied";
              
            }
        
    } else {
        echo "Нет данных для обработки";
    }

    $connection = null; 


?>
