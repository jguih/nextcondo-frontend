#!/bin/bash

parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
root_path="${parent_path}/.."

run_watch() {
  npm run dev
}

cd "${root_path}"
run_watch

exit 0