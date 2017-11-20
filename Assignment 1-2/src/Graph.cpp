#include "../include/graph.hpp"

Graph::Graph(int V)
{
    if(V > 0) {
      this->V = V;
      adj = new list<AdjListNode> [V];
    } else {
      std::cerr<< "Cannot instantiate graph with 0 vertices\n";
    }

}

void Graph::addEdge(int u, int v, int weight)
{
    if(u<0 || v<0){
      std::cerr<< "Cannot instantiate graph with 0 vertices\n";
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
        list<AdjListNode>::iterator i;
        for(i = adj[v].begin(); i != adj[v].end(); ++i)
        {
            AdjListNode node = *i;
            if ( !visited[node.getV()] && isCyclicUtil(node.getV(), visited, recStack) )
                return true;
            else if (recStack[node.getV()])
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
    //std::cout<< "Began util.\n";
    //printf("Vertices: %d\n", V);
    for(int i = 0; i < V; i++)
        if (isCyclicUtil(i, visited, recStack))
            return true;

    return false;
}

bool Graph::findPathsToNode(int rootKey, vector< vector<int> >&aggregator, vector<int>&path, int k)
{
    // Push the current node to the path.
    path.push_back(rootKey);

    // See if the k is same as root's key,
    // if so push the entire apth to the aggregator.
    if (rootKey == k) {
        aggregator.push_back(path);
        path.pop_back();
        return true;
    }

    // Recur for all the vertices adjacent to this vertex
    list<AdjListNode>::iterator i;
    bool pathFound = false;
    for (i = adj[rootKey].begin(); i != adj[rootKey].end(); ++i)
    {
        AdjListNode node = *i;              // Assign node to the vallue pointed to by i.
        if(findPathsToNode(node.getV(), aggregator, path, k) && !pathFound)
          pathFound = true;

    }

    // This is checked after the loop so we can scann all adjacent paths.
    // This means that if there are more than one paths to a given node,
    // we'll find them all. Hence why we push paths to an aggregator.
    if(pathFound){
      path.pop_back();
      return true;
    }

    // If no path present in subtree rooted with root, remove root from
    // path[] and return false
    path.pop_back();
    return false;
}

int Graph::findLCA(int rootKey, int n1, int n2)
{
    if(n1>V||n2>V||rootKey>V){
        std::cerr<< "Cannot find LCA of numbers greater than graph vertices.\n";
        return -1;
    }
    if(n1<0||n1<0||rootKey<0){
        std::cerr<< "Cannot find LCA of numers lower than zero.\n";
        return -1;
    }
    if(n1==n2)       // LCA of a node to itself is itself.
        return n1;


    if(!isCyclic()){

        // std::cout<< "Is not cyclic\n";
        // Create and find the nodes linking to the target node.
        vector<int> n1Path, n2Path;
        vector< vector<int> > n1Agg, n2Agg;

        findPathsToNode(rootKey, n1Agg, n1Path, n1);
        findPathsToNode(rootKey, n2Agg, n2Path, n2);

        // Create the vector index iterators
        vector< vector<int> >::iterator it1;
        vector< vector<int> >::iterator it2;
        vector<int>::iterator it3;
        vector<int>::iterator it4;

        //printOutPaths(n1Agg);
        //printOutPaths(n2Agg);

        int bestLCA =-1, bestLCAIndex1 =-1, bestLCAIndex2 =-1;

        for(it1 = n1Agg.begin(); it1 != n1Agg.end(); ++it1){
          vector<int> n1Temp = *it1;

          for(it2 = n2Agg.begin(); it2 != n2Agg.end(); ++it2){
            vector<int> n2Temp = *it2;

            for(it3 = n1Temp.begin(); it3 != n1Temp.end(); ++it3){
              int n1Check = *it3;

              for(it4 = n2Temp.begin(); it4 != n2Temp.end(); ++it4){
                int n2Check = *it4;

                // If both are equal a possible LCA has been found.
                // Make sure the possible LCA candidate is not one
                // of the numbers. A number cannot be it's own LCA.
                if(n1Check == n2Check && n1Check != n1 && n2Check != n2){

                  int indexTmp1 = std::distance(n1Temp.begin(), it3);
                  int indexTmp2 = std::distance(n2Temp.begin(), it4);

                  // Check to see if the possible LCA if farther
                  // down the graph then the previously recorded one.
                  if(indexTmp1>bestLCAIndex1 && indexTmp2>bestLCAIndex2){

                    // Record the better LCA.
                    bestLCAIndex1 = indexTmp1;
                    bestLCAIndex2 = indexTmp2;
                    bestLCA = n1Check;

                  }
                }

              }
            }

          }
        }
        return bestLCA;
    }

    std::cerr<< "Graph contains a cycle.\n";
    return -1;

}

void Graph::printOutGraph() {
    std::cout<< "Printing graph below\n";
    printf("Vertices present: %d\n", this->V);
    std::cout<< "Connected Nodes:\n";
    for(int i = 0; i < this->V; i++) {
       printf("\tNode %d: ", i);

       list<AdjListNode> a = adj[i];
       list<AdjListNode>::iterator j;

       for(j = a.begin(); j != a.end(); ++j){

         AdjListNode node = *j;
         printf("%d, ", node.getV());
       }

       std::cout<< "\n";
    }
}

void Graph::printOutPaths(vector< vector<int> >&aggregator){
  vector< vector<int> >::iterator it1;
  vector<int>::iterator it2;
  int index =0;

  for(it1 = aggregator.begin(); it1 != aggregator.end(); ++it1){
    vector<int> n1Vect = *it1;
    printf("Vector %d: ", index++);
    for(it2 = n1Vect.begin(); it2 != n1Vect.end(); ++it2){
      int n1Check = *it2;
      printf("%d, ", n1Check);
    }
    std::cout << "\n";
  }
}
