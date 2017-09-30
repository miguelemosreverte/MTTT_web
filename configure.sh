echo "Removing services"
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
echo "DONE"




# then spin up the registry service listening on port 9000
docker run -d -p 9000:5000 --restart=always --name registry \
  -v `pwd`/auth/htpasswd:/auth/htpasswd:ro \
  -v `pwd`/registry:/var/lib/registry \
  -e "REGISTRY_AUTH=htpasswd" \
  -e "REGISTRY_AUTH_HTPASSWD_REALM=Local Registry" \
  -e "REGISTRY_AUTH_HTPASSWD_PATH=/auth/htpasswd" \
  -e "REGISTRY_STORAGE_FILESYSTEM_ROOTDIRECTORY=/var/lib/registry" \
  registry:2

#login
docker login --username=miguelemos --password=alatriste localhost:9000

# then push your images
docker tag mtttweb_moses_api localhost:9000/mtttweb_moses_api
docker push localhost:9000/mtttweb_moses_api

docker tag mtttweb_web localhost:9000/mtttweb_web
docker push localhost:9000/mtttweb_web
