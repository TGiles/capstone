package init;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Scanner;

public class FirstAttemptFileSystem {
	public static ArrayList<String> initString()
	{
		ArrayList<String>someList = new ArrayList<String>();
		someList.add("Paper"+"\t"+"From"+"\t"+"Date"+"\t"+"Title"+"\t"+"Authors");
		someList.add(System.lineSeparator());
		return someList;
	}
	public static String readFile(File string) throws FileNotFoundException
	{
		//ArrayList<String> theString = new ArrayList<String>();
		String theString = new String();
		//theString.add("Paper,From,Date,Title,Authors");
			Scanner in = new Scanner(string);
			boolean titleLine = false;
			boolean authorLine = false;
			boolean journalLine = false;
			in.nextLine();
			in.nextLine();
			String paper="";
			String from ="";
			String date = "";
			String title = "";
			String authors = "";
			String journal ="";
			while(in.hasNext())
			{
				String line = in.nextLine();
				if(line.contains("Paper"))
				{
					paper = line.substring(14, 21);
				}
				else if(line.contains("From"))
				{
					Scanner perChar = new Scanner(line);
					perChar.next();
					while(perChar.hasNext())
					{
						from+=perChar.next();
						from+=" ";
					}
					perChar.close();
				}
				else if(line.contains("Date:"))
				{
					Scanner perChar = new Scanner(line);
					perChar.next();
					while(perChar.hasNextLine())
					{
						String var = perChar.nextLine();
						if(var.equals("GMT"))
						{
							date+=var;
							break;
						}
						else
						{
							date+=var;
							date+=" ";
						}
					}
					perChar.close();
				}
				else if(line.contains("Title:"))
				{
					Scanner perChar = new Scanner(line);
					perChar.next();
					while(perChar.hasNextLine())
					{
						title += perChar.nextLine();
						title += " ";
					}
					perChar.close();
				}
				else if(line.contains("Authors:"))
				{
					Scanner perChar = new Scanner(line);
					perChar.next();
					while(perChar.hasNextLine())
					{
						authors += perChar.nextLine();
						authors += " ";
					}
					
					perChar.close();
				}
				else if(line.contains("Journal-ref:"))
				{
					Scanner perChar = new Scanner(line);
					perChar.next();
					while(perChar.hasNextLine())
					{
						journal += perChar.nextLine();
						journal += " ";
					}
					
					perChar.close();
				}
			}
			theString+=(paper);
			theString+="\t";
			theString+=(from);
			theString+="\t";
			theString+=(date);
			theString+="\t";
			theString+=(title);
			theString+="\t";
			theString+=(authors);
			theString+="\t";
			theString+=(journal);
			theString+=(System.lineSeparator());
			in.close();
			return theString;
		
	}
	
	public static ArrayList<String> readFiles(File file) throws FileNotFoundException
	{
		ArrayList<String> aList = initString();
		File dir = file;
		File [] directoryListing = dir.listFiles();
		if(directoryListing !=null)
		{int count = 0;
			for(File child: directoryListing)
			{
				if(child.isDirectory())
				{
					File [] subListing = child.listFiles();
					for(File sub : subListing)
					{
						aList.add(readFile(sub));
						
					}
				}
				else
				{
				aList.add(readFile(child));
				}
					System.out.println(count+"/"+directoryListing.length);
				
				count++;
			}
		}
		else
		{
			
		}
		return aList;
	}
	public static void main(String args[]) throws FileNotFoundException
	{
		//ArrayList<String>theList = initString();
		File dir = new File("C:/Users/Timi/Desktop/College/CPSC 498/Citation dataset/1992"); //2007 is test set
		System.out.println(dir.length());
		ArrayList<String>theList = readFiles(dir);
		PrintWriter out = new PrintWriter("C:/Users/Timi/Desktop/College/CPSC 498/outputTest.tsv");
		for(int i =0; i < theList.size(); i++){
			
			out.print(theList.get(i));
		}
		out.close();
	}

}
