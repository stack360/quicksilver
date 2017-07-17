#!/bin/bash

wget https://github.com/docker/compose/releases/download/1.15.0-rc1/docker-compose-Linux-x86_64

mv docker-compose-Linux-x86_64 /usr/local/bin/docker-compose
chmod a+x /usr/local/bin/docker-compose

docker -v
service docker start

