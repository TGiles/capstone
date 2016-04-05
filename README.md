# capstone
My project for my CPSC 498 Capstone class. It is a data visualization project involving physics papers.
The physics papers data is obtained from Stanford's Large Network Dataset Collection (http://snap.stanford.edu/data/)
This project uses vanilla JavaScript, PHP, MySQL, and a data visualization JavaScript library D3 (https://d3js.org/).

The main application takes in relational data between physics papers, one paper cites a different paper or papers, and creates
a relationship between those papers. After going through an arbitrary amount of data rows, the application then plots all the papers
on to the graphing area in the web page. This is where the D3 library is used extensively.

D3 has many layouts that developers can use, but the layout used is a force-directed graph. In a force-directed graph we have nodes,
gravity, charges, and links. This graph works like a physics-based force graph, where the goal is to achieve a steady state.
D3 calculates all of the forces in the graph and where nodes need to be in order to create a steady state.

After a steady state has been achieved the graph stops its calculations. However the graph is natively interactive. By clicking on any
node, that node can be dragged around and the graph will recompute a steady state. This is not the main focus of the application, therefore I have added functionality that disables this interactivity.

There is functionality within the application that allows for running the graph step-by-step, running it to a steady state, running it to a steady state without animation (the graph only appears after a resting state occurs). These are to show the versitility of the D3 library, as well as my ability to manipulate D3 to my ends.

The main point of the application is to determine relationships between different papers; to ask why does this paper cite this other paper. In order to do these comparisons we need relevant data about the papers. The database that contains these papers also contains a abstract file for each paper. These abstract files contain relevant data: When it was published, who contributed to it, the actual abstract of the paper, which journal it was published in, etc.

The only time information about a paper is grabbed is when the user clicks on a node in the app. This sends an AJAX call to a PHP file that acquires the needed information from a MySQL database. In order to make easier comparisons, the user can double click any node and see its neighbors. After figuring out the neighbors, which may be papers that cite that node, or papers that the node cites, we can start comparisons between papers to figure out why these papers were cited.


