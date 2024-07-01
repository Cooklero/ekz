
<?php
include 'connection.php';
header("Expires: Thu, 01 Jan 1970 00:00:01 GMT");
ob_start();

    $code = $_POST['code'];
    $pass = $_POST['pass'];


    $query2 = "SELECT name FROM reactdb WHERE recovCode = '$code'";
    $result2 = $connection->query($query2);
    if ($result2->num_rows > 0) {
         $stmt = $connection->prepare("UPDATE `reactdb` SET `password` = '$pass' WHERE recovCode = '$code'");
        $stmt->bindValue(':userId ',  $userId );
    $stmt->execute();
        echo "Succes";
    }else{
        echo "Faile";
    }
   
    
    $connection = null; 


?>