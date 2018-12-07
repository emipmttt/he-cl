<?php

  session_start();
  error_reporting(E_ERROR | E_PARSE);
  date_default_timezone_set('America/Mexico_City');  
  header("Access-Control-Allow-Origin: *"); 

  $response = new stdClass();

  $DATABASE_SERVER = "localhost";
  $DATABASE_USER = "humanexpress_clima-laboral"; 
  $DATABASE_PASSWORD = "climadbpass";
  $DATABASE_NAME = "humanexpress_clima-laboral";

  $conn = mysqli_connect($DATABASE_SERVER, $DATABASE_USER, $DATABASE_PASSWORD, $DATABASE_NAME);
  mysqli_set_charset($conn,"utf8");

  if (!$conn) {
      $response->status = false;
      $response->message = "01: Ha ocurrido un error de conexión con el servidor, intentalo más tarde ";
      echo json_encode($response);
  }

  function dateNow () {
    return date("Y-m-d");
  }

  function getUserData ($conn,$id) {
    $sqlGetUserData = "SELECT * FROM users WHERE id = '{$id}' "; 
    $resultGetUserData = mysqli_query($conn, $sqlGetUserData);
    if (mysqli_num_rows($resultGetUserData) > 0) {
      $rowGetUserData = mysqli_fetch_assoc($resultGetUserData);

      $_SESSION['id'] = $rowGetUserData['id'];
      $_SESSION['name'] = $rowGetUserData['name'];
      $_SESSION['phone'] = $rowGetUserData['phone'];
      $_SESSION['email'] = $rowGetUserData['email'];
      $_SESSION['properties'] = json_decode($rowGetUserData['properties']);

      return $_SESSION;
      
    } else {
      return false;
    }
  }

  function weekOfMonth($date) {
    //Get the first day of the month. 
    $firstOfMonth = strtotime(date("Y-m-01", strtotime($date))); 
    //Apply above formula. 
    return intval(date("W", strtotime($date))) - intval(date("W", $firstOfMonth)) + 1; 
  } 

  function getRealIP() {

    if (isset($_SERVER["HTTP_CLIENT_IP"])) {
      return $_SERVER["HTTP_CLIENT_IP"];
    } else if(isset($_SERVER["HTTP_X_FORWARDED_FOR"])) {
      return $_SERVER["HTTP_X_FORWARDED_FOR"];
    } else if(isset($_SERVER["HTTP_X_FORWARDED"])) {
      return $_SERVER["HTTP_X_FORWARDED"];
    } else if(isset($_SERVER["HTTP_FORWARDED_FOR"])) {
      return $_SERVER["HTTP_FORWARDED_FOR"];
    } else if(isset($_SERVER["HTTP_FORWARDED"])) {
      return $_SERVER["HTTP_FORWARDED"];
    } else {
      return $_SERVER["REMOTE_ADDR"];
    }

  }

?>