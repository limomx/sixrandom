#!/bin/sh
basepath=$(cd `dirname $0`; pwd)
react-native bundle --entry-file ./index.js --bundle-output ./ios/bundle/index.jsbundle --platform ios --assets-dest ./ios/bundle --dev false
