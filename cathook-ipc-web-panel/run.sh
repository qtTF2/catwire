#!/bin/bash

LOG=public/logs/main.log

if [ $EUID != 0 ]; then
	echo "0"
	exit
fi

$(which node || which nodejs) app >$LOG
