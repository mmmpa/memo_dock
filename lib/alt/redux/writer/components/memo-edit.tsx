import * as React from 'react'
import Menu from "../components/menu";
import Memo from "../models/memo";
import Fa from '../lib/components/fa'
import * as _ from 'lodash'
import {MemoMix} from "../mixins";
import {EditMemoState} from '../constants/status'
require("zepto/zepto.min");
let $ = window.$;

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
  editState:EditMemoState
  rendered?:string
}

interface IMemoEditState {
  memoData?:Memo,
  renderer?:Function
}

export default class MemoEdit extends React.Component<IMemoEdit, IMemoEditState> {
  private cm:any;

  constructor(props) {
    super(props);

    let {memoData} = this.props;

    this.state = {
      memoData: memoData,
      renderer: _.debounce(()=> {
        MemoMix.renderSlim(this.state.memoData.src);
        this.resize();
      }, 1000)
    }
  }


  componentDidUpdate() {
    let {memoData} = this.state;
    if (this.props.memoData.id !== memoData.id) {
      this.state.memoData.id = memoData.id;
      this.setState({memoData: this.props.memoData});
    }
    if (this.cm.getValue() != memoData.src) {
      this.cm.setValue(memoData.src || '');
    }
  }

  componentDidMount() {
    setTimeout(()=> {
      this.cm = CodeMirror.fromTextArea($('#editor')[0], {
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
    let {memoData} = this.state;
    memoData.src = e.doc.getValue();
    this.setState(_.merge(this.state, {memoData}));
  }

  changeTitle(e) {
    let {memoData} = this.state;
    memoData.title = e.target.value;
    this.setState(_.merge(this.state, {memoData}));
  }

  changeTags(e) {
    let {memoData} = this.state;
    memoData.tagList = e.target.value;
    this.setState(_.merge(this.state, {memoData}));
  }

  detectSaveButton() {
    if (this.props.editState === EditMemoState.Ready) {
      return <button className="memo-edit submit" onClick={this.save.bind(this)}>
        <Fa icon="paw"/>
        Save
      </button>
    } else if (this.props.editState === EditMemoState.Loading) {
      return <button className="memo-edit submit" onClick={this.save.bind(this)}>
        <Fa icon="paw"/>
        Wait...
      </button>
    } else {
      return <button className="memo-edit submit" disabled={true}>
        <Fa icon="spinner" animation="pulse"/>
        Saving...
      </button>
    }
  }

  togglePublic(e) {
    let {memoData} = this.state;
    memoData.isPublic = !memoData.isPublic;
    this.setState(_.merge(this.state, {memoData}));
  }

  resize() {
    let $content = $('#contentArea')
    let {top, left} = $content.position();
    let $html = $('#htmlDisplay');
    let bottom:number = $('#submitArea').position().top;
    let height:number = bottom - top;

    if ($('#srcArea').position().left === $('#htmlArea').position().left) {
      height /= 2;
      this.cm.setSize(null, height);
      $html.css({height});
    } else {
      this.cm.setSize(null, height);
      $html.css({height});
    }
  }

  save() {
    MemoMix.saveMemo(this.state.memoData);
  }

  render() {
    if (!this.state.memoData) {
      return <div>loading...</div>
    }
    let {title, src, tagList, isPublic} = this.state.memoData;
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
            <input type="text" placeholder="タグ（スペース区切り）" value={tagList} onChange={this.changeTags.bind(this)}/>
          </section>
          <section className="memo-edit content" id="contentArea">
            <section className="memo-edit src" id="srcArea">
              <textarea id="editor"/>
            </section>
            <section className="memo-edit html" id="htmlArea">
              <div className="memo-edit html-container" id="htmlDisplay">
                <div dangerouslySetInnerHTML={{__html: rendered}}></div>
              </div>
            </section>
          </section>
          <section className="memo-edit submit-area" id="submitArea">
            {this.detectSaveButton()}
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
