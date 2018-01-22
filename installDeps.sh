#!/bin/bash
#installs all packages for all openwhisk-actions
rm -rf node_modules
npm install > /dev/null
cd ./openwhisk/joke
rm -rf node_modules
npm install > /dev/null
cd ../meal
rm -rf node_modules
npm install > /dev/null
cd ../router
rm -rf node_modules
npm install > /dev/null
cd ../timetables
rm -rf node_modules
npm install > /dev/null
cd ../weather
rm -rf node_modules
npm install > /dev/null