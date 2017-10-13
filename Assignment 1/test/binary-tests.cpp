#define CATCH_CONFIG_MAIN
#include "../libs/catch/catch.hpp"
#include "../include/binarytree.hpp"

TEST_CASE( "Checking Find Path Function", "[path]" ){
    
    vector<int> path1;

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
    SECTION( "Basic tests for correct functionality." ) {
        
        REQUIRE( findLCA(root, 4, 5) ==  2);
        REQUIRE( findLCA(root, 4, 6) ==  1);
        REQUIRE( findLCA(root, 3, 4) ==  1);
        REQUIRE( findLCA(root, 2, 4) ==  2);
    
    }

    SECTION( "Basic tests for unsuccesful functionality." ) {
        
        REQUIRE( findLCA(root, 4, 5) ==  2);
        REQUIRE( findLCA(root, 4, 6) ==  1);
        REQUIRE( findLCA(root, 3, 4) ==  1);
        REQUIRE( findLCA(root, 2, 4) ==  2);
    
    }

    SECTION( "Null testing." ) {
        
        REQUIRE( findLCA(root, 4, 5) ==  2);
        REQUIRE( findLCA(root, 4, 6) ==  1);
        REQUIRE( findLCA(root, 3, 4) ==  1);
        REQUIRE( findLCA(root, 2, 4) ==  2);
    
    }
}