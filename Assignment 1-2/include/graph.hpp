#include<iostream>
#include <list>
#include <limits.h>
#include <vector>
#define INF INT_MAX

using namespace std;

// Class to represent a graph using adjacency list representation
class Graph
{
        int V; // No. of vertices'

        // Pointer to an array containing adjacency lists
        list<AdjListNode> *adj;

    public:
        Graph(int V); // Constructor

        // function to add an edge to graph
        void addEdge(int u, int v, int weight);

        // Returns true if the graph contains a cycle, else false.
        // This function is a variation of DFS() in http://www.geeksforgeeks.org/archives/18212
        bool isCyclic();

        // This function is a variation of DFSUytil() in http://www.geeksforgeeks.org/archives/18212
        bool isCyclicUtil();

        // Finds the paths from root node to given root of the tree, Stores the
        // path in a vector path[], returns true if path exists otherwise false.
        // If multiple paths are found then it is pushed to another vector aggregator
        bool findPathsToNode(int rootKey, vector< vector<int> >&aggregator,
                                    vector<int>&path, int k);

        // Returns LCA if node n1, n2 are present in the given binary tree,
        // otherwise return -1
        int findLCA(Node *root, int n1, int n2);

        // Pretty print for the graph.
        void printOutGraph();
};
