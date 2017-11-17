#include<iostream>
#include <list>
#include <stack>
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

        // A function used by shortestPath
        void topologicalSortUtil(int v, bool visited[], stack<int> &Stack);
    public:
        Graph(int V); // Constructor

        // function to add an edge to graph
        void addEdge(int u, int v, int weight);

        // Finds shortest paths from given source vertex
        void shortestPath(int s);

        // Finds the path from root node to given root of the tree, Stores the
        // path in a vector path[], returns true if path exists otherwise false
        bool findPath(Node *root, vector<int> &path, int k);

        // Returns LCA if node n1, n2 are present in the given binary tree,
        // otherwise return -1
        int findLCA(Node *root, int n1, int n2);
};
