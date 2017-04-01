#!/bin/bash

COMMAND=$1

if [ "$1" = "" ]; then

echo "add --install or --uninstall as an argument"
exit

fi

if [ "$COMMAND" = "--install" ]; then

echo "Initiating executin of full deploying sequence..."
SAVEIFS=$IFS
IFS=$(echo -en "\n\b")

for file in *; do wsk action create ${file/.js/} $file; done

IFS=$SAVEIFS
echo "Deployment is done"
exit 
elif [ "$COMMAND" = "--uninstall" ]; then

	echo "Initiating execution of deletion sequence..."
	SAVEIFS=$IFS
	IFS=$(echo -en "\n\b")

	for file in *; do wsk action delete ${file/.js/}; done

	IFS=$SAVEIFS
echo "Deployment is done"

	exit

fi
