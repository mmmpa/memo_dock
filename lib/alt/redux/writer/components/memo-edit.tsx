import * as React from 'react'
import Menu from "../components/menu";
import Memo from "../models/memo";
import Fa from '../lib/components/fa'
import * as _ from 'lodash'
import {MemoMix} from "../mixins";
require("zepto/zepto.min");

//const $ = Zepto(window);

require("codemirror/addon/display/placeholder");
require("codemirror/addon/lint/lint.js");
require("codemirror/mode/css/css.js");
require("codemirror/mode/htmlmixed/htmlmixed.js");
require("codemirror/mode/javascript/javascript.js");
require("codemirror/mode/slim/slim.js");
require("codemirror/mode/ruby/ruby.js");
require("codemirror/mode/xml/xml.js");

import * as CodeMirror from 'codemirror'

interface IMemoEdit {
  memoData:Memo,
  rendered?:string
}

interface IMemoEditState {
  title:string,
  src:string,
  isPublic:boolean,
  tags?:string[],
  renderer?:Function
}


export default class MemoEdit extends React.Component<IMemoEdit, IMemoEditState> {
  private cm:any;
  private $:any;

  constructor(props) {
    super(props);

    if (this.props.memoData) {
      let {title, src, isPublic} = this.props.memoData;

      this.state = {
        title: title,
        src: src,
        isPublic: isPublic,
        renderer: _.debounce(()=> {
          MemoMix.renderSlim(this.state.src);
          this.resize();
        }, 1000)
      }
    } else {
      this.state = {
        title: '',
        src: '',
        isPublic: false
      }
    }
  }

  componentDidUpdate() {
    if (this.cm.getValue() != this.state.src) {
      this.cm.setValue(this.state.src || '');
    }
  }

  componentDidMount() {
    setTimeout(()=> {
      this.cm = CodeMirror.fromTextArea(this.refs.editor, {
        lineNumbers: true,
        mode: "slim",
        lineWrapping: true
      });
      this.cm.on('change', this.changeSrc.bind(this));
      this.cm.setSize('100%', '100%');
      this.cm.setValue(this.props.memoData.src || '');

      $(window).resize((e)=> setTimeout(this.resize.bind(this), 2));
      this.resize();
    }, 1);
  }

  changeSrc(e) {
    this.state.renderer();
    this.setState(_.merge(this.state, {src: e.doc.getValue()}));
  }

  changeTitle(e) {
    this.setState(_.merge(this.state, {title: e.target.value}));
  }

  changeTags(e) {
    this.setState(_.merge(this.state, {tags: e.target.value}));
  }

  togglePublic(e) {
    this.setState(_.merge(this.state, {isPublic: !this.state.isPublic}));
  }

  resize() {
    let $content = $('#contentArea')
    let {top, left} = $content.position();
    let $html = $('#htmlDisplay');
    let bottom:number = $('#submitArea').position().top;
    let height:number = bottom - top;
    console.log($html.position().left, left)
    if ($('#srcArea').position().left === $('#htmlArea').position().left ) {
      height /= 2;
      this.cm.setSize(null, height);
      $html.css({height});
    } else {
      this.cm.setSize(null, height);
      $html.css({height});
    }
  }

  render() {
    let {title, src, tags, isPublic} = this.state;
    let {rendered} = this.props;
    return (
      <article className="memo-edit">
        <link href="/css/codemirror.css" rel="stylesheet" type="text/css"/>
        <Menu/>
        <section className="memo-edit edit-container">
          <section className="memo-edit title">
            <input type="text" placeholder="タイトル" value={title} onChange={this.changeTitle.bind(this)}/>
          </section>
          <section className="memo-edit tags">
            <input type="text" placeholder="タグ（スペース区切り）" value={tags} onChange={this.changeTags.bind(this)}/>
          </section>
          <section className="memo-edit content" id="contentArea">
            <section className="memo-edit src" id="srcArea">
              <textarea ref="editor"/>
            </section>
            <section className="memo-edit html" id="htmlArea">
              <div className="memo-edit html-container" id="htmlDisplay">
                <div dangerouslySetInnerHTML={{__html: rendered}}></div>
              </div>
            </section>
          </section>
          <section className="memo-edit submit-area" id="submitArea">
            <button className="memo-edit submit">
              <Fa icon="paw"/>
              保存する
            </button>
            <div className="memo-edit public">
              <label>
                <input type="checkbox" checked={isPublic} onChange={this.togglePublic.bind(this)}/>
                公開
              </label>
            </div>
          </section>
        </section>
      </article>
    );
  }
}
