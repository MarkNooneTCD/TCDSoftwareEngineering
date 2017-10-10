#define CATCH_CONFIG_MAIN
#include "catch.hpp"

#include "binarytree.hpp"

TEST_CASE( "Checking LCA Data Type", "[lca-tests]" ){
    
    // Initialise data types here.
    int one = 1;

    //Test outcomes here by dividing tests into sections and 
    // then manipulating the data type and check with REQUIRE.
    SECTION( "resizing bigger changes size and capacity" ) {
        v.resize( 10 );
        
        REQUIRE( v.size() == 10 );
        REQUIRE( v.capacity() >= 10 );
    }
}