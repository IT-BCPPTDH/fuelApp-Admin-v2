#!/bin/bash

pm2 start --name=admin-fuelApp bun -- run dev
pm2 save
