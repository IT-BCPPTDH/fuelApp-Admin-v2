#!/bin/bash

pm2 start --name=new-fuel-app bun -- run preview
pm2 save
