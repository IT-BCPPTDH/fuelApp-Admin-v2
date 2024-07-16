#!/bin/bash

bun run build

pm2 stop new-fuel-app
pm2 delete new-fuel-app
pm2 save

pm2 start --name=new-fuel-app bun -- run preview
pm2 save