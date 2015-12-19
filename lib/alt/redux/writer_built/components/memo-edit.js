var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var menu_1 = require("../components/menu");
var fa_1 = require('../lib/components/fa');
var _ = require('lodash');
var mixins_1 = require("../mixins");
var status_1 = require('../constants/status');
require("zepto/zepto.min");
var $ = window.$;
require("codemirror/addon/display/placeholder");
require("codemirror/addon/lint/lint.js");
require("codemirror/mode/css/css.js");
require("codemirror/mode/htmlmixed/htmlmixed.js");
require("codemirror/mode/javascript/javascript.js");
require("codemirror/mode/slim/slim.js");
require("codemirror/mode/ruby/ruby.js");
require("codemirror/mode/xml/xml.js");
var CodeMirror = require('codemirror');
var MemoEdit = (function (_super) {
    __extends(MemoEdit, _super);
    function MemoEdit(props) {
        var _this = this;
        _super.call(this, props);
        var memoData = this.props.memoData;
        this.state = {
            memoData: memoData,
            renderer: _.debounce(function () {
                mixins_1.MemoMix.renderSlim(_this.state.memoData.src);
                _this.resize();
            }, 1000)
        };
    }
    MemoEdit.prototype.componentDidUpdate = function () {
        var memoData = this.state.memoData;
        if (this.props.memoData.id !== memoData.id) {
            this.state.memoData.id = memoData.id;
            this.setState({ memoData: this.props.memoData });
        }
        if (this.cm.getValue() != memoData.src) {
            this.cm.setValue(memoData.src || '');
        }
    };
    MemoEdit.prototype.componentDidMount = function () {
        var _this = this;
        this.cm = CodeMirror.fromTextArea($('#editor')[0], {
            lineNumbers: true,
            mode: "slim",
            lineWrapping: true
        });
        setTimeout(function () {
            _this.cm.on('change', _this.changeSrc.bind(_this));
            _this.cm.setSize('100%', '100%');
            _this.cm.setValue(_this.props.memoData.src || '');
            $(window).resize(function (e) { return setTimeout(_this.resize.bind(_this), 2); });
            _this.resize();
        }, 2);
    };
    MemoEdit.prototype.changeSrc = function (e) {
        this.state.renderer();
        var memoData = this.state.memoData;
        memoData.src = e.doc.getValue();
        this.setState(_.merge(this.state, { memoData: memoData }));
    };
    MemoEdit.prototype.changeTitle = function (e) {
        var memoData = this.state.memoData;
        memoData.title = e.target.value;
        this.setState(_.merge(this.state, { memoData: memoData }));
    };
    MemoEdit.prototype.changeTags = function (e) {
        var memoData = this.state.memoData;
        memoData.tagList = e.target.value;
        this.setState(_.merge(this.state, { memoData: memoData }));
    };
    MemoEdit.prototype.detectSaveButton = function () {
        if (this.props.editState === status_1.EditMemoState.Ready) {
            return React.createElement("button", {"className": "memo-edit submit", "onClick": this.save.bind(this)}, React.createElement(fa_1.default, {"icon": "paw"}), "Save");
        }
        else if (this.props.editState === status_1.EditMemoState.Loading) {
            return React.createElement("button", {"className": "memo-edit submit", "onClick": this.save.bind(this)}, React.createElement(fa_1.default, {"icon": "paw"}), "Wait...");
        }
        else {
            return React.createElement("button", {"className": "memo-edit submit", "disabled": true}, React.createElement(fa_1.default, {"icon": "spinner", "animation": "pulse"}), "Saving...");
        }
    };
    MemoEdit.prototype.togglePublic = function (e) {
        var memoData = this.state.memoData;
        memoData.isPublic = !memoData.isPublic;
        this.setState(_.merge(this.state, { memoData: memoData }));
    };
    MemoEdit.prototype.resize = function () {
        var $content = $('#contentArea');
        var _a = $content.position(), top = _a.top, left = _a.left;
        var $html = $('#htmlDisplay');
        var bottom = $('#submitArea').position().top;
        var height = bottom - top;
        if ($('#srcArea').position().left === $('#htmlArea').position().left) {
            height /= 2;
            this.cm.setSize(null, height);
            $html.css({ height: height });
        }
        else {
            this.cm.setSize(null, height);
            $html.css({ height: height });
        }
    };
    MemoEdit.prototype.save = function () {
        mixins_1.MemoMix.saveMemo(this.state.memoData);
    };
    MemoEdit.prototype.writeError = function () {
        var memoMessage = this.props.memoMessage;
        if (!memoMessage) {
            return null;
        }
        var messages = _.pairs(memoMessage.messages).map(function (kv) {
            return React.createElement("li", {"className": "message", "key": kv.join('')}, React.createElement(fa_1.default, {"icon": "comment-o"}), kv.join(':'));
        });
        var errors = _.pairs(memoMessage.errors).map(function (kv) {
            return React.createElement("li", {"className": "error", "key": kv.join('')}, React.createElement(fa_1.default, {"icon": "ban"}), kv.join(':'));
        });
        return React.createElement("ul", null, messages, errors);
    };
    MemoEdit.prototype.render = function () {
        if (!this.state.memoData) {
            return React.createElement("div", null, "loading...");
        }
        var _a = this.state.memoData, title = _a.title, src = _a.src, tagList = _a.tagList, isPublic = _a.isPublic;
        var rendered = this.props.rendered;
        return (React.createElement("article", {"className": "memo-edit"}, React.createElement("link", {"href": "/css/codemirror.css", "rel": "stylesheet", "type": "text/css"}), React.createElement(menu_1.default, null), React.createElement("section", {"className": "memo-edit edit-container"}, React.createElement("section", {"className": "memo-edit title"}, React.createElement("input", {"type": "text", "placeholder": "タイトル", "value": title, "onChange": this.changeTitle.bind(this)})), React.createElement("section", {"className": "memo-edit tags"}, React.createElement("input", {"type": "text", "placeholder": "タグ（スペース区切り）", "value": tagList, "onChange": this.changeTags.bind(this)})), React.createElement("section", {"className": "memo-edit content", "id": "contentArea"}, React.createElement("section", {"className": "memo-edit src", "id": "srcArea"}, React.createElement("textarea", {"id": "editor"})), React.createElement("section", {"className": "memo-edit html", "id": "htmlArea"}, React.createElement("div", {"className": "memo-edit html-container", "id": "htmlDisplay"}, React.createElement("div", {"dangerouslySetInnerHTML": { __html: rendered }})))), React.createElement("section", {"className": "memo-edit submit-area", "id": "submitArea"}, this.detectSaveButton(), React.createElement("div", {"className": "memo-edit public"}, React.createElement("label", null, React.createElement("input", {"type": "checkbox", "checked": isPublic, "onChange": this.togglePublic.bind(this)}), "公開")), React.createElement("div", {"className": "memo-edit error-area"}, this.writeError())))));
    };
    return MemoEdit;
})(React.Component);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MemoEdit;
//# sourceMappingURL=memo-edit.js.map