var React = require('react');
var redux_devtools_1 = require('redux-devtools');
var redux_devtools_log_monitor_1 = require('redux-devtools-log-monitor');
var redux_devtools_dock_monitor_1 = require('redux-devtools-dock-monitor');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = redux_devtools_1.createDevTools(React.createElement(redux_devtools_dock_monitor_1.default, {"toggleVisibilityKey": "ctrl-h", "changePositionKey": "ctrl-w"}, React.createElement(redux_devtools_log_monitor_1.default, null)));
//# sourceMappingURL=dev-tools.js.map