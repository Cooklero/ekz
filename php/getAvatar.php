
<?php
include 'connection.php';
header("Expires: Thu, 01 Jan 1970 00:00:01 GMT");
ob_start();

    $userId = $_POST['userId'];
    
    
    $stmt = $connection->prepare("SELECT avatar FROM reactdb  WHERE id =:userId");
    $stmt->bindValue(':userId ',  $userId );
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        
            $avatar = base64_encode($row['avatar']);
            $row["avatar"];
               
                ob_end_clean();    
                echo $avatar;
        
    } else {
        echo "Нет данных для обработки";
    }

    $connection = null; 


?>
