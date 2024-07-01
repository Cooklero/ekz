<?php
include 'connection.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/Exception.php';

require 'phpmailer/src/SMTP.php';

header("Expires: Thu, 01 Jan 1970 00:00:01 GMT");
ob_start();
$addres = $_POST['email'];
$query2 = "SELECT name FROM reactdb WHERE email ='$addres'";

$result2 = $connection->query($query2);
if ($result2->num_rows > 0) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $code = '';
    for ($i = 0; $i < 6; $i++) {
        $code .= $characters[rand(0, $charactersLength - 1)];
    }

    $stmt = $connection->prepare("UPDATE `reactdb` SET `recovCode` = '$code' WHERE `email` = '$addres'";
    $stmt->bindValue(':userId ',  $userId );
    $stmt->execute();

    $connection = null; 

        
    // Создаем экземпляр PHPMailer
    $mail = new PHPMailer();

    // Устанавливаем параметры SMTP сервера
    $mail->isSMTP();
    $mail->isHTML(true);
    $mail->Host = 'smtp.yandex.ru';
    $mail->SMTPAuth = true;
    $mail->Username = 'EKZamn@yandex.ru';
    $mail->Password = 'gqqjmnjeemlvgsya';
    $mail->SMTPSecure = 'ssl';
    $mail->Port = 465;

    // Устанавливаем параметры письма
    $mail->setFrom('EKZamn@yandex.ru', 'ЭКЗ');
    $mail->addAddress($addres, 'nik');
    $mail->Subject = 'Решение по поводу вашей заявки';
    $mail->Body = "<title>Восстановление пароля</title> <p>Ваш код для восстановления пароля:$code</p>";

    // Отправляем письмо
    if ($mail->send()) {
        echo 'Succes';
    } else {
        echo 'Error sending email: ' . $mail->ErrorInfo;
    }
}else{
    echo 'Faile';
}
?>
