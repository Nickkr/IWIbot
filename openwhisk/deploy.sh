#!/bin/bash

COMMAND=$1

if [ "$1" = "" ]; then

    echo "Usage:"
	echo " bash deploy.sh [Command]"
	echo ""
	echo "Commands:"
	echo " --install		All .js actions in the directory are created in OpenWhisk"
	echo " --uninstall		All .js actions in the directory are deleted in OpenWhisk"
	echo " --update			All .js actions in the directroy are updated/creadted in OpenWhisk"
    exit
fi

if [ "$COMMAND" = "--install" ]; then

    echo "Initiating deploy sequence..."
    SAVEIFS=$IFS
    IFS=$(echo -en "\n\b")
    for file in *; do wsk action create ${file/.js/} $file; done
    IFS=$SAVEIFS
    echo "Deployment is done"
    exit 
elif [ "$COMMAND" = "--uninstall" ]; then
	echo "Initiating delete sequence..."
	SAVEIFS=$IFS
	IFS=$(echo -en "\n\b")
	for file in *; do wsk action delete ${file/.js/}; done
	IFS=$SAVEIFS
    echo "Deployment is done"
	exit
elif [ "$COMMAND" = "--update" ]; then
	echo "Initiating update sequence..."
	SAVEIFS=$IFS
	IFS=$(echo -en "\n\b")
	for file in *; do wsk action update ${file/.js/} $file; done
	IFS=$SAVEIFS
    echo "Deployment is done"
	exit
fi
