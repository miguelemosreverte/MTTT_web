#!/bin/bash

# Removing services just in case they are up and running
sudo docker service rm moses_api
sudo docker service rm mtttweb_web

echo "Making docker accept experimental usage"
File="/etc/docker/daemon.json"
String="{\"experimental\":true}"
if ! grep -q $String $File
then
echo $String >> $File
echo sudo systemctl restart docker
echo sudo docker swarm init
fi
echo "Making docker accept experimental usage: DONE"



echo "Creating docker registry service"
# then spin up the registry service listening on port 9000
docker run -d -p 9000:5000 --restart=always --name registry \
  -v `pwd`/auth/htpasswd:/auth/htpasswd:ro \
  -v `pwd`/registry:/var/lib/registry \
  -e "REGISTRY_AUTH=htpasswd" \
  -e "REGISTRY_AUTH_HTPASSWD_REALM=Local Registry" \
  -e "REGISTRY_AUTH_HTPASSWD_PATH=/auth/htpasswd" \
  -e "REGISTRY_STORAGE_FILESYSTEM_ROOTDIRECTORY=/var/lib/registry" \
  registry:2
echo "Creating docker registry service: DONE"


echo "Logging as developer to the registry server"
#login
docker login --username=username --password=password localhost:9000
echo "Logging as developer to the registry server: DONE"


echo "Pushing docker images to the registry server"
# then push your images
docker tag mtttweb_moses_api localhost:9000/mtttweb_moses_api
docker push localhost:9000/mtttweb_moses_api

docker tag mtttweb_web localhost:9000/mtttweb_web
docker push localhost:9000/mtttweb_web
echo "Pushing docker images to the registry server :DONE"

#finnally, create .configured file as flag
touch .configured
echo
echo
echo "CONFIGURATION FINALIZED SUCCESSFULLY"
echo
