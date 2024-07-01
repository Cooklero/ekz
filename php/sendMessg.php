<?php 
include 'connection.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/Exception.php';

require 'phpmailer/src/SMTP.php';

header("Expires: Thu, 01 Jan 1970 00:00:01 GMT");
ob_start();
$mess = $_POST['message'];

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
$mail->setFrom('EKZamn@yandex.ru', 'Your Name');
$mail->addAddress('fandokin@yandex.ru', 'nik');
$mail->Subject = 'Subject of the Email';
$mail->Body = "<p>$mess</p>";

// Отправляем письмо
if ($mail->send()) {
    echo 'Email sent successfully';
} else {
    echo 'Error sending email: ' . $mail->ErrorInfo;
}
?>