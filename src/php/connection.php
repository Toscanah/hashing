<?php
session_start();

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "hashing";
$db = new mysqli($servername, $username, $password, $dbname);