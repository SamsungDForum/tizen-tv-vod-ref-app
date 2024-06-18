#!/bin/bash
#
# Before launching this script, please make sure 'node_modules' folder do not exist in the relative path ../../ 

for i in $(find ../../ -type f -name '*.ts' -o -type f -name '*.js'  ) 
do
  if ! grep -q Copyright $i 
  then
    cat copyright4js.txt $i >$i.new && mv $i.new $i
  fi
done