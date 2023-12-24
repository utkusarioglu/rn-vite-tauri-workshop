#!/bin/bash

echo "Cleaning cache files…"
rm -rf {apps,packages}/*/{vite.node,tsconfig.tsbuildinfo,.turbo,.tamagui}
rm -rf .turbo

echo "Cleaning builds…"
rm -rf {apps,packages}/*/{dist,types,build}
rm -rf apps/android/android/app/build
