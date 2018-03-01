#!/bin/bash
set -e
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

# Remove Deployments that are left over by interrupted Test-Run
./deploy_test.sh --uninstall
./deploy_test.sh --install

echo "Find and set API URL"
export API_URL=`wsk api list $API_BASE_PATH $API_PATH | grep iwibot | awk '{print $5}'`
echo "API-URL:......................${API_URL}"

source local.env
export WSK_API_CODE
echo "Openwhisk-Auth-Key:...........$WSK_API_CODE"
export CONVERSATION_WORKSPACE_ID
echo "Conversation-Workspace-ID:....$CONVERSATION_WORKSPACE_ID"
export CONVERSATION_ID
echo "Conversation-ID:..............$CONVERSATION_ID"

echo -e "${BLUE}"
echo "===================================================================================================="
echo "                                         Running tests                                              "
echo "===================================================================================================="
echo -e "${NC}"

echo -e "${BLUE}"
echo "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 1/5) Running test joke ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
echo -e "${NC}"

cd openwhisk/joke
rm -rf node_modules
npm install > /dev/null
npm test

echo -e "${BLUE}"
echo "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 2/5) Running test meal ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
echo -e "${NC}"

cd ../meal
rm -rf node_modules
npm install > /dev/null
npm test

echo -e "${BLUE}"
echo "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 3/5) Running test router ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
echo -e "${NC}"

cd ../router
rm -rf node_modules
npm install > /dev/null
# npm test

echo -e "${BLUE}"
echo "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 4/5) Running test timetables ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
echo -e "${NC}"

cd ../timetables
rm -rf node_modules
npm install > /dev/null
npm test

echo -e "${BLUE}"
echo "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 5/5) Running test weather ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
echo -e "${NC}"

cd ../weather
rm -rf node_modules
npm install > /dev/null
npm test

cd ../..

./deploy_test.sh --uninstall

echo -e "${GREEN}"
echo -e "______________________       __    ___    ___    __        ___       ___       _____________________"
echo -e "                      )  ____) |  |   |  |  /  __) \    ___)  )  ____)  )  ____)                    "
echo -e "                     (  (___   |  |   |  | |  /     |  (__   (  (___   (  (___                      "
echo -e "                      \___  \  |  |   |  | | |      |   __)   \___  \   \___  \                     "
echo -e "                      ____)  ) |   \_/   | |  \__   |  (___   ____)  )  ____)  )                    "
echo -e "_____________________(      (___\       /___\    )_/       )_(      (__(      (_____________________"
echo -e "${NC}"