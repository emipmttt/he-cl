<?php

  require '../conn.php';

  $user = htmlentities($_POST['user']);
  $title = htmlentities($_POST['title']);
  $entitie = htmlentities($_POST['entitie']);
  $area = htmlentities($_POST['area']);
  $turn = htmlentities($_POST['turn']);
  $gender = htmlentities($_POST['gender']);
  $age = htmlentities($_POST['age']);
  $antiquity = htmlentities($_POST['antiquity']);
  $studies = htmlentities($_POST['studies']);
  $suggestion = htmlentities($_POST['suggestion']);
  $aspects = json_encode($_POST['aspect'],JSON_UNESCAPED_UNICODE);

  $sql = "INSERT INTO questionnaires values (user,campain,entitie,area,turn,gender,age,antiquity,studies,suggestion,aspects)
  VALUES ('{$user}','{$title}','{$entitie}','{$area}','{$turn}','{$gender}','{$age}','{$antiquity}','{$studies}','{$suggestion}','{$aspects}')";
  if(mysqli_query($conn, $sqlFindCampains){
    $response->status = true;
    $response->message = "¡Has concluído el cuestionario!";
    echo json_encode($response);
  } else {
    $response->status = false;
    $response->message = "¡Ha ocurrido un error al guardar tu cuestionario!";
    echo json_encode($response);
  }