FROM mhart/alpine-node:6

# Alpine 3.4

# Update
RUN apk add --update python python-dev py-pip postgresql-dev musl-dev gcc

ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/

ADD requirements.txt /tmp/
RUN pip install -r /tmp/requirements.txt

RUN npm install -g webpack

WORKDIR /opt/app
ADD . /opt/app

RUN node -v

EXPOSE 8000

CMD ls && pwd && npm run build && python manage.py runserver