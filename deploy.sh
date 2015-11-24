#!/usr/bin/env bash
# see: https://gist.github.com/domenic/ec8b0fc8ab45f39403dd

mkdir gh-pages
cp -r dist/ gh-pages
cd gh-pages

git init

git config user.name "Travis CI"
git config user.email "travis@travis-ci.org"

git add .
git commit -m "Deploy to GitHub Pages"

git push --force --quiet "https://${GH_TOKEN}@${GH-REF}" master:gh-pages > /dev/null 2>&1