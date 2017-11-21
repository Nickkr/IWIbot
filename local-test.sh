#!/bin/bash
set -e

echo "Deploying test actions"
#./deploy_test.sh --install

echo "Find and set API URL"
export API_URL=`wsk api list $API_BASE_PATH $API_PATH | grep iwibot | awk '{print $5}'`

source local.env
export WSK_API_CODE
export CONVERSATION_WORKSPACE_ID
export CONVERSATION_ID

echo "Running tests"

echo "Running test joke"
cd openwhisk/joke
npm install
npm test

echo "Running test meal"
cd ../meal
npm install
npm test

#echo "Running test router"
#cd ../router
#npm install
#npm test

echo "Running test timetables"
cd ../timetables
npm install
npm test

echo "Running test weather"
cd ../weather
npm install
npm test

cd ../..

echo "Undeploying test actions"
./deploy_test.sh --uninstall
