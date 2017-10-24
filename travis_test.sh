#!/bin/bash

##############################################################################
# Copyright 2017 IBM Corporation
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
##############################################################################
# set -x trace
set -e # terminate after non-null return value
LINK=https://openwhisk.ng.bluemix.net/cli/go/download/linux/amd64/wsk

echo "Downloading OpenWhisk CLI from '$LINK'...\n"

curl -O $LINK
chmod u+x wsk
export PATH=$PATH:`pwd`
echo "Configuring CLI from apihost and API key\n"

wsk property set --apihost openwhisk.ng.bluemix.net --auth $OPENWHISK_KEY > /dev/null 2>&1
wsk bluemix login --user $BLUEMIX_USER --password $BLUEMIX_PASS --namespace ${BLUEMIX_ORGANIZATION}_${BLUEMIX_SPACE}

echo "Configure local.env"
touch local.env #Configurations defined in travis-ci console

echo "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Deploying wsk actions for testing~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
./deploy_test.sh --install
echo "Running tests"

echo "Running test joke"
cd openwhisk/joke
npm install
npm test

echo "Running test meal"
cd ../meal
npm install
npm test

echo "Running test router"
cd ../router
npm install
npm test

echo "Running test timetables"
cd ../timetables
npm install
npm test

echo "Running test weather"
cd ../weather
npm install
npm test

cd ../..