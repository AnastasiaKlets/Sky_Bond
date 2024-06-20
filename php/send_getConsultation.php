<?php

$token = "7090713063:AAHAnxgBAXscTYjc6GgfH6vsOCVdKtz4v6s";
$chat_id = "-4222894671";

$phone = ($_POST['phone']);
$theme = ($_POST['theme']);
$name = ($_POST['name']);
$message = ($_POST['message']);

$utm_source = $_POST['utm_source'];
$utm_medium = $_POST['utm_medium'];
$utm_campaign = $_POST['utm_campaign'];
$utm_content = $_POST['utm_content'];
$utm_term = $_POST['utm_term'];

$arr = array(
    'Сайт:' => '...',
    'Тема:' => $theme,
    'Телефон:' => $phone,
    'Имя:' => $name,
    'Текст сообщения:' => $message,
    '' => '',
    'UTM метки' => '',
    'utm_source:' => $utm_source,
    'utm_medium:' => $utm_medium,
    'utm_campaign:' => $utm_campaign,
    'utm_content:' => $utm_content,
    'utm_term:' => $utm_term,
);

foreach($arr as $key => $value) {
    $txt .= "<b>".$key."</b> ".$value."%0A";
};

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

?>
