#define CATCH_CONFIG_MAIN
#include <vector>

#include "../libs/catch/catch.hpp"
#include "../include/graph.hpp"

TEST_CASE( "Checking Find Path Function", "[path]" ){

    vector< vector<int> > agg1;
    vector<int> path1;

    int nodes = 7;
    Graph g(nodes);
    int root = 0;

    // Add Edges
    g.addEdge(0, 1, 1);
    g.addEdge(0, 2, 1);
    g.addEdge(1, 3, 1);
    g.addEdge(1, 4, 1);
    g.addEdge(2, 5, 1);
    g.addEdge(2, 6, 1);

    //Test outcomes here by dividing tests into sections and
    // then manipulating the data type and check with REQUIRE.
    SECTION( "Basic tests for correct find path functionality." ) {

        // Test the succesful path to different levels of the tree.
        REQUIRE( g.findPathsToNode(root, agg1, path1, 2) ==  true);
        REQUIRE( g.findPathsToNode(root, agg1, path1, 5) ==  true);
        REQUIRE( g.findPathsToNode(root, agg1, path1, 6) ==  true);

    }

    SECTION( "Basic tests for non-present paths." ) {

        // With two non existing numbers.
        REQUIRE( g.findPathsToNode(root, agg1, path1, 34) ==  false);
        REQUIRE( g.findPathsToNode(root, agg1, path1, 67383) ==  false);

    }
}

TEST_CASE( "Testing Acyclic functions", "[acyclic]" ){

    vector< vector<int> > agg1;
    vector<int> path1;

    int nodes = 7;
    int root = 0;

    Graph nonCyclic(nodes);
    Graph cyclic(nodes);

    // Add Edges to Non-Cylcic Graph.
    nonCyclic.addEdge(0, 1, 1);
    nonCyclic.addEdge(0, 2, 1);
    nonCyclic.addEdge(1, 3, 1);
    nonCyclic.addEdge(1, 4, 1);
    nonCyclic.addEdge(2, 5, 1);
    nonCyclic.addEdge(2, 6, 1);

    // Add Edges to Cylcic Graph.
    cyclic.addEdge(0, 1, 1);
    cyclic.addEdge(0, 2, 1);
    cyclic.addEdge(1, 3, 1);
    cyclic.addEdge(1, 4, 1);
    cyclic.addEdge(4, 0, 1);
    cyclic.addEdge(2, 5, 1);
    cyclic.addEdge(2, 6, 1);

    SECTION("Testing isCyclic") {

      REQUIRE( nonCyclic.isCyclic() == false );
      REQUIRE( cyclic.isCyclic() == true );

    }

}

TEST_CASE( "Checking LCA Function Simple", "[lca-simple]" ){

    int nodes = 7;
    int root = 0;
    Graph g(nodes);

    // Add Edges
    g.addEdge(0, 1, 1);
    g.addEdge(0, 2, 1);
    g.addEdge(1, 3, 1);
    g.addEdge(1, 4, 1);
    g.addEdge(2, 5, 1);
    g.addEdge(2, 6, 1);

    //Test outcomes here by dividing tests into sections and
    // then manipulating the data type and check with REQUIRE.
    SECTION( "Basic tests for correct functionality." ) {

        REQUIRE( g.findLCA(root, 4, 5) ==  0);
        REQUIRE( g.findLCA(root, 4, 6) ==  0);
        REQUIRE( g.findLCA(root, 3, 4) ==  1);
        REQUIRE( g.findLCA(root, 2, 4) ==  0);

        // With itself.
        REQUIRE( g.findLCA(root, 4, 4) ==  4);

    }

    SECTION( "Basic tests for unsuccesful functionality." ) {

        REQUIRE( g.findLCA(root, 4, 54) ==  -1);
        REQUIRE( g.findLCA(root, 8494, 4) ==  -1);

    }

    SECTION( "Error testing." ) {

        // root, n1 and n2 values on either side of
        // the total graph vertices
        REQUIRE( g.findLCA(-1, 4, 5) ==  -1);
        REQUIRE( g.findLCA(nodes+1, 4, 5) ==  -1);
        REQUIRE( g.findLCA(root, nodes+1, 5) ==  -1);
        REQUIRE( g.findLCA(root, -1, 5) ==  -1);
        REQUIRE( g.findLCA(root, 4, nodes+1) ==  -1);
        REQUIRE( g.findLCA(root, 4, -1) ==  -1);

    }
}

TEST_CASE( "Checking LCA Function For DAG", "[lca-complex]" ){
    /*
      Graph Diagram:

      +------+0+-----+
      |       +      |
      |       |      |
      v       v      v
      1       2      3
      +--+    +      +
      |  |    |      |
      v  |    v      v
      4  +--> 5      6
      |       |   +-------+
      v       v       v       v
      7       8       9      10
      +------+       +---+---+
        v               v
        11              12
        +------+--------+
               v
              13

    */

    // Let us create a Direct Acyclic Graph
    int nodes = 14;
    int root = 0;
    Graph g(nodes);

    // Add Edges
    g.addEdge(0, 1, 1);
    g.addEdge(0, 2, 1);
    g.addEdge(0, 3, 1);
    g.addEdge(1, 4, 1);
    g.addEdge(1, 5, 1);
    g.addEdge(2, 5, 1);
    g.addEdge(3, 6, 1);
    g.addEdge(4, 7, 1);
    g.addEdge(5, 8, 1);
    g.addEdge(6, 9, 1);
    g.addEdge(6, 10, 1);
    g.addEdge(7, 11, 1);
    g.addEdge(8, 11, 1);
    g.addEdge(9, 12, 1);
    g.addEdge(10, 12, 1);
    g.addEdge(12, 13, 1);
    g.addEdge(11, 13, 1);

    //Test outcomes here by dividing tests into sections and
    // then manipulating the data type and check with REQUIRE.
    SECTION( "Basic tests for correct functionality." ) {

        REQUIRE( g.findLCA(root, 7, 8) ==  1);
        REQUIRE( g.findLCA(root, 11, 12) ==  0);
        REQUIRE( g.findLCA(root, 11, 6) ==  0);
        REQUIRE( g.findLCA(root, 13, 4) ==  1);

        // With itself.
        REQUIRE( g.findLCA(root, 4, 4) ==  4);

    }

    SECTION( "Basic tests for unsuccesful functionality." ) {

        REQUIRE( g.findLCA(root, 4, 54) ==  -1);
        REQUIRE( g.findLCA(root, 8494, 4) ==  -1);

    }

    SECTION( "Error testing." ) {

        // root, n1 and n2 values on either side of
        // the total graph vertices
        REQUIRE( g.findLCA(-1, 4, 5) ==  -1);
        REQUIRE( g.findLCA(nodes+1, 4, 5) ==  -1);
        REQUIRE( g.findLCA(root, nodes+1, 5) ==  -1);
        REQUIRE( g.findLCA(root, -1, 5) ==  -1);
        REQUIRE( g.findLCA(root, 4, nodes+1) ==  -1);
        REQUIRE( g.findLCA(root, 4, -1) ==  -1);

    }

}
