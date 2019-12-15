#!/usr/bin/env node

// Imports
const process = require('process');
var fs = require('fs');

// Helpers
var readInput = function(inputFile) {
    var result = null;

    // Read in JSON Array
    result = JSON.parse(fs.readFileSync(inputFile, 'utf8'));

    return result;
}

var addNode = function(trie, key, value){
    // If we have an empty key we exit by setting the value
    if(key.length === 0){
        if(!trie.v)
            trie.v = [];
        
        trie.v.push(value);

        return trie;
    } else {
        var nextTrie = {};

        // Check for next character object
        if (trie.hasOwnProperty(key[0])) {
            nextTrie = trie[key[0]];
        }
        
        trie[key[0]] = addNode(nextTrie, key.substring(1), value);

        return trie;
    }
}

var constructTrie = function(input, key, value) {
    var trie = {};

    input.forEach(item => {
        trie = addNode(trie, item[key], item[value]);
    });

    return trie;
}

var writeOutput = function(output, fileName) {
    fs.writeFileSync(fileName, JSON.stringify(output));
}

// Main process
// Gather arguments
var input = process.argv[2];
var output = process.argv[3];
var key = process.argv[4];
var value = process.argv[5];

// Check for inputs
if(input && output && key && value) {

    // Read input
    var original = null;

    try {
        original = readInput(input);
    } catch(err) {
        console.log("Error reading in file: " + err);
    }

    if(original) {

        // Contruct trie
        var trie = null;

        try{
            trie = constructTrie(original, key, value);
        } catch(err) {
            console.log("Error contructing trie: " + err);
        }

        // Write output
        if(trie) {
            try {
                writeOutput(trie, output);
            } catch(err) {
                console.log("Error writing output: " + err);
            }
        }
    }

} else {
    console.log("Missing input, output, key, or value file parameters!");
    console.log("Usage: trie <inputFile> <outputFile> <keyName> <valueName>")
}