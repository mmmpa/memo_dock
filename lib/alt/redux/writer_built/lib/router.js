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
        var stripped = Router.stripUrl(url);
        var ref = stripped.strip.split('/');
        var queryParams = Router.pickParams(stripped.query);
        _.each(ref, function (name) {
            if (now.find(name)) {
                now = now.find(name);
            }
            else if (now.find(':')) {
                store.push(name);
                now = now.find(':');
            }
        });
        var params = queryParams;
        var paramNames = now.parameters;
        _.each(paramNames, function (name, index) {
            params[name] = store[index];
        });
        return now.app(params);
    };
    Router.isIncludePlaceholder = function (url) {
        return url.match(/:[a-zA-Z_0-9]+/) != null;
    };
    ;
    Router.stripUrl = function (url) {
        var base = url.replace(/\/$/ig, '').replace(/.+?:\/\/(.+?)\//, '/').split('?');
        var base2 = base[0].split('#');
        var query = base[1];
        var hash = base2[1];
        var strip = base2[0];
        return {
            strip: strip,
            hash: hash,
            query: query
        };
    };
    ;
    Router.pickParams = function (queryString) {
        if (!queryString) {
            return {};
        }
        var result = {};
        queryString.split('&').map(function (kvString) {
            var kv = kvString.split('=');
            result[kv[0]] = kv[1];
        });
        return result;
    };
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
            return this.normalized[url] = [Router.stripUrl(url).strip, ''];
        }
        return this.normalized[url] = this.pickHolder(url, []);
    };
    ;
    Router.prototype.pickHolder = function (url, holders) {
        var result = url.match(/(:[a-zA-Z_0-9]+)/);
        if (!result) {
            return [Router.stripUrl(url).strip, holders.join(':')];
        }
        return this.pickHolder(url.replace(result[1], ':'), holders.concat(result[1].replace(':', '')));
    };
    ;
    return Router;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Router;
//# sourceMappingURL=router.js.map