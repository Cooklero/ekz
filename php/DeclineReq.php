<?php
include 'connection.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/Exception.php';

require 'phpmailer/src/SMTP.php';

header("Expires: Thu, 01 Jan 1970 00:00:01 GMT");
ob_start();
$id = $_POST['id'];
$addres = $_POST['email'];
echo $addres;
    $stmt = $connection->prepare("DELETE FROM reactdb WHERE `id` = $id");
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
$mail->Body = '<title>Отказ в регистрации аккаунта</title> <p>К сожалению, ваша заявка на регистрацию аккаунта была отклонена.</p>  <p>Если у вас есть какие-либо вопросы или вы считаете, что отказ был ошибочным, пожалуйста, свяжитесь с нашей службой поддержки.</p>';

// Отправляем письмо
if ($mail->send()) {
    echo 'Email sent successfully';
} else {
    echo 'Error sending email: ' . $mail->ErrorInfo;
}
?>
