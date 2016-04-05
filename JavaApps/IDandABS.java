package init;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Scanner;

public class IDandABS {
	public static ArrayList<String> initString()
	{
		ArrayList<String>someList = new ArrayList<String>();
		someList.add("Paper,Abstract");
		someList.add(System.lineSeparator());
		return someList;
	}
	public static String readFile(File string) throws FileNotFoundException
	{
		//ArrayList<String> theString = new ArrayList<String>();
		String theString = new String();
		//theString.add("Paper,From,Date,Title,Authors");
			Scanner in = new Scanner(string);
			in.nextLine();
			in.nextLine();
			String paper="";
			String abs="";
			boolean conRead = false;
			while(in.hasNextLine())
			{
				String line = in.nextLine();
				if(line.contains("Paper"))
				{
					paper = line.substring(14, 21);
				}
				else if(line.contains("\\\\"))
				{
				while(in.hasNextLine())
				{
					line = in.nextLine();
					if(line.contains("\\\\"))
					{
						break;
					}
					else
					{
						Scanner perChar = new Scanner(line);
						while(perChar.hasNext())
						{
							abs+=perChar.next();
							abs+=" ";
						}
					}
				}
				
				}
				
			}
			theString+=(paper);
			theString+=",";
			theString+=(abs);
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
		{
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
		File dir = new File("C:/Users/Timi/Desktop/College/CPSC 498/Citation dataset/"); //2007 is test set
		System.out.println(dir.length());
		ArrayList<String>theList = readFiles(dir);
		PrintWriter out = new PrintWriter("C:/Users/Timi/Desktop/College/CPSC 498/outputABS.txt");
		for(int i =0; i < theList.size(); i++)
		{
			out.print(theList.get(i));
		}
		out.close();
	}

}
