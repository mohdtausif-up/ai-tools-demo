<?php
// Contact Us page for text-tools
include 'header.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Contact Us - Text Tools</title>
    <meta name="description" content="Contact the Text Tools team for support, feedback, or partnership opportunities.">
    <meta name="robots" content="index,follow">
</head>
<body>
    <h1>Contact Us</h1>
    <form method="post" action="contact.php">
        <input type="hidden" name="csrf_token" value="<?php echo bin2hex(random_bytes(32)); ?>">
        <label for="name">Name:</label><br>
        <input type="text" id="name" name="name" required><br>
        <label for="email">Email:</label><br>
        <input type="email" id="email" name="email" required><br>
        <label for="message">Message:</label><br>
        <textarea id="message" name="message" required></textarea><br>
        <button type="submit">Send</button>
    </form>
</body>
</html>
<?php
include 'footer.php';
?>