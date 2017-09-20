#!/bin/bash

npm run build
git config --global user.email mayumiii.seki@gmail.com
git config --global user.name rnaxu
git checkout -b delivery origin/delivery
ls -A | grep -v "dist" | grep -v ".git" | xargs rm -rf | rm -rf ".gitignore"
cp -r dist/* .
rm -rf dist
if [ -z "$(git status --porcelain)" ]; then
  echo -e "\n*** There is no difference to be committed ***\n\n"
else
  git add -A
  git commit -m "[ci skip] build on circle ci"
  git push origin delivery
fi