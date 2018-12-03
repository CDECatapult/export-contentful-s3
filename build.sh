#!/usr/bin/env bash
set -o nounset -o errexit -o pipefail -o noclobber

readonly folder=$(pwd)
readonly archive=$(basename $folder).zip

# Only install production packages
yarn --production

# Remove previous archive (if exists)
rm -f $archive

# Zip sources in archive
zip -9qyrX $archive ./node_modules index.js package.json
