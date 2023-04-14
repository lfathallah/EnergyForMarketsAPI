#!/bin/sh
 docker build . -t energy-for-market-api &&
 docker run -d -p 3000:3000 energy-for-market-api