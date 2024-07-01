
<?php
include 'connection.php';
header("Expires: Thu, 01 Jan 1970 00:00:01 GMT");
ob_start();

    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $org = $_POST['org'];

    $stmt1 = $connection->prepare("SELECT name FROM reactdb WHERE name = '$name' OR email ='$email' OR phone = '$phone'");
    $stmt1->bindValue(':name',  $name );
    $stmt1->bindValue(':email',  $email );
    $stmt1->bindValue(':phone',  $phone );
    $stmt1->execute();
    if ($stmt1->rowCount()  < 1) {
        $stmt2 = $connection->prepare("INSERT INTO `reactdb` (`name`, `email`, `phone`, `organization`) VALUES (:name, :email, :phone, :organization)");
        $stmt2->bindValue(':name',  $name );
        $stmt2->bindValue(':email',  $email );
        $stmt2->bindValue(':phone',  $phone );
        $stmt2->bindValue(':organization',  $organization );
        $stmt2->execute();
        echo "Succes";
    }else{
        echo "Faile";
    }
   
    
    $connection = null; 


?>