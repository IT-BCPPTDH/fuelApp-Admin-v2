#!/bin/bash

pm2 start --name=fe-collector npm -- run preview
pm2 save
