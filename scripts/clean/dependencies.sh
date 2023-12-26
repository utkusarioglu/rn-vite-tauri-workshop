#!/bin/bash

echo "Cleaning node modules…"
rm -rf node_modules {targets,packages,configs}/*/node_modules
