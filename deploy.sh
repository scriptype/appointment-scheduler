#!/usr/bin/env bash
# see: https://gist.github.com/domenic/ec8b0fc8ab45f39403dd

mkdir gh-pages
cp -R dist/* gh-pages
cd gh-pages

git init

git config user.name "Travis CI"
git config user.email "travis@travis-ci.org"

git add .
git commit -m "Deploy to GitHub Pages"

git push --force --quiet "https://${GH_TOKEN}@github.com/scriptype/appointment-scheduler.git" HEAD:gh-pages > /dev/null