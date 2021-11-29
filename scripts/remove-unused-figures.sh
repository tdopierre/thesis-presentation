#!/bin/bash

for filePath in $(find 'figures' -type f | grep -P "\.(pdf|png|jpeg|jpg)$"); do
    # echo $filePath
    found=$(cat index.html | grep $filePath)
    if [[ "${found}" == "" ]]; then
        # echo $filePath $found
        rm $filePath
    fi
done