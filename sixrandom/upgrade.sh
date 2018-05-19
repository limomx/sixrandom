#!/bin/sh
brew upgrade node
npm config set registry https://registry.npm.taobao.org --global
npm config set disturl https://npm.taobao.org/dist --global
npm install -g
npm upgrade
#npm install -g react-native-git-upgrade
npm install -g yarn react-native-cli
yarn config set registry https://registry.npm.taobao.org --global
yarn config set disturl https://npm.taobao.org/dist --global
brew upgrade watchman
brew upgrade flow
react-native-git-upgrade
