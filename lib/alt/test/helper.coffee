jsdom = require 'jsdom'
global.navigator = { userAgent: 'node.js' }
global.document = jsdom.jsdom('<!doctype html><html><p id="main"></p><article id="app"></article></html>')
global.window = document.defaultView
global.$ = require('jquery')

global.App = {}
global.React = require 'react'
global.ReactDOM = require 'react-dom'
global.Promise = require 'bluebird'
global._ = require 'lodash'

path = require 'path'

module.exports = config = {}

pathes = {
  app: path.join(__dirname, '../redux'),
  lib: path.join(__dirname, '../redux/writer_built/lib'),
  writer: path.join(__dirname, '../redux/writer'),
  reader: path.join(__dirname, '../redux/reader')
  support: path.join(__dirname, './supports')
}

config.path = (name, tail)->
  path.join(pathes[name], tail)
