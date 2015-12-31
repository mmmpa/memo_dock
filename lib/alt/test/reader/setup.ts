/// <reference path="../types/tsd.d.ts" />

import { jsdom } from 'jsdom';

global.document = jsdom('<!doctype html><html><body><article id="root"></article><article id="nojs"></article></body></html>');
global.window = document.defaultView;
global.navigator = global.window.navigator;

window.sessionStorage = {};
window.sessionStorage.setItem = ()=> {};
window.sessionStorage.readState = ()=> {};
