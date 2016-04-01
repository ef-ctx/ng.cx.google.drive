#!/bin/bash

NPM_DIR='dist'
NPM_BUMP='patch'
BUMPS=('major' 'minor' 'patch')

while test $# -gt 0; do
  case "$1" in
    -b*|--bump*)
      NPM_BUMP=`echo $1 | sed -e 's/^[^=]*=//g'`
      shift
      ;;
    *)
      break
      ;;
  esac
done

if [[ " ${arr[*]} " == *" $NPM_BUMP "* ]]; then
    echo "arr contains d"
fi

validBump () {
  local e
  for e in "${@:2}"; do [[ "$e" == "$1" ]] && return 0; done
  return 1
}

validBump $NPM_BUMP "${BUMPS[@]}"
if [ $? != 0 ]; then
  echo "$NPM_BUMP is not a vaild bump string, use major, minor, patch"
  exit 1
fi

rm -fr $NPM_DIR
gulp dist

npm version $NPM_BUMP -m "chore(release): %s"

cp README.md $NPM_DIR
gulp dist-package-json

npm publish $NPM_DIR
git push --tags
