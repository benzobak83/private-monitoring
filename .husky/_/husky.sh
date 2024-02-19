#!/usr/bin/env sh

# ANSI color codes for formatting
RED='\033[0;31m'
GREEN='\e[0;32m'
NC='\033[0m' # No Color

if [ -z "$husky_skip_init" ]; then
  debug () {
    if [ "$HUSKY_DEBUG" = "1" ]; then
      echo "husky (debug) - $1"
    fi
  }

  readonly hook_name="$(basename -- "$0")"
  debug "starting $hook_name..."

  if [ "$HUSKY" = "0" ]; then
    debug "HUSKY env variable is set to 0, skipping hook"
    exit 0
  fi

  if [ -f ~/.huskyrc ]; then
    debug "sourcing ~/.huskyrc"
    . ~/.huskyrc
  fi

  readonly husky_skip_init=1
  export husky_skip_init
  sh -e "$0" "$@"
  exitCode="$?"

  if [ $exitCode != 0 ]; then
    echo -e "\n${RED}error: husky - $hook_name hook exited with code $exitCode (error)\n${NC}"
  fi

  if [ $exitCode = 0 ]; then
    echo -e "\n${GREEN}successful commit\n${NC}"
  fi

  if [ $exitCode = 127 ]; then
    echo -e "\n${RED}error: husky - command not found in PATH=$PATH\n${NC}"
  fi

  exit $exitCode
fi
