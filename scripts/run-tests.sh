#!bin/bash

parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
root_path="${parent_path}/.."

run_tests() {
  npm run test
}

finish() {
  local result=$?
  exit "${result}"
}

finish_err() {
  local result=$?
  printf "Nextjsapp tests failed \n"
  exit "${result}"
}

trap finish_err ERR
trap finish EXIT

cd "${root_path}"

run_tests