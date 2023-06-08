#!/bin/bash

yarn install
yarn build
pm2 delete watermarker 
PORT=4004 pm2 start node --name "watermarker" -- build

