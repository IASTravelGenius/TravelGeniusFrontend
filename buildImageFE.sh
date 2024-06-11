#!/bin/bash

# make sure we are in the correct directory
current_dir=$(basename "$PWD")

if [[ "$current_dir" == *"TravellingAdvisorFE"* ]]; then
    echo "The current directory name contains 'TravellingAdvisorFE'."
else
    echo "The current directory name does NOT contain 'TravellingAdvisorFE'."
    exit 1
fi

# build docker image
docker build -t frontend .
