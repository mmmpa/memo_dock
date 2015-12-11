/// <reference path="../types/tsd.d.ts" />
var _ = require('lodash');
var RouterNode = (function () {
    function RouterNode() {
        this.next = {};
    }
    RouterNode.prototype.add = function (name) {
        return this.next[name] = new RouterNode();
    };
    RouterNode.prototype.findOrCreate = function (name) {
        return this.find(name) || this.add(name);
    };
    RouterNode.prototype.find = function (name) {
        return this.next[name];
    };
    return RouterNode;
})();
var Router = (function () {
    function Router() {
        this.map = new RouterNode();
        this.mapped = {};
        this.normalized = {};
    }
    Router.prototype.add = function (url, app) {
        if (this.isExist(url)) {
            return false;
        }
        var normalized = this.normalize(url);
        var now = this.map;
        var routeNames = normalized[0].split('/');
        _.each(routeNames, function (name) {
            if (name === '') {
                return;
            }
            now = now.findOrCreate(name);
        });
        now.app = app;
        now.parameters = normalized[1].split(':');
        return this.mapped[normalized[0]] = true;
    };
    Router.prototype.execute = function (url) {
        var store = [];
        var now = this.map;
        var ref = Router.strip(url).split('/');
        _.each(ref, function (name) {
            if (now.find(name)) {
                now = now.find(name);
            }
            else if (now.find(':')) {
                store.push(name);
                now = now.find(':');
            }
        });
        var params = {};
        var paramNames = now.parameters;
        _.each(paramNames, function (name, index) {
            params[name] = store[index];
        });
        return now.app(params);
    };
    Router.isIncludePlaceholder = function (url) {
        return url.match(/:[a-z_0-9]+/) != null;
    };
    ;
    Router.strip = function (url) {
        return url.replace(/\/$/ig, '').replace(/.+?:\/\/(.+?)\//, '/').replace(/\?.*/, '');
    };
    ;
    Router.prototype.isExist = function (url) {
        return this.find(url) != undefined;
    };
    Router.prototype.find = function (url) {
        var normalized = this.normalize(url);
        return this.mapped[normalized[0]];
    };
    ;
    Router.prototype.normalize = function (url) {
        if (this.normalized[url]) {
            return this.normalized[url];
        }
        if (!Router.isIncludePlaceholder(url)) {
            return this.normalized[url] = [Router.strip(url), ''];
        }
        return this.normalized[url] = this.pickHolder(url, []);
    };
    ;
    Router.prototype.pickHolder = function (url, holders) {
        var result = url.match(/(:[a-z_0-9]+)/);
        if (!result) {
            return [Router.strip(url), holders.join(':')];
        }
        return this.pickHolder(url.replace(result[1], ':'), holders.concat(result[1].replace(':', '')));
    };
    ;
    return Router;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Router;
//# sourceMappingURL=router.js.map