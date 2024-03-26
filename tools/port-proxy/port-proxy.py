# Updated to be more "Tizen device friendly"
#
# Original:
# Author: Mario Scondo (www.Linux-Support.com)
# Date: 2010-01-08
# Script template by Stephen Chappell
#
# This script forwards a number of configured local ports
# to local or remote socket servers.
#
# Configuration:
# Add to the config file port-forward.config lines with
# contents as follows:
#   <local incoming port> <dest hostname> <dest port>
#
# Start the application at command line with 'python port-forward.py'
# and stop the application by keying in <ctrl-c>.
#
# Error messages are stored in file 'error.log'.
#

import socket
import sys
import _thread
import time

def main(setup, error, args):
    # open file for error messages
    # sys.stderr = file(error, 'a')

    # if args
    print(args)
    print(len(args))
    if (len(args) > 0):
        for settings in parse_args(args):
            _thread.start_new_thread(server, settings)
    else:
        # read settings for port forwarding
        for settings in parse(setup):
            _thread.start_new_thread(server, settings)
    # wait for <ctrl-c>
    while True:
       time.sleep(60)

def parse(setup):
    print(setup)
    settings = list()
    file = open(setup,"r")
    print(file)
    for line in file:
        print(line)
        # skip comment line
        if line.startswith('#'):
            continue

        parts = line.split(":")
        settings.append((int(parts[0]), parts[1], int(parts[2])))
    file.close()
    return settings

def parse_args(args):
    settings = list()
    print(args)
    for line in args:
        print(line)
        parts = line.split(":")
        settings.append((int(parts[0]), parts[1], int(parts[2])))
    return settings

def server(*settings):
    try:
        dock_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        dock_socket.bind(('', settings[0]))
        dock_socket.listen(5)
        while True:
            client_socket = dock_socket.accept()[0]
            server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            server_socket.connect((settings[1], settings[2]))
            _thread.start_new_thread(forward, (client_socket, server_socket))
            _thread.start_new_thread(forward, (server_socket, client_socket))
    finally:
        _thread.start_new_thread(server, settings)

def forward(source, destination):
    string = ' '
    while string:
        string = source.recv(1024)
        if string:
            destination.sendall(string)
        else:
            source.shutdown(socket.SHUT_RD)
            destination.shutdown(socket.SHUT_WR)

if __name__ == '__main__':
    main('port-proxy.config', 'error.log', sys.argv[1:])
