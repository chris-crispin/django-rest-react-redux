#!/bin/bash
#create static files on server (should serve this through nginx in future
./manage.py collectstatic --noinput -v0
#start gunicorn wsgi server with json logging
exec gunicorn --config ./gunicorn.config.py --log-config logging.conf api.wsgi