#!/bin/bash

startDir=${pwd}
cd "${0%/*}"

firefox -P "Fullscreen" -no-remote index.html

cd $startDir
