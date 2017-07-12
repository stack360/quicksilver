FROM alpine
MAINTAINER Han Zhang <zhanghan.simon@gmail.com>

# nginx and uwsgi plugin
# basic flask environment
RUN apk add --no-cache \
    bash \
    wget \
    vim \
    uwsgi \
    supervisor \
    python-dev \
    uwsgi-python \
    build-base \
    py2-pip \
    linux-headers \
    # for paypal API
    libffi-dev \
    openssl-dev

RUN pip2 --no-cache-dir install docutils
# RUN pip2 --no-cache-dir install https://github.com/unbit/uwsgi/archive/uwsgi-2.0.zip#egg=uwsgi

# setup supervisord

ADD . /var/www/quicksilver_api
# install dependencies
ADD requirements.txt /tmp/requirements.txt
RUN cd /tmp && pip2 --no-cache-dir install -r requirements.txt

# create target folder
# RUN mkdir /var/www
WORKDIR /var/www

# get credentials
RUN mkdir -p /var/www/.credentials && \
    cd /var/www/.credentials && \
    wget http://www.stack360.io/my-weekly-status.json && \
    cp -rf /var/www/.credentials ~/.credentials && \
    chmod 755 -R /var/www/.credentials

RUN mkdir -p /var/log/supervisor

CMD ["/usr/bin/supervisord", "-c", "/var/www/quicksilver_api/_docker/api/supervisord.conf"]

