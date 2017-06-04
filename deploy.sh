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

export PATH=$PATH:/mnt/c/Users/nkreu/openwhisk

function usage() {
  echo -e "Usage: $0 [--install,--uninstall,--env]"
}

function install() {

  echo -e "Installing OpenWhisk actions, triggers, and rules for IWIBot"

  echo "Installing GET Joke Action"
  cd openwhisk/joke
  # preserve dev deps
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
  wsk api create /iwibot /joke get Joke --response-type json
  cd ../..

  echo "Installing GET Meal Action"
  cd openwhisk/meal
  # preserve dev deps
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
  wsk api create /iwibot /meal post Meal --response-type json
  cd ../..

   echo "Installing GET Router Action"
  cd openwhisk/router
  # preserve dev deps
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
  wsk api create /iwibot /router post Router --response-type http
  cd ../..

   echo "Installing GET Timetables Action"
  cd openwhisk/timetables
  # preserve dev deps
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
  wsk api create /iwibot /timetables post Timetables --response-type json
  cd ../..

  echo -e "Install Complete"
}

function uninstall() {
  echo -e "Uninstalling..."

  echo "Removing API actions..."
  wsk api delete /iwibot

  echo "Removing actions..."
  #wsk action delete get
   wsk action delete Meal
   wsk action delete Router
   wsk action delete Timetables
   wsk action delete Joke
  echo -e "Uninstall Complete"
}

function showenv() {
  echo -e MY_VARIABLE="$MY_VARIABLE"
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