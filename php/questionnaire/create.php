<?php

require_once '../conn.php';

$user = $_POST['user'];
$title = $_POST['title'];
$entitie = $_POST['entitie'];
$area = $_POST['area'];
$turn = $_POST['turn'];
$gender = $_POST['gender'];
$age = $_POST['age'];
$antiquity = $_POST['antiquity'];
$studies = $_POST['studies'];
$suggestion = $_POST['suggestion'];
$numberOfParticipants = $_POST['numberOfParticipants'];
$campain = $_POST['campain'];
$aspects = json_encode(json_decode($_POST['aspects']), JSON_UNESCAPED_UNICODE);

$sqlCreateQuestionnaire = "INSERT INTO questionnaires (user,campain,entitie,area,turn,gender,age,antiquity,studies,suggestion,aspects)
  VALUES ('{$user}','{$title}','{$entitie}','{$area}','{$turn}','{$gender}','{$age}','{$antiquity}','{$studies}','{$suggestion}','{$aspects}')";
if (mysqli_query($conn, $sqlCreateQuestionnaire)) {
    $response->status = true;
    $response->message = "¡Has concluído el cuestionario!";
    echo json_encode($response);
} else {
    $response->status = false;
    $response->message = "¡Ha ocurrido un error al guardar tu cuestionario!";
    $response->sql = $sqlCreateQuestionnaire;
    $response->aspects = $aspects;
    echo json_encode($response);
}
