#Seab.us
=======

# base requirements setup
```
    sudo apt-get update
    sudo apt-get install -y git nginx python-pip python-dev python-pandas memcached sqlite3
    sudo pip install virtualenv
```
# repo setup
```
    ssh-keyscan -H github.com >> ~/.ssh/known_hosts
    git clone git@github.com:hsiboy/seabus.git
    cd seabus
    virtualenv /seabus/.venv-seabus
    source seabus/.venv-seabus/bin/activate
    pip install -r /home/vagrant/seabus/seabus/requirements.txt
```
# nginx setup
```
    rm /etc/nginx/sites-enabled/default
    cp config/nginx-seabus-dev /etc/nginx/sites-enabled/seabus
    mkdir -p /var/www
    ln -s /home/<user>/seabus/seabus/web/static /var/www/seabus
    service nginx reload
```



#Listener
The [listener](seabus/nmea_listen/listener.py) program receives and processses marine telemetry data relayed from a raspberry pi with an [RTL-SDR](http://www.rtl-sdr.com/about-rtl-sdr/) tuner running [aisdecoder](https://github.com/sailoog/aisdecoder) to decode [AIS beacons](https://en.wikipedia.org/wiki/Automatic_identification_system).

#Web
The [flask app](seabus/web/) provides near realtime access to the seabus telemetry data via websocket push updates.

* Initialize empty database.
```
(.venv) user@host:~/seabus$ ./manage.py db upgrade
```

To run the web app:
```
(.venv) user@host:~/seabus$ ./manage.py rundev
```

To run the listener:
```
(.venv) user@host:~/seabus$ ./manage.py listendev
```

To send a few recorded (canned) seabus AIS update beacons to the running listener:
```
(.venv) user@host:~/seabus/seabus/nmea_listen$ ./sendbeacons.sh seabus_beacons.txt 
```


#API

There is an experimental API read endpoint available at [http://api.seab.us/data/v1](http://api.seab.us/data/v1). At the moment it requires no access key and provides the same data delivered to the web front end. Both of these things may change, watch this space!
