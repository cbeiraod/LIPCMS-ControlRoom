#!/bin/bash

startDir=${pwd}
cd "${0%/*}"

firefox -P "Fullscreen" -no-remote Pages/LoadDisplay.html

cd $startDir
