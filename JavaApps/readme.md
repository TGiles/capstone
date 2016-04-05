These are the Java applications I created for extracting the data from all the abstract files of the physics database.
The data can be found in the /Data folder.

CleanEssentialData takes the data from the extracted abstract directory and condenses it down into a tab-separated value file. The output file will contain all the paper information except the abstract.

DataFixer fixes the Cit-HepTh data, since files from the year 2000 do not have the same file name length as the rest of the files.

IDandABS condenses the extracted abstract directory down to a single tab-separated value file containing only PaperID and its respective abstract.
