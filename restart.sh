#!/bin/bash

bun run build

pm2 stop admin-fuelApp
pm2 delete admin-fuelApp
pm2 save

pm2 start --name=admin-fuelApp bun -- run preview
pm2 save
