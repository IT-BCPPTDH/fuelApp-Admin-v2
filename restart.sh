#!/bin/bash

pm2 stop fe-collector
pm2 delete fe-collector
pm2 save

pm2 start --name=fe-collector bun -- run preview
pm2 save
