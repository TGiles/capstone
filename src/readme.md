The production source of my capstone project.

In this source there are only the essential files in order to run this web application through a local server. You must have a local server with an active internet connection for this web app to run correctly. In addition you MUST have a MySQL database running and available. Please reference either of the PHP files to see what I used for credentials for connection to the database.
Your MySQL database must have the following columns in a table of your choosing:

1. PaperID, char(7), primary key, cannot be null.
1. whoFrom, text, cannot be null.
1. Date, text, cannot be null.
1. Title, text, cannot be null.
1. Authors, text, cannot be null.
1. Journal, text, can be null.
1. Abstract, mediumtext, cannot be null.

After creating this in a MySQL database, run the initialize.php file to populate your database with the necessary records. Your table should be around 25.3 MiB after populating.

After this, simply go to the bootstrap.html page and the application should be loaded up.
