#--
# Note: only a single Cmake file as its a relativly small project
# PROJECT_SOURCE_DIR - Where the root CMakeLists file is found.
# PROJECT_BINARY_DIR - Where the make command was executed.
#--

#---------------
# Cmake settings
#---------------
cmake_minimum_required(VERSION 3.0)
project(assignment-lca)

set(CMAKE_CXX_STANDARD 14) #latest stable c++   
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(EXECUTABLE_OUTPUT_PATH "${PROJECT_BINARY_DIR}/../bin/")

#---------------
# factorial "static library"
#---------------
set(PROJ_INCLUDE_PATH "${PROJECT_SOURCE_DIR}/include")
set(PROJ_SOURCES_PATH "${PROJECT_SOURCE_DIR}/src")

include_directories(include)

file(GLOB PROJ_SOURCES "${PROJ_SOURCES_PATH}/*.cpp")
# file(GLOB PROJ_HEADERS "${PROJ_INCLUDE_PATH}/*.h")

add_library(${PROJECT_NAME} STATIC ${PROJ_SOURCES})
target_include_directories(${PROJECT_NAME} PUBLIC ${PROJ_INCLUDE_PATH})

#---------------
# Testing
#---------------
add_library(Catch INTERFACE)
target_include_directories(Catch INTERFACE "${PROJECT_SOURCE_DIR}/libs/catch")

set(TEST_EXEC_NAME "${PROJECT_NAME}-test")
set(TEST_INCLUDE_PATH ${PROJ_INCLUDE_PATH} "${PROJECT_SOURCE_DIR}/libs/catch")
set(TEST_SOURCES_PATH "${PROJECT_SOURCE_DIR}/test/src")

file(GLOB TEST_SOURCES "${TEST_SOURCES_PATH}/*.cpp")
message(${TEST_SOURCES})

add_executable(${TEST_EXEC_NAME} ${TEST_SOURCES})
target_link_libraries(${TEST_EXEC_NAME} ${PROJECT_NAME})
target_include_directories(${TEST_EXEC_NAME} PUBLIC ${TEST_INCLUDE_PATH})

enable_testing()
add_test(NAME test_runner COMMAND ${TEST_EXEC_NAME})