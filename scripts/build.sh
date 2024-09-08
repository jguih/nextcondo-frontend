#!bin/bash

parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
root_path="${parent_path}/.."

build_nextjsapp() {
  cd "${root_path}"
  rm -r .next/standalone
  npm run build
}

move_publicfolder() {
  cd "${root_path}"
  cp -r public .next/standalone/public
}

move_staticfolder() {
  cd "${root_path}"
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

build_nextjsapp
move_staticfolder
move_publicfolder