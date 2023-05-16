<?php
require_once("connection.php");
ob_start();

$request_body = file_get_contents("php://input");
$data = json_decode($request_body, true);
$email = $data["email"];
$password = $data["password"];

$result = array();

$get_hashed_password = "SELECT * FROM tUtente WHERE email = '{$email}'";
$get_hashed_password_res = mysqli_query($db, $get_hashed_password);

if ($row = mysqli_fetch_assoc($get_hashed_password_res)) {
    $hashed_password = $row["password"];

    if (password_verify($password, $hashed_password)) {
        $result["user"] = "found";
        $result["name"] = $row["nome"];
    } else {
        $result["user"] = "not_found";
    }
} else {
    $result["user"] = "not_found";
}

echo json_encode($result);
