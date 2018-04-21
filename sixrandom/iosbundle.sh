#!/bin/sh
basepath=$(cd `dirname $0`; pwd)
react-native bundle --entry-file ./index.ios.js --bundle-output ./ios/bundle/index.ios.jsbundle --platform ios --assets-dest ./ios/bundle --dev false
