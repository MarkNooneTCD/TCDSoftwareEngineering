#include "../include/graph.hpp";
#include "../include/AdjacencyList.hpp";

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

bool Graph::findPathsToNode(int rootKey, vector< vector<int> >&aggregator, vector<int>&path, int k)
{
    // Push the current node to the path.
    path.push(rootKey);

    // See if the k is same as root's key,
    // if so push the entire apth to the aggregator.
    if (rootKey == k) {
        aggregator.push(path);
        return true;
    }

    // Recur for all the vertices adjacent to this vertex
    list<AdjListNode>::iterator i;
    bool pathFound = false;
    for (i = adj[rootKey].begin(); i != adj[rootKey].end(); ++i)
    {
        AdjListNode node = *i;              // Assign node to the vallue pointed to by i.
        pathFound = findPathsToNode(node.getV(), aggregator, path, k);
    }

    // This is checked after the loop so we can scann all adjacent paths.
    // This means that if there are more than one paths to a given node,
    // we'll find them all. Hence why we push paths to an aggregator.
    if(pathFound){
      return true;
    }

    // If no path present in subtree rooted with root, remove root from
    // path[] and return false
    path.pop_back();
    return false;
}

int Graph::findLCA(int rootKey, int n1, int n2)
{
    if(x>V||y>V||root>V){
        std::cerr<< "Cannot find LCA of numbers greater than graph vertices.";
        return -1;
    }
    if(x<0||y<0||root<0){
        std::cerr<< "Cannot find LCA of numers lower than zero.";
        return -1;
    }
    if(x==y)       // LCA of a node to itself is itself.
        return x;


    if(!isCyclic()){

        // Create and find the nodes linking to the target node.
        vector<int> n1Path, n2Path;
        vector< vector<int> > n1Agg, n2Agg;

        findPathsToNode(rootkey, n1Agg, n1Path, n1);
        findPathsToNode(rootkey, n2Agg, n2Path, n2);

        // Create the vector index iterators
        vector< vector<int> >::size_type it1;
        vector< vector<int> >::size_type it2;
        vector<int>::size_type it3;
        vector<int>::size_type it4;

        int bestLCA =-1, bestLCAIndex1 =-1, bestLCAIndex2 =-1;

        for(it1 = 0; it1 != n1Path.size(); ++it1){
          vector<int> n1Temp = n1Agg[it1];

          for(it2 = 0; it2 != n2Path.size(); ++it2){
            vector<int> n2Temp = n2Agg[it2];

            for(it3 = 0; it3 != n1Temp.size(); ++it3){
              int n1Check = n1Temp[it3];

              for(it4 = 0; it4 != n2Temp.size(); ++it4){
                int n2Check = n2Temp[it4];

                // If both are equal a possible LCA has been found.
                if(n1Check == n2Check){

                  // Check to see if the possible LCA if farther
                  // down the graph then the previously recorded one.
                  if(it3>bestLCAIndex1 && it4>bestLCAIndex2){

                    // Record the better LCA.
                    bestLCAIndex1 = it3;
                    bestLCAIndex2 = it4;
                    bestLCA = n1Check;

                  }
                }

              }
            }

          }
        }
        return bestLCA;
    }

    std::cerr<< "Graph contains a cycle.";
    return -1;

}

void printOutGraph() {
    std::cout<< "Printing graph below;";
}
