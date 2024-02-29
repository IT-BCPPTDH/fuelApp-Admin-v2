#!/bin/bash

pm2 stop fe-collector
pm2 delete fe-collector
pm2 save
