#! /bin/bash

echo "Working directory content:"
ls -al

echo "Package.json content:"
cat package.json

echo "Installing immutable dependencies"
yarn --immutable
# yarn plugin import workspace-tools

# cd packages/openapi
# yarn generate:all
# cd ../..

# cd ${{ matrix.releases.appRelPath }}
# yarn react-native-asset
