#!/bin/bash

set -e

echo "Deploying wsk actions, etc."
./deploy_test.sh --install

echo "Find and set Joke API URL"
export JOKE_API_URL=`wsk api list | tail -1 | awk '{print $4}'`

echo "Running tests"



echo "Uninstalling wsk actions, etc."
./deploy_test.sh --uninstall