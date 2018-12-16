<?php

  require '../conn.php';

  $user = stript_tags($_POST['user']);
  $title = stript_tags($_POST['title']);
  $entitie = stript_tags($_POST['entitie']);
  $area = stript_tags($_POST['area']);
  $turn = stript_tags($_POST['turn']);
  $gender = stript_tags($_POST['gender']);
  $age = stript_tags($_POST['age']);
  $antiquity = stript_tags($_POST['antiquity']);
  $studies = stript_tags($_POST['studies']);
  $suggestion = stript_tags($_POST['suggestion']);
  $aspects = json_encode(json_decode($_POST['aspects']),JSON_UNESCAPED_UNICODE);

  $sql = "INSERT INTO questionnaires (user,campain,entitie,area,turn,gender,age,antiquity,studies,suggestion,aspects)
  VALUES ('{$user}','{$title}','{$entitie}','{$area}','{$turn}','{$gender}','{$age}','{$antiquity}','{$studies}','{$suggestion}','{$aspects}')";
  if(mysqli_query($conn, $sql)){
    $response->status = true;
    $response->message = "¡Has concluído el cuestionario!";
    echo json_encode($response);
  } else {
    $response->status = false;
    $response->message = "¡Ha ocurrido un error al guardar tu cuestionario!";
    $response->sql = $sql;
    $response->aspects = $aspects;
    echo json_encode($response);
  }
