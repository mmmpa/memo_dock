/// <reference path="../types/tsd.d.ts" />

import { jsdom } from 'jsdom';
const global = require("global");

global.document = jsdom('<!doctype html><html><meta name="csrf-token" content="token" /><body><article id="root"></article><article id="nojs"><h1>portal</h1><section>portal body</section></article></body></html>');
global.window = document.defaultView;
global.navigator = global.window.navigator;
global.location = window.location;

window.sessionStorage = {};
window.sessionStorage.setItem = ()=> null;
window.sessionStorage.readState = ()=> null;

window.hljs = {};
window.hljs.initHighlighting = ()=> null;

global.window.documtnt = global.document;
