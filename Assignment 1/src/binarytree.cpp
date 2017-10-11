//
// Sourced from - http://www.geeksforgeeks.org/lowest-common-ancestor-binary-tree-set-1/
// Edited by Mark Noone 
//

#include <iostream>
#include <vector>
#include "../include/binarytree.hpp"

using namespace std;
 
Node * newNode(int k)
{
    Node *temp = new Node;
    temp->key = k;
    temp->left = NULL;
    temp->right = NULL;
    return temp;
}
 

bool findPath(Node *root, vector<int> &path, int k)
{
    // base case
    if (root == NULL) return false;
 
    // Store this node in path vector. The node will be removed if
    // not in path from root to k
    path.push_back(root->key);
 
    // See if the k is same as root's key
    if (root->key == k)
        return true;
 
    // Check if k is found in left or right sub-tree
    if ( (root->left && findPath(root->left, path, k)) ||
         (root->right && findPath(root->right, path, k)) )
        return true;
 
    // If not present in subtree rooted with root, remove root from
    // path[] and return false
    path.pop_back();
    return false;
}
 
int findLCA(Node *root, int n1, int n2)
{
    // to store paths to n1 and n2 from the root
    vector<int> path1, path2;
 
    // Find paths from root to n1 and root to n1. If either n1 or n2
    // is not present, return -1
    if ( !findPath(root, path1, n1) || !findPath(root, path2, n2))
          return -1;
 
    /* Compare the paths to get the first different value */
    int i;
    for (i = 0; i < path1.size() && i < path2.size() ; i++)
        if (path1[i] != path2[i])
            break;
    return path1[i-1];
}