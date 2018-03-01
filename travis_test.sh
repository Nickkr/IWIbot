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

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}"
echo "                               _____ _    _ _____     ______       _                                "
echo "                              |_   _| |  | |_   _|    | ___ \     | |                               "
echo "                                | | | |  | | | |______| |_/ / ___ | |_                              "
echo "                                | | | |/\| | | |______| ___ \/ _ \| __|                             "
echo "                               _| |_\  /\  /_| |_     | |_/ / (_) | |_                              "
echo "                               \___/ \/  \/ \___/     \____/ \___/ \__|                             "
echo "                                                                                                    "
echo -e "${NC}"

# install wsk cli
LINK=https://openwhisk.ng.bluemix.net/cli/go/download/linux/amd64/wsk
echo -e "${BLUE}"
echo "===================================================================================================="
echo "                         Downloading OpenWhisk CLI from '$LINK'...                                  "
echo "===================================================================================================="
echo -e "${NC}"

curl -O $LINK
chmod u+x wsk
export PATH=$PATH:`pwd`

# config and login in deploy scripts
echo -e "${BLUE}"
echo "===================================================================================================="
echo "                         Configuring CLI from apihost and API key                                   "
echo "===================================================================================================="
echo -e "${NC}"

wsk property set --apihost openwhisk.ng.bluemix.net --auth $OPENWHISK_KEY > /dev/null 2>&1
wsk bluemix login --user $BLUEMIX_USER --password $BLUEMIX_PASS --namespace ${BLUEMIX_ORGANIZATION}_${BLUEMIX_SPACE}

# fake local.env (Configurations defined in travis-ci console)
touch local.env

# Deploy WSK Test-Actions and Actions for Router Test
./deploy_test.sh --install
#./deploy.sh --install


echo -e "${BLUE}"
echo "===================================================================================================="
echo "                                    Running tests                                                   "
echo "===================================================================================================="
echo -e "${NC}"

echo -e "${BLUE}"
echo "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 1/5) Running test joke ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
echo -e "${NC}"

cd openwhisk/joke
npm install
npm test

echo -e "${BLUE}"
echo "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 2/5) Running test meal ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
echo -e "${NC}"

cd ../meal
npm install
npm test

echo -e "${BLUE}"
echo "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 3/5) Running test timetables ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
echo -e "${NC}"

cd ../timetables
npm install
npm test

echo -e "${BLUE}"
echo "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 4/5) Running test weather ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
echo -e "${NC}"

cd ../weather
npm install
npm test

echo -e "${BLUE}"
echo "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 5/5) Running test router ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
echo -e "${NC}"

cd ../router
npm install
npm test

cd ../..

echo -e "${GREEN}"
echo -e "______________________       __    ___    ___    __        ___       ___       _____________________"
echo -e "                      )  ____) |  |   |  |  /  __) \    ___)  )  ____)  )  ____)                    "
echo -e "                     (  (___   |  |   |  | |  /     |  (__   (  (___   (  (___                      "
echo -e "                      \___  \  |  |   |  | | |      |   __)   \___  \   \___  \                     "
echo -e "                      ____)  ) |   \_/   | |  \__   |  (___   ____)  )  ____)  )                    "
echo -e "_____________________(      (___\       /___\    )_/       )_(      (__(      (_____________________"
echo -e "${NC}"
