#!/bin/bash

pm2 stop admin-fuelApp
pm2 delete admin-fuelApp
pm2 save
