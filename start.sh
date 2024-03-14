#!/bin/bash

pm2 start --name=fe-collector bun -- run preview
pm2 save
