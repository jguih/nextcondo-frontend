#!bin/bash

parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
root_path="${parent_path}/.."

build_docker_image() {
  cd "${root_path}"  
  docker build -t thejguih/nextcondo:latest .
}

finish() {
  local result=$?
  exit "${result}"
}

finish_err() {
  local result=$?
  printf "Failed to build nextjsapp docker image \n"
  exit "${result}"
}

trap finish_err ERR
trap finish EXIT

bash scripts/build.sh
bash scripts/run-tests.sh
build_docker_image