<?php
require_once("connection.php");
ob_start();

$request_body = file_get_contents("php://input");
$data = json_decode($request_body, true);
$email = $data["email"];
$password = $data["password"];

$result = array();

$get_user = 
    "SELECT * FROM tUtente 
    WHERE email={$email} AND password={$password}";
$get_user_res = mysqli_query($get_user);

if (mysqli_num_rows($get_user_res) == 0) {
    $result["user"] = "not_found";
} else {
    $id = mysqli_fetch_array($get_user_res)["id"];
    $result["user"] = "found";
    $result["id"] = $id;
    $_SESSION["userId"] = $id;
}

echo json_encode($result);