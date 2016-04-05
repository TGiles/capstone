package init;
//1.0 stable
import java.io.File;
import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Scanner;

/**
 * @author Tim Giles
 *
 */
public class DataFixer {
	static int count = 0;
	/**
	 * Converts the Cit-HepTh link data into a single uniform data set
	 * For example, 0001010 was 1001 before the conversion
	 * @param file The file to be read
	 * @throws FileNotFoundException
	 * @throws InterruptedException
	 */
	public static void FixIt(File file) throws FileNotFoundException, InterruptedException
	{
		Scanner in = new Scanner(file);
		//in.useDelimiter("\t\n");
		ArrayList<String> list = new ArrayList<String>();
		while(in.hasNext())
		{
			String a = in.next();
			//System.out.println(a);
			if(a.length()==4)
			{
				//System.out.println("we made it");
				String b = "000";
				b+=a;
				list.add(b);
				list.add("\t");
				count++;
			}
			else if(a.length()==5)
			{
				String b ="00";
				b+=a;
				list.add(b);
				list.add("\t");
				count++;
			}
			else if(a.length()==6)
			{
				String b ="0";
				b+=a;
				list.add(b);
				list.add("\t");
				count++;
			}
			else
			{
				list.add(a);
				list.add("\t");
				count++;
			}
			if(count==2)
			{
				list.add("\n");
				count=0;
			}
		}
		in.close();
		PrintWriter out = new PrintWriter("C:/Users/Timi/Desktop/College/CPSC 498/FixedCit.tsv");
		for(String a: list)
		{
			out.print(a);
		}
		out.close();
	}
	public static void main(String args[]) throws FileNotFoundException, InterruptedException
	{
		File file = new File("C:/Users/Timi/Desktop/College/CPSC 498/Cit-HepTh.txt");
		FixIt(file);
	}
}
