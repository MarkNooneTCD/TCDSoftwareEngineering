#include <iostream>
#include <list>
#include <stack>
#include <limits.h>

#include "../include/graph.hpp"
#define INF INT_MAX

class AdjListNode
{
        int v;
        int weight;
    public:
        AdjListNode(int _v, int _w)
        {
            v = _v;
            weight = _w;
        }
        int getV()
        {
            return v;
        }
        int getWeight()
        {
            return weight;
        }
};
