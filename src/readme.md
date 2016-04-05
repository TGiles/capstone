The production source of my capstone project.

In this source there are only the essential files in order to run this web application through a local server. You must have a local server with an active internet connection for this web app to run correctly. In addition you MUST have a MySQL database running and available. Please reference either of the PHP files to see what I used for credentials for connection to the database.
Your MySQL database must have the following columns in a table of your choosing:
PaperID, char(7), primary key, cannot be null.
whoFrom, text, cannot be null.
Date, text, cannot be null.
Title, text, cannot be null.
Authors, text, cannot be null.
Journal, text, can be null.
Abstract, mediumtext, cannot be null.

After creating this in a MySQL database, run the initialize.php file to populate your database with the necessary records. Your table should be around 25.3 MiB after populating.

After this, simply go to the bootstrap.html page and the application should be loaded up.
