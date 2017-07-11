FROM ubuntu:trusty

MAINTAINER Han Zhang <zhanghan.simon@gmail.com>

# nginx and uwsgi plugin
RUN apt-get update && \
    apt-get -y install \
    curl \
    telnet \
    vim \
    python-dev \
    supervisor \
    uwsgi

# install pip
ENV PYTHON_PIP_VERSION 8.1.2
RUN curl -SL 'https://bootstrap.pypa.io/get-pip.py' | python \
    && pip install --upgrade pip==$PYTHON_PIP_VERSION && \
    pip install uwsgi

# setup supervisord
RUN mkdir -p /var/log/supervisor

# for paypal API
RUN apt-get install -y libssl-dev libffi-dev

# install dependencies
ADD requirements.txt /tmp/requirements.txt
RUN cd /tmp && pip install -r requirements.txt

# create target folder
RUN mkdir /var/www
WORKDIR /var/www

# get credentials
RUN apt-get install -y wget && \
    mkdir -p /var/www/.credentials && \
    cd /var/www/.credentials && \
    wget http://www.stack360.io/my-weekly-status.json && \
    cp -rf /var/www/.credentials ~/.credentials && \
    chmod 755 -R /var/www/.credentials

RUN touch /var/log/uwsgi.log

ADD . /var/www/quicksilver_api

CMD ["/usr/bin/supervisord", "-c", "/var/www/quicksilver_api/_docker/api/supervisord.conf"]

