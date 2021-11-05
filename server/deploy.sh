#!/usr/bin/env sh

# abort on errors
# set -e

# build
rm -rf dist/*

# npm run build
yarn run compile

cp package_dist.json dist/package.json

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git main

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f https://github.com/tomm2000/notflix master:heroku-server

cd -
    