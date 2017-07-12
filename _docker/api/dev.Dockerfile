FROM ubuntu:trusty

MAINTAINER Han Zhang <zhanghan.simon@gmail.com>

# nginx and uwsgi plugin
RUN apt-get update && \
    apt-get -y install \
    wget \
    curl \
    telnet \
    vim \
    python-dev \
    supervisor \
    uwsgi \
    # for paypal API
    libssl-dev \
    libffi-dev

# install pip
ENV PYTHON_PIP_VERSION 8.1.2
RUN curl -SL 'https://bootstrap.pypa.io/get-pip.py' | python \
    && pip --no-cache-dir install --upgrade pip==$PYTHON_PIP_VERSION && \
    pip --no-cache-dir install uwsgi

# setup supervisord
RUN mkdir -p /var/log/supervisor

# create target folder
RUN mkdir /var/www
WORKDIR /var/www

# install dependencies
ADD requirements.txt ./requirements.txt
RUN pip --no-cache-dir install -r requirements.txt

# get credentials
RUN mkdir -p /var/www/.credentials && \
    cd /var/www/.credentials && \
    wget http://www.stack360.io/my-weekly-status.json && \
    cp -rf /var/www/.credentials ~/.credentials && \
    chmod 755 -R /var/www/.credentials

# clean all caches
RUN apt-get clean

CMD ["/usr/local/bin/uwsgi", "/var/www/quicksilver_api/_docker/api/uwsgi.ini"]
