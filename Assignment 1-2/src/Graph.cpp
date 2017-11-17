#include<iostream>
#include <list>
#include <stack>
#include <limits.h>
#include "../include/graph.hpp"

#define INF INT_MAX


Graph::Graph(int V)
{
    if(V > 0) {
      this->V = V;
      adj = new list<AdjListNode> [V];
    } else {
      std::cerr<< "Cannot instantiate graph with 0 vertices";
    }

}

void Graph::addEdge(int u, int v, int weight)
{
    if(u<0 || v<0){
      std::cerr<< "Cannot instantiate graph with 0 vertices";
    } else {
      AdjListNode node(v, weight);
      adj[u].push_back(node); // Add v to u's list
    }
}


bool Graph::isCyclicUtil(int v, bool visited[], bool *recStack)
{
    if(visited[v] == false)
    {
        // Mark the current node as visited and part of recursion stack
        visited[v] = true;
        recStack[v] = true;

        // Recur for all the vertices adjacent to this vertex
        list<int>::iterator i;
        for(i = adj[v].begin(); i != adj[v].end(); ++i)
        {
            if ( !visited[*i] && isCyclicUtil(*i, visited, recStack) )
                return true;
            else if (recStack[*i])
                return true;
        }

    }
    recStack[v] = false;  // remove the vertex from recursion stack
    return false;
}


bool Graph::isCyclic()
{
    // Mark all the vertices as not visited and not part of recursion
    // stack
    bool *visited = new bool[V];
    bool *recStack = new bool[V];
    for(int i = 0; i < V; i++)
    {
        visited[i] = false;
        recStack[i] = false;
    }

    // Call the recursive helper function to detect cycle in different
    // DFS trees
    for(int i = 0; i < V; i++)
        if (isCyclicUtil(i, visited, recStack))
            return true;

    return false;
}

bool Graph::findPath(int rootKey, vector<int> &path, int k)
{
    // Store this node in path vector. The node will be removed if
    // not in path from root to k
    path.push_back(rootKey);

    // See if the k is same as root's key
    if (rootKey == k)
        return true;

    // Check if k is found in left or right sub-tree
    // if ( (root->left && findPath(root->left, path, k)) ||
    //      (root->right && findPath(root->right, path, k)) )
    //     return true;

    // Recur for all the vertices adjacent to this vertex
    list<AdjListNode>::iterator i;
    for (i = adj[rootKey].begin(); i != adj[rootKey].end(); ++i)
    {
        AdjListNode node = *i;
        if(findPath(node.getV(), path, k))
          return true;
    }


    // If not present in subtree rooted with root, remove root from
    // path[] and return false
    path.pop_back();
    return false;
}

int Graph::findLCA(int rootKey, int n1, int n2)
{
    // to store paths to n1 and n2 from the root
    vector<int> path1, path2;

    // Find paths from root to n1 and root to n1. If either n1 or n2
    // is not present, return -1
    if ( !findPath(rootKey, path1, n1) || !findPath(rootKey, path2, n2))
          return -1;

    /* Compare the paths to get the first different value */
    int i;
    for (i = 0; i < path1.size() && i < path2.size() ; i++)
        if (path1[i] != path2[i])
            break;
    return path1[i-1];
}
