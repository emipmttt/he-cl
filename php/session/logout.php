<?php

require '../conn.php';
session_destroy();
$response->status = true;
echo json_encode($response);

?>