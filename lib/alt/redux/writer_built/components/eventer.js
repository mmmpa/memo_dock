var events_1 = require('events');
var React = require('react');
var mix_1 = require('../lib/mix');
exports.EventingShared = { emitter: React.PropTypes.object };
var EventingParent = (function () {
    function EventingParent() {
    }
    Object.defineProperty(EventingParent, "childContextTypes", {
        get: function () {
            return exports.EventingShared;
        },
        enumerable: true,
        configurable: true
    });
    EventingParent.prototype.initializeAsEventing = function () {
        var _this = this;
        this.listen(function (eventname, callback) {
            _this._ep_getEmitter().on(eventname, callback);
        });
    };
    EventingParent.prototype.getChildContext = function () {
        return { emitter: this._ep_getEmitter() };
    };
    EventingParent.prototype._ep_getEmitter = function () {
        if (!this.emitter) {
            this.emitter = new events_1.EventEmitter();
        }
        return this.emitter;
    };
    return EventingParent;
})();
exports.EventingParent = EventingParent;
var EventingChild = (function () {
    function EventingChild() {
    }
    Object.defineProperty(EventingChild, "contextTypes", {
        get: function () {
            return exports.EventingShared;
        },
        enumerable: true,
        configurable: true
    });
    EventingChild.prototype.dispatch = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        return (_a = this.context.emitter).emit.apply(_a, args);
        var _a;
    };
    return EventingChild;
})();
exports.EventingChild = EventingChild;
function mixParent(target) {
    mix_1.default(target, [EventingParent]);
    target.childContextTypes = EventingParent.childContextTypes;
}
exports.mixParent = mixParent;
function mixChild(target) {
    mix_1.default(target, [EventingChild]);
    target.contextTypes = EventingChild.contextTypes;
}
exports.mixChild = mixChild;
//# sourceMappingURL=eventer.js.map