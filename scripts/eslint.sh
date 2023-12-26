#!/bin/bash

#
# This repo is using the new configuration file for eslint. This new
# configuration spec is not yet stabe and does require some set up to be used
# properly. 
#
# This script helps standardize the linting call.
#

ESLINT_USE_FLAT_CONFIG=true eslint . --config eslint.config.cjs
