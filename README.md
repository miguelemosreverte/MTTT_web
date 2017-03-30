# TTT_web
TTT_web is a port to the web of TTT, (short of Translator's Tranining Tool), made in cooperation with Paula Estrella and Roxana Lafuente.

some pics for the lazy (deploying this app is incredibly easy thanks to the Docker dev team.):
The pics have been taken today, 29 of March of 2017, and will not be representative of the final product. And I do not mean the phrase in the way it is usually used for, I mean that only two weeks have gotten the project so far, and a year is ready to be used to continue it. So, I fully expect it to get better. Here is the first tab, Corpus Preparation: 
![alt text](https://cloud.githubusercontent.com/assets/9152392/24483999/3a7b9a12-14d2-11e7-8c17-e72ec8ba31e6.png)
Now here is the Training tab, where the user receives the Moses output from the training:
![alt text](https://cloud.githubusercontent.com/assets/9152392/24483997/3a770dbc-14d2-11e7-810a-e8177e9496c8.png)
And finnally, the Machine Translation tab, where the user can upload files and translate them using the recently built Language Model.
![alt text](https://cloud.githubusercontent.com/assets/9152392/24483998/3a79ac0c-14d2-11e7-9c88-d45852d7131b.png)

All good but... here is where it gets better: See the PostEdition table? You can resize it live. You cannot do that using PyQT or GTK. 
![alt text](https://cloud.githubusercontent.com/assets/9152392/24483996/3a7572d6-14d2-11e7-821d-09bc3e472703.png)

Evaluation tab and Statistics are to be added.


## Prerequisites

Install [Docker](https://www.docker.com/) on your system.

* [Install instructions](https://docs.docker.com/installation/mac/) for Mac OS X
* [Install instructions](https://docs.docker.com/installation/ubuntulinux/) for Ubuntu Linux
* [Install instructions](https://docs.docker.com/installation/) for other platforms

Install [Docker Compose](http://docs.docker.com/compose/) on your system.

* Python/pip: `sudo pip install -U docker-compose`
* Other: ``curl -L https://github.com/docker/compose/releases/download/1.1.0/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose; chmod +x /usr/local/bin/docker-compose``

## Setup

Run `docker-compose build`. It will

* install [nodemon](https://github.com/remy/nodemon) globally in your container
* install all dependencies from the package.json locally
* expose port 3000 to the host
* instruct the container to execute `npm start` on start up.

## Start

Run `docker-compose up` to create and start the container. The app should then be running on your docker daemon on port 3030 (On OS X you can use `boot2docker ip` to find out the IP address).

## Notes on boot2docker

It [appears](https://github.com/boot2docker/boot2docker/issues/290) that boot2docker (OS X, Windows) currently does not automatically sync the system clock with the host system after a host resumes from sleep. This becomes a problem due to the way nodemon detects file changes. That might cause it to go bananas, if the clocks on both systems are "too much" out of sync. Until this is fixed, you might use [this workaround](https://github.com/boot2docker/boot2docker/issues/290#issuecomment-62384209) or simply do a manual sync via

```bash
/usr/local/bin/boot2docker ssh sudo ntpclient -s -h pool.ntp.org
```
