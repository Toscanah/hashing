<?php
require_once("connection.php");
ob_start();

$request_body = file_get_contents("php://input");
$data = json_decode($request_body, true);
$name = $data["name"];
$surname = $data["surname"];
$email = $data["email"];
$password = $data["password"];

$result = array();

$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

$get_existing_account = "SELECT * FROM tUtente WHERE email = '{$email}'";
if (mysqli_num_rows(mysqli_query($db, $get_existing_account)) == 0) {
    $add_account = "INSERT INTO tUtente (nome, cognome, email, password)
                VALUES ('{$name}', '{$surname}', '{$email}', '{$hashedPassword}')";
    mysqli_query($db, $add_account);
    $result["result"] = "success";
} else {
    $result["result"] = "error";
}

echo json_encode($result);