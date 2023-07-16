#!/bin/bash

# for each folder, run yarn install
ls -d */ | xargs -I {} bash -c "cd '{}' && yarn" 