# JSONTrie
A CLI tool that transforms an array of json objects to trie data structure.

I made this tool to try out making a trie for an autocomplete input that would take in Japanese kana and provide suggestions
for possible kanji interpretations.

# Input
An array of json objects that contain two properties, one being the key to traverse and the other being the final value. An example input is available in the repo.

# Output
A trie in the form of a json object. An example output is available in the repo.

# Usage
`jsontrie <inputFile> <outputFile> <keyName> <valueName>`
