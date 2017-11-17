#define CATCH_CONFIG_MAIN
#include <vector>

#include "../libs/catch/catch.hpp"
#include "../include/binarytree.hpp"
#include "../include/graph.hpp"

TEST_CASE( "Checking Find Path Function", "[path]" ){

    vector<int> path1;

    int nodes = 7;
    Graph g = new Graph(nodes);

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
        REQUIRE( findPath(root, path1, 2) ==  true);
        REQUIRE( findPath(root, path1, 5) ==  true);
        REQUIRE( findPath(root, path1, 7) ==  true);

    }

    SECTION( "Basic tests for non-present paths." ) {

        // With two non existing numbers.
        REQUIRE( findPath(root, path1, 34) ==  false);
        REQUIRE( findPath(root, path1, 67383) ==  false);

    }

    SECTION( "Null testing." ) {

        // With non-existing node
        REQUIRE( findPath(NULL, path1, 67383) ==  false);

        // With existing node.
        REQUIRE( findPath(NULL, path1, 2) ==  false);

    }
}

TEST_CASE( "Checking LCA Function", "[lca]" ){

    int nodes = 7;
    Graph g = new Graph(nodes);

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

        REQUIRE( findLCA(root, 4, 5) ==  2);
        REQUIRE( findLCA(root, 4, 6) ==  1);
        REQUIRE( findLCA(root, 3, 4) ==  1);
        REQUIRE( findLCA(root, 2, 4) ==  2);

        // With itself.
        REQUIRE( findLCA(root, 4, 4) ==  4);

    }

    SECTION( "Basic tests for unsuccesful functionality." ) {

        REQUIRE( findLCA(root, 4, 54) ==  -1);
        REQUIRE( findLCA(root, 8494, 4) ==  -1);

    }

    SECTION( "Null testing." ) {

        // With known nodes in tree.
        REQUIRE( findLCA(NULL, 4, 5) ==  -1);

        // With nodes not in tree.
        REQUIRE( findLCA(NULL, 4, 8494) ==  -1);
        REQUIRE( findLCA(NULL, 8494, 4) ==  -1);

    }
  }

    TEST_CASE( "Checking LCA Function For DAG", "[lca-dag]" ){
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
        Graph g = new Graph(nodes);

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


}
