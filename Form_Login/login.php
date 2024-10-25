<?php
// Koneksi ke database
$conn = new mysqli('localhost', 'root', '', '04tplp034');

if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT); // Mengenkripsi password

    // Cek apakah username sudah terdaftar
    $sql_check = "SELECT * FROM users WHERE username='$username'";
    $result = $conn->query($sql_check);

    if ($result->num_rows > 0) {
        echo "Username sudah digunakan!";
    } else {
        // Insert data ke database
        $sql = "INSERT INTO users (username, password) VALUES ('$username', '$password')";
        if ($conn->query($sql) === TRUE) {
            echo "Pendaftaran berhasil!";
            header("Location: login.html"); // Redirect ke halaman login
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    }
}
$conn->close();
?>
