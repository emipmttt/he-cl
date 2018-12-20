<?php

require_once '../conn.php';
session_destroy();
$response->status = true;
echo json_encode($response);

?>
