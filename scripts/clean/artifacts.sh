#!/bin/bash

echo "Cleaning cache files…"
rm -rf src/{targets,packages,configs}/*/{vite.node,tsconfig.tsbuildinfo,.turbo,.tamagui}
rm -rf .turbo

echo "Cleaning builds…"
rm -rf src/{targets,packages,configs}/*/{dist,types,build}
rm -rf src/targets/android/android/app/build
