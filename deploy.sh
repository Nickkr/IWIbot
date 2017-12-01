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
export API_NAME="iwibot API"
export API_BASE_PATH="/iwibot"
#export API_PATH="/iwibot"

function usage() {
  echo -e "Usage: $0 [--install,--uninstall,--env]"
}

function install() {
  # Exit if any command fails
  set -e

  echo -e "Deploying OpenWhisk actions, triggers, and rules for IWIBot"

  echo -e "Setting Bluemix credentials and logging in to provision API Gateway"

  # Login requiered to provision the API Gateway
  wsk bluemix login \
    --user $BLUEMIX_USER \
    --password $BLUEMIX_PASS \
    --namespace ${BLUEMIX_ORGANIZATION}_${BLUEMIX_SPACE}

  echo -e "\n"

  echo "Deploy GET Joke Action"
  cd openwhisk/joke
  # preserve dev deps if any
  mkdir -p .mod
  mv node_modules .mod
  # install only prod deps only=production
  npm install --production
  # zip all but skip the dev deps
  zip -rq action.zip package.json lib node_modules
  # delete prod deps
  rm -rf node_modules
  # recover dev deps
  mv .mod node_modules
  # install zip in openwhisk
  wsk action create Joke --kind nodejs:6 action.zip --web true
  cd ../..

  echo "Deploy GET Meal Action"
  cd openwhisk/meal
  # preserve dev deps if any
  mkdir -p .mod
  mv node_modules .mod
  # install only prod deps
  npm install --production
  # zip all but skip the dev deps
  zip -rq action.zip package.json lib node_modules
  # delete prod deps
  rm -rf node_modules
  # recover dev deps
  mv .mod node_modules
  # install zip in openwhisk
  wsk action create Meal --kind nodejs:6 action.zip --web true
  cd ../..

  echo "Deploy GET Router Action"
  cd openwhisk/router
  # preserve dev deps if any
  mkdir -p .mod
  mv node_modules .mod
  # install only prod deps
  npm install --production
  # zip all but skip the dev deps
  zip -rq action.zip package.json lib node_modules
  # delete prod deps
  rm -rf node_modules
  # recover dev deps
  mv .mod node_modules
  # install zip in openwhisk
  wsk action create Router --kind nodejs:6 action.zip --web true
  #wsk api create -n "$API_NAME" $API_BASE_PATH $API_PATH /router post Router --response-type http
  wsk api create -n "$API_NAME" $API_BASE_PATH /router post Router --response-type http
  cd ../..

  echo "Deploy GET Timetables Action"
  cd openwhisk/timetables
  # preserve dev deps if any
  mkdir -p .mod
  mv node_modules .mod
  # install only prod deps
  npm install --production
  # zip all but skip the dev deps
  zip -rq action.zip package.json lib node_modules
  # delete prod deps
  rm -rf node_modules
  # recover dev deps
  mv .mod node_modules
  # install zip in openwhisk
  wsk action create Timetables --kind nodejs:6 action.zip --web true
  cd ../..

  echo "Deploy POST Weather Action"
  cd openwhisk/weather
  # preserve dev deps if any
  mkdir -p .mod
  mv node_modules .mod
  # install only prod deps
  npm install --production
  # zip all but skip the dev deps
  zip -rq action.zip package.json lib node_modules
  # delete prod deps
  rm -rf node_modules
  # recover dev deps
  mv .mod node_modules
  # install zip in openwhisk
  wsk action create Weather --kind nodejs:6 action.zip --web true
  cd ../..

  echo -e "Deployment Complete"
}

function uninstall() {
  echo -e "Undeploying..."

  echo "Removing API actions..."
  wsk api delete $API_BASE_PATH

  echo "Removing actions..."
  wsk action delete Meal
  wsk action delete Router
  wsk action delete Timetables
  wsk action delete Joke
  wsk action delete Weather

  echo -e "Undeployment Complete"
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
