/// <reference path="../types/tsd.d.ts" />

import { jsdom } from 'jsdom';

global.document = jsdom('<!doctype html><html><body><article id="root"></article></body></html>');
global.window = document.defaultView;
global.navigator = global.window.navigator;
