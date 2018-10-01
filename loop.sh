#!/bin/bash
for ((i=1; i<=100000; i++)); do
  node script.js "--c" "7000000" "-l" "0" "-h" "1000000" "-o" "output/integer$i.txt"
done
cat output/*.txt > bigIntegerFile.txt
