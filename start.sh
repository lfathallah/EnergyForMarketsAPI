#!/bin/sh
 docker build . -t energy-for-market-api &&
 docker run -d energy-for-market-api