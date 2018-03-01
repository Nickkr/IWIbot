#!/bin/bash
#
# Copyright 2017 IBM Corp. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the “License”);
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#  https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an “AS IS” BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# Load configuration variables
source local.env

# API
export API_NAME="iwibot Test API"
export API_BASE_PATH="/iwibotTest"

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

function usage() {
  echo -e "Usage: $0 [--install,--uninstall,--env]"
}

function install() {

  echo -e "${BLUE}"
  echo "===================================================================================================="
  echo "                                      Deploying Test-Actions                                        "
  echo "===================================================================================================="
  echo -e "${NC}"

  # Exit if any command fails
  set -e

  echo -e "Deploying OpenWhisk actions, triggers, and rules for IWIBot"

  echo -e "Setting Bluemix credentials and logging in to provision API Gateway"

  # Login requiered to provision the API Gateway
  wsk bluemix login \
    --user $BLUEMIX_USER \
    --password $BLUEMIX_PASS \
    --namespace ${BLUEMIX_ORGANIZATION}_${BLUEMIX_SPACE}

  echo -e "${BLUE}"
  echo "~~~~~~~~~~~~~~~~~~~~~~~~~~ 1/5) Deploy Joke Action with HTTP-VERB GET ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
  echo -e "${NC}"
  cd openwhisk/joke
  # preserve dev deps if any
  mkdir -p .mod
  mv node_modules .mod
  # install only prod deps
  npm install --production  > /dev/null
  # zip all but skip the dev deps
  zip -rq action.zip package.json lib/Joke.js node_modules
  # delete prod deps
  rm -rf node_modules
  # recover dev deps
  mv .mod node_modules
  # install zip in openwhisk
  wsk action create testJoke --kind nodejs:6 action.zip --web true
  wsk api create -n "$API_NAME" $API_BASE_PATH /joke get testJoke --response-type json
  cd ../..

  echo -e "${BLUE}"
  echo "~~~~~~~~~~~~~~~~~~~~~~~~~~ 2/5) Deploy Meal Action with HTTP-VERB GET ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
  echo -e "${NC}"
  cd openwhisk/meal
  # preserve dev deps if any
  mkdir -p .mod
  mv node_modules .mod
  # install only prod deps
  npm install --production  > /dev/null
  # zip all but skip the dev deps
  zip -rq action.zip package.json lib/Meal.js node_modules
  # delete prod deps
  rm -rf node_modules
  # recover dev deps
  mv .mod node_modules
  # install zip in openwhisk
  wsk action create testMeal --kind nodejs:6 action.zip --web true
  wsk api create $API_BASE_PATH /meal get testMeal --response-type json
  cd ../..

  echo -e "${BLUE}"
  echo "~~~~~~~~~~~~~~~~~~~~~~ 3/5) Deploy Timetables Action with HTTP-VERB POST ~~~~~~~~~~~~~~~~~~~~~~~~~~~"
  echo -e "${NC}"
  cd openwhisk/timetables
  # preserve dev deps if any
  mkdir -p .mod
  mv node_modules .mod
  # install only prod deps
  npm install --production  > /dev/null
  # zip all but skip the dev deps
  zip -rq action.zip package.json lib/Timetables.js node_modules
  # delete prod deps
  rm -rf node_modules
  # recover dev deps
  mv .mod node_modules
  # install zip in openwhisk
  wsk action create testTimetables --kind nodejs:6 action.zip --web true
  wsk api create $API_BASE_PATH /timetables post testTimetables --response-type json
  cd ../..

  echo -e "${BLUE}"
  echo "~~~~~~~~~~~~~~~~~~~~~~~ 4/5) Deploy Weather Action with HTTP-VERB POST ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
  echo -e "${NC}"
  # save router sources
  cd openwhisk/weather
  cp ./lib/Weather.js ./lib/Weather.js.org
  sed -i -e 's%$WEATHER_COMPANY_URL%'"\'${WEATHER_COMPANY_URL}\'"'%g' ./lib/Weather.js
  # preserve dev deps if any
  mkdir -p .mod
  mv node_modules .mod
  # install only prod deps
  npm install --production  > /dev/null
  # zip all but skip the dev deps
  zip -rq action.zip package.json lib/Weather.js node_modules
  # delete prod deps
  rm -rf node_modules
  # recover dev deps
  mv .mod node_modules
  # install zip in openwhisk
  wsk action create testWeather --kind nodejs:6 action.zip --web true
  wsk api create $API_BASE_PATH /weather post testWeather --response-type json
  #recover router source
  cp ./lib/Weather.js ./lib/Weather.js.trans
  mv ./lib/Weather.js.org ./lib/Weather.js
  cd ../..

  echo -e "${BLUE}"
  echo "~~~~~~~~~~~~~~~~~~~~~~~~ 5/5) Deploy Router Action with HTTP-VERB POST ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
  echo -e "${NC}"
  # save router sources
  cd openwhisk/router
  cp ./lib/conversation.js ./lib/conversation.js.org
  # prepare router sources
  sed -i -e 's/$CONVERSATION_USERNAME/'"\'${CONVERSATION_USERNAME}\'"'/g' ./lib/conversation.js
  sed -i -e 's/$CONVERSATION_PASSWORD/'"\'${CONVERSATION_PASSWORD}\'"'/g' ./lib/conversation.js
  sed -i -e 's/$CONVERSATION_WORKSPACE_ID/'"\'${CONVERSATION_WORKSPACE_ID}\'"'/g' ./lib/conversation.js
  # preserve dev deps if any
  mkdir -p .mod
  mv node_modules .mod
  # install only prod deps
  npm install --production  > /dev/null
  # zip all but skip the dev deps
  zip -rq action.zip package.json lib node_modules
  # delete prod deps
  rm -rf node_modules
  # recover dev deps
  mv .mod node_modules
  # install zip in openwhisk
  wsk action create testRouter --kind nodejs:6 action.zip --web true
  wsk api create $API_BASE_PATH /router post testRouter --response-type http
  #recover router source
  cp ./lib/conversation.js ./lib/conversation.js.trans
  mv ./lib/conversation.js.org ./lib/conversation.js
  cd ../..

  echo -e "${GREEN}"
  echo -e "Deployment Complete!"
  echo -e "${NC}"
}

function uninstall() {
  echo -e "${BLUE}"
  echo "===================================================================================================="
  echo "                                     Undeploying Test-Actions                                       "
  echo "===================================================================================================="
  echo -e "${NC}"

  echo "Removing API actions..."
  wsk api delete $API_BASE_PATH

  echo "Removing actions..."
  wsk action delete testMeal
  wsk action delete testRouter
  wsk action delete testTimetables
  wsk action delete testJoke
  wsk action delete testWeather

  echo -e "${GREEN}"
  echo -e "Undeployment Complete"
  echo -e "${NC}"
}

function showenv() {
  echo -e BLUEMIX_ORGANIZATION="$BLUEMIX_ORGANIZATION"
  echo -e BLUEMIX_PASS="$BLUEMIX_PASS"
  echo -e BLUEMIX_SPACE="$BLUEMIX_SPACE"
  echo -e BLUEMIX_USER="$BLUEMIX_USER"
  echo -e CONVERSATION_PASSWORD="$CONVERSATION_PASSWORD"
  echo -e CONVERSATION_USERNAME="$CONVERSATION_USERNAME"
  echo -e OPENWHISK_KEY="$OPENWHISK_KEY"
  echo -e WEATHER_COMPANY_URL="$WEATHER_COMPANY_URL"
  echo -e CONVERSATION_WORKSPACE_ID="$CONVERSATION_WORKSPACE_ID"
  echo -e CONVERSATION_ID="$CONVERSATION_ID"
  echo -e WSK_API_CODE="$WSK_API_CODE"
}

case "$1" in
"--install" )
install
;;
"--uninstall" )
uninstall
;;
"--env" )
showenv
;;
* )
usage
;;
esac