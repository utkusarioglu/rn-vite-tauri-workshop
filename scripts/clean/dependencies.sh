#!/bin/bash

echo "Cleaning node modules…"
rm -rf node_modules {apps,packages}/*/node_modules
