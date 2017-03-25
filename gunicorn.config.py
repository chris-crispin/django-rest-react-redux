import multiprocessing
import os

address = os.environ.get('HTTP_ADDRESS', '127.0.0.1')
port = os.environ.get('HTTP_PORT', '8000')
log_level = os.environ.get('LOG_LEVEL', 'info')

bind = "{0}:{1}".format(address, port)
workers = multiprocessing.cpu_count() * 2 + 1
threads = 1
