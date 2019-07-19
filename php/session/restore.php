<?php

  require_once '../conn.php';

  $action = $_POST['action'];

  switch ($action) {
    case 'request':

      $email = $_POST['email'];
      $code = md5(time());
      $expires = date("Y-m-d g:i",strtotime(date("Y-m-d g:i")."+15 minute"));

      $sql = "INSERT INTO restoreCodes (code, email,expires) VALUES ('{$code}', '{$email}','{$expires}')";
      if (mysqli_query($conn, $sql)) {
        $response->status = true;
        if (sendEmail($email,$code)) {

          $response->status = true;
          $response->message = "Se ha enviado el correo electrónico";
          echo json_encode($response);

        }
      } else {
        $response->status = false;
        $response->message = "Ha ocurrido un error al solicitar el cambio de contraseña";
        echo json_encode($response);
      }

      break;

    case 'restore';

      $code = $_POST['code'];
      $email = $_POST['email'];
      $passwordString =$_POST['password'];
      $passwordConfirmString =$_POST['passwordConfirm'];

      if ($passwordString === $passwordConfirmString) {

        $password = password_hash($_POST['password'],PASSWORD_DEFAULT);

        $sql = "SELECT * FROM restoreCodes WHERE code = '{$code}'";
        $result = mysqli_query($conn, $sql);
        if (mysqli_num_rows($result) > 0) {
          $row = mysqli_fetch_assoc($result);

          if ($row['expires'] > date("Y-m-d g:i")) {
            $sqlFindUser = "SELECT * FROM users WHERE email = '{$row['email']}' ";
            $resultFindUser = mysqli_query($conn, $sqlFindUser);
            if (mysqli_num_rows($resultFindUser) > 0) {
              $rowFindUser = mysqli_fetch_assoc($resultFindUser);

              if ($email == $rowFindUser['email']) {
                $sqlUpdatePassword = "UPDATE users SET password='{$password}' WHERE id = '{$rowFindUser['id']}' ";
                if (mysqli_query($conn, $sqlUpdatePassword)) {
                  $sqlDeleteCode = "DELETE FROM restoreCodes WHERE code = '{$code}'";
                  mysqli_query($conn, $sqlDeleteCode);
                  $response->status = true;
                  $response->message = "Has actualizado tu contraseña correctamente";
                  echo json_encode($response);
                } else {
                  $response->status = false;
                  $response->message = "No se pudo actualizar la contraseña intentelo de nuevo más tarde.";
                  echo json_encode($response);
                }
              } else {
                $response->status = false;
                $response->message = "¿estás tratando de cambiar la contraseña de alguien más?";
                echo json_encode($response);
              }

            } else {
              $response->status = false;
              $response->message = "No existe el usuario";
              echo json_encode($response);
            }
          } else {
            $response->status = false;
            $response->message = "Esta solicitud ha expirado, solicite un cambio de contraseña nuevamente";
            $sqlDeleteCode = "DELETE FROM restoreCodes WHERE code = '{$code}'";
            mysqli_query($conn, $sqlDeleteCode);
            echo json_encode($response);
          }
        } else {

          $response->status = false;
          $response->message = "No se solicitó un cambio de contraseña";
          echo json_encode($response);

        }

      } else {
        $response->status = false;
        $response->message = "Las contraseñas no coinciden";
        echo json_encode($response);
      }



      break;

  }

  function sendEmail ($email,$code) {
    $message = '
    <div style="text-align:center;color:#333">
    <div style="width:60%;display:inline-block">
      <img src="https://nom035.human-express.com/user/img/logo.de0ec56.png">
      <p style="text-align:left">
        Recibiste este email porque solicitaste un cambio de contraseña en NOM035| human express.</p>
      <a href="https://nom035.human-express.com/#/reestablecer/'.$code.'" style="width:90%;text-decoration:none;background:#3f51b5;padding:10px 10px; border-radius:5rem;color:#e9e9e9">Restablecer contraseña</a>

      <p style="text-align:left">
        Si no solicitaste ningún cambio sólo ignora este mensaje
      </p>

      Puedes copiar y pegar el siguiente link a tu navegador:
      <br>
      <a href="https://nom035.human-express.com/#/reestablecer/'.$code.'">
        https://nom035.human-express.com/#/reestablecer/'.$code.'
      </a>

      <hr>

      <p style="text-align:left">
        El equipo de human express
      </p>


    </div>

  </div>';

    $message = utf8_decode($message);

    $title = "Reestablece tu clave para NOM035| HE ";
    $title = "=?ISO-8859-1?B?".$title."=?=";
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/html; charset=iso-8859-1\r\n";
    $headers .= "From: dsaavedra@human-express.com";

    $mail = mail($email,$title,$message,$headers);
    if($mail){
      return true;
    } else{
      return false;
    }
  }

?>
