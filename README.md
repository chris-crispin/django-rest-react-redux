django-rest-react-redux
==================

A Django REST Framework and React/Redux Project for Database Management

Javascript is bundled with webpack and served client side by a Django server on the /app route. Additional routes provide a configurable API, providing model and non-model endpoints used by the client.

Requirements
============

- Postgres (easy via homebrew)
- Python 2.7 (comes installed on OSX)
- pip ```sudo easy_install pip```
- virtualenv ```sudo pip install virtualenv```
- npm and node

Building
=========

Python
------
- change to root directory and start a virtual environment

```cd toolbox && virtualenv venv && source venv/bin/activate```
- install python dependencies for virtual environment

```pip install -r requirements.txt```

Node
----
- install node dependencies
```npm install```

Postgres
---------
- ensure postgres is running on your machine. For MacOS, enter the following command in a terminal window/tab

```postgres -D /usr/local/var/postgres```
- enter psql console (in another terminal window/tab)

```psql postgres```
- in the psql terminal, create a user and database:

```CREATE USER admin WITH PASSWORD 'pass123';```

```ALTER USER django CREATEDB;```

```CREATE DATABASE "EPLDB";```

Running
=======

Node
-----
- in dev mode

```npm run watch```
- in production mode :tada:

```npm run build```

Python
------
- Migrate model changes to DB

```./manage.py makemigrations api && ./manage.py migrate```
- Create a superuser (this will become your admin login and application login)

```./manage.py createsuperuser``` (follow prompts)
- run Django server (dev mode) :metal:

```./manage.py runserver```
- run WSGI server (prod mode)

```./entry_point.sh ```

Test
====

Python
-------
- test runner

```./manage.py test```

- linting

```flake8 api```

Node
-----
- test runner

```npm run test```

- test runner with coverage

```npm run test:coverage```

- test runner with watch (dev mode)

```npm run test:watch```

- linting

```npm run lint```


Useful Endpoints
================

- [API root](http://localhost:8000)
- [Admin](http://localhost:8000/admin)
- [UI](http://localhost:8000/epl)
