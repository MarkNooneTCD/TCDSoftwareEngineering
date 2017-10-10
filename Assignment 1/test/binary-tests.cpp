#define CATCH_CONFIG_MAIN
#include "catch.hpp"

#include "binarytree.hpp"

TEST_CASE( "Checking LCA Data Type", "[lca-tests]" ){
    
    // Let us create a basic Binary Tree.
    Node * root = newNode(1);
    root->left = newNode(2);
    root->right = newNode(3);
    root->left->left = newNode(4);
    root->left->right = newNode(5);
    root->right->left = newNode(6);
    root->right->right = newNode(7);

    //Test outcomes here by dividing tests into sections and 
    // then manipulating the data type and check with REQUIRE.
    SECTION( "Testing basic LCA answers." ) {
        
        REQUIRE( findLCA(root, 4, 5) ==  2)
        REQUIRE( findLCA(root, 4, 6) ==  1)
        REQUIRE( findLCA(root, 3, 4) ==  1)
        REQUIRE( findLCA(root, 2, 4)) ==  2)
    
    }
}