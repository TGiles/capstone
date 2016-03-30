<?php
$servername = "localhost";
$username = "d3";
$password = "d3user";
$dbname = "capstone";
$q = $_GET["q"];
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$sql = "SELECT * FROM data WHERE PaperID ='".$q."'";
$result = mysqli_query($conn,$sql);
while($row = mysqli_fetch_row($result))
{
	echo json_encode($row);
}

mysqli_free_result($result);
mysqli_close($conn);
?>

