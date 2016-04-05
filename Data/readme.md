In this folder is the data I used from Stanford's Large Network Dataset.
The Cit-HepTh (2) shows all of the relationships between papers.
cit-HepTh-abstracts is a zipped directory of abstract files for each paper. Each file is simply a text file with .abs for a file extension.
Use the corresponding Java applications to condense the abstract directory into two files for use in the initialization of the MySQL database.
D3 also uses one of the output files in creating the force graph. Refer to the latest version of bootScript to figure out which is being used.
The Cit-HepTh (2) is not fixed and will need to be fixed using the DataFixer java application. Otherwise, the force graph will be missing essential data.

Note: All of this data can be found at http://snap.stanford.edu/data/cit-HepTh.html
