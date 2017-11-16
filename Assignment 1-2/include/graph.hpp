#include<iostream>
#include <list>
#include <stack>
#include <limits.h>
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

        void addEdges(int[][] array);

        // Finds shortest paths from given source vertex
        void shortestPath(int s);
};
