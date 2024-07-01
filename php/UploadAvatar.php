<?php
include 'connection.php';
header("Expires: Thu, 01 Jan 1970 00:00:01 GMT");
ob_start();
$id = $_POST['userId'];


    
// if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Check if a file was uploaded without errors
    // if (isset($_FILES["file"]) && $_FILES["file"]["error"] == 0) {
        $target_dir = "uploads/"; // Change this to the desired directory for uploaded files
        $target_file = $target_dir . basename($_FILES["file"]["name"]);
        $file_type = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

       
            if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
                // File upload success, now store information in the database
                $stmt = $connection->prepare("UPDATE `reactdb` SET `avatarPath`=:filePath WHERE `id`=:userId");
                $stmt->bindValue(':userId',  $_POST['taskId'] );
                $stmt->bindValue(':filename',  $_FILES["file"]["name"] );
                $stmt->bindValue(':filePath', 'http://buildv125/php/uploads/' . $_FILES["file"]["name"]);
                $stmt->execute();
                
            }
                
$connection = null; 
?>

