<?php

if (isset($_POST['name']) && $_POST['name'] !== '') {
  $name = '<b>Имя:</b><br>' . $_POST["name"] . "<br><br>";
}
if (isset($_POST['phone']) && $_POST['phone'] !== '') {
  $phone = '<b>Телефон:</b><br>' . $_POST["phone"] . "<br><br>";
}
if (isset($_POST['email']) && $_POST['email'] !== '') {
  $email = '<b>Почта:</b><br>' . $_POST["email"] . "<br><br>";
}
if (isset($_POST['phone'])) {

  $to = 'wotkad@gmail.com';
  $from = 'wotkad@gmail.com';

  $mime_boundary="==Multipart_Boundary_x".md5(mt_rand())."x";

  $headers = "From: $from\r\n" .
  "MIME-Version: 1.0\r\n" .
  "Content-Type: multipart/mixed;\r\n" .
  " boundary=\"{$mime_boundary}\"";

  $body = "
    <h2>Обратная связь с сайта svoboda.fitness</h2>
    $name
    $phone
    $email
  ";

  @mail($to, $subject, $multipart, $headers);
}
?>