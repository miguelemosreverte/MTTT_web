# TTT_web
MTTT_web is a port to the web of TTT, (short of Machine Translation Training Tool), made in cooperation with Paula Estrella.

Here's the Corpus Preparation tab, where the users can choose files and prepare them (ie.: send the for tokenization) for the training:
![alt text](https://cloud.githubusercontent.com/assets/9152392/26280745/70e65242-3db6-11e7-9583-e130823c643d.png)
The training tab:
![alt text](https://cloud.githubusercontent.com/assets/9152392/26280746/70fb1c7c-3db6-11e7-84f7-4764277f7beb.png)
The machine translation tab:
![alt text](https://cloud.githubusercontent.com/assets/9152392/26280747/70fef1a8-3db6-11e7-8f62-ea7c1194b38c.png)
Evaluation:
![alt text](https://cloud.githubusercontent.com/assets/9152392/26280748/71024614-3db6-11e7-9136-3dd1278cff7d.png)
Post-Edition, which can be bilingual
![alt text](https://cloud.githubusercontent.com/assets/9152392/26280749/7106bba4-3db6-11e7-8c46-62e16bf25cfb.png)
or monolingual
![alt text](https://cloud.githubusercontent.com/assets/9152392/26280750/710e72cc-3db6-11e7-8417-5fad7d8c6f29.png)
And Differences
![alt text](https://cloud.githubusercontent.com/assets/9152392/26280763/f0bad3b2-3db6-11e7-9f87-130336b05711.png)



## Prerequisites

Install [Docker](https://www.docker.com/) on your system.

* [Install instructions](https://docs.docker.com/installation/mac/) for Mac OS X
* [Install instructions](https://docs.docker.com/installation/ubuntulinux/) for Ubuntu Linux
* [Install instructions](https://docs.docker.com/installation/) for other platforms

Install [Docker Compose](http://docs.docker.com/compose/) on your system.

* Python/pip: `sudo pip install -U docker-compose`
* Other: ``curl -L https://github.com/docker/compose/releases/download/1.1.0/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose; chmod +x /usr/local/bin/docker-compose``

## Setup and start

Run `sudo sh run.sh`. It will create a local docker repository from where docker images for the MTTT web and Moses API will be loaded. After that it will load them and run them as scalable services.
