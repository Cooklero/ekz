
<?php
include 'connection.php';
header("Expires: Thu, 01 Jan 1970 00:00:01 GMT");
ob_start();

    $oldPass = $_POST['OldPass'];
    $newPass = $_POST['NewPass'];
    $userId = $_POST['userId'];
    
  
    $query1 = "SELECT * FROM reactdb WHERE password = '$OldPass'  AND id = $userId";
    $result1 = $connection->query($query1);
   
    if ($result1->num_rows > 0) {
        $query2 = "UPDATE `reactdb` SET `password` = '$newPass' WHERE `login` = '$oldPass' AND `id`= userId";
        $result2 = $connection->query($query2);
        echo "Succes";
    }else{
        echo "Faile";
    }
   

    $connection = null; 



?>