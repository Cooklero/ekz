<?php
include 'connection.php';
header("Expires: Thu, 01 Jan 1970 00:00:01 GMT");
ob_start();

    $username = $_POST['login'];
    $password = $_POST['password'];
    echo $username;
    echo $password;
    $stmt = $connection->prepare("SELECT * FROM `reactdb`";
    $stmt->bindValue(':userId ',  $userId );
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
            $pas = $row["password"];
            $fir = $row["login"];
            echo $username;
            echo $password;
            echo $pas;
            echo $fir;


            if ($pas == $password)
            {
                ob_end_clean();
           
                echo $pas;
            echo $fir;
            }
            else{
                ob_end_clean();
                echo $pas;
            echo $fir;
              
            }
        }
    } else {
        echo "Нет данных для обработки";
    }

    $connection = null; 


?>
