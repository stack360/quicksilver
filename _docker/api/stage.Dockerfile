FROM python:2.7.12-alpine

MAINTAINER Han Zhang <zhanghan.simon@gmail.com>

RUN apk add --no-cache \
    bash \
    wget \
    vim \
    supervisor \
    python-dev \
    uwsgi-python \
    build-base \
    linux-headers \
    # for paypal API
    libffi-dev \
    openssl-dev

# create target folder
RUN mkdir /var/www
WORKDIR /var/www

COPY . ./quicksilver_api
COPY requirements.txt requirements.txt

RUN pip --no-cache-dir install docutils
RUN pip --no-cache-dir install https://github.com/unbit/uwsgi/archive/uwsgi-2.0.zip#egg=uwsgi
RUN pip --no-cache-dir install -r requirements.txt

# setup supervisord
RUN mkdir -p /var/log/supervisor

# get credentials
RUN wget http://www.stack360.io/my-weekly-status.json \
    && mkdir ~/.credentials \
    && cp -rf my-weekly-status.json ~/.credentials/ \
    && chmod 755 -R ~/.credentials

CMD ["/usr/bin/supervisord", "-c", "/var/www/quicksilver_api/_docker/api/supervisord.conf"]
