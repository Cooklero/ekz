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
$login = $_POST['login'];
echo $addres;
    $stmt = $connection->prepare("UPDATE `reactdb` SET `login` = '$login' WHERE `id` = $id";
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
$mail->Body = "<title>Ваша заявка была одобрена</title><p>Мы рады сообщить вам, что ваша заява на регистрацию была одобрена. Ваш логин: $login </p><p>Для регистрации, пожалуйста, пройдите по следующей ссылке и используйте выданный вам логин.</p><a href='http://example.com'>Регистрация</a><p>После регистрации вы сможете получить доступ к личному кабинету</p><p>Если у вас возникнут вопросы или трудности, не стесняйтесь обращаться к нам по контактным данным, указанным на сайте.</p>";

// Отправляем письмо
if ($mail->send()) {
    echo 'Email sent successfully';
} else {
    echo 'Error sending email: ' . $mail->ErrorInfo;
}
?>
