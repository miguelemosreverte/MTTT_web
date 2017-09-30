#!/bin/bash

if [ ! -f .configured ]; then
    sudo sh configure.sh
fi

echo "Deploying services"
echo
#deploy the services
sudo docker stack deploy --compose-file docker-compose.yml MTTT

echo "Current docker services"
echo
#show the running services
sudo docker service ls
