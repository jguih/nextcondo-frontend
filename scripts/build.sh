#!bin/bash

parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
root_path="${parent_path}/.."

remove_standalone() {
  if [ -d ".next/standalone" ]
  then
    rm -r .next/standalone
  fi
}

build_nextjsapp() {
  npm run build
}

copy_publicfolder() {
  cp -r public .next/standalone/public
}

copy_staticfolder() {
  cp -r .next/static .next/standalone/.next/static
}

finish() {
  local result=$?
  exit "${result}"
}

finish_err() {
  local result=$?
  printf "Failed to build nextjsapp \n"
  exit "${result}"
}

trap finish_err ERR
trap finish EXIT

cd "${root_path}"

remove_standalone
build_nextjsapp
copy_staticfolder
copy_publicfolder