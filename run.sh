#!/bin/bash

startDir=${pwd}
cd "${0%/*}"

firefox -P "Fullscreen" -no-remote Pages/Load.html

cd $startDir
