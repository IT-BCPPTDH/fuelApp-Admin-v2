#!/bin/bash

pm2 stop new-fuel-app
pm2 delete new-fuel-app
pm2 save
