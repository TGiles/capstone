<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "capstone";
$file2 = fopen("outputABS.tsv","r");
$file1 = fopen("Output1-3-2.tsv","r");

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
$delimiter1 = "\n";
$delimiter2 = "\t";
$test1 = fgets($file1);
$test2 = fgets($file2);
echo "This is test1 ".$test1;
echo "This is test2 ".$test2;
while(!feof($file1))
{
	$line = fgets($file1);
	$line2 = fgets($file2);
	$file1Contents = explode($delimiter2, $line);
	$file2Contents = explode($delimiter2, $line2);
	$PaperID = $file1Contents[0];
	$whoFrom = $file1Contents[1];
	$Date = $file1Contents[2];
	$Title = $file1Contents[3];
	$Authors = $file1Contents[4];
	$Journal = $file1Contents[5];
	$Abstract = $file2Contents[1];
	$AbstractR = mysqli_real_escape_string($conn,$Abstract);
	$PaperIDR = mysqli_real_escape_string($conn,$PaperID);
	$whoFromR = mysqli_real_escape_string($conn,$whoFrom);
	$DateR = mysqli_real_escape_string($conn,$Date);
	$TitleR = mysqli_real_escape_string($conn,$Title);
	$AuthorsR = mysqli_real_escape_string($conn,$Authors);
	$JournalR = mysqli_real_escape_string($conn,$Journal);
	$sql = "INSERT INTO Data (PaperID, whoFrom, Date, Title, Authors, Journal, Abstract)
VALUES ('".$PaperIDR."', '".$whoFromR."', '".$DateR."', '".$TitleR."','".$AuthorsR."','".$JournalR."','".$AbstractR."')";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully: ".$PaperID;
    echo "<br>";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}



}

$conn->close();
fclose($file1);
fclose($file2);
?>