import * as React from 'react'
import Menu from "../components/menu";
import Memo from "../models/memo";
import Fa from '../lib/components/fa'
import * as _ from 'lodash'
import {MemoMix} from "../mixins";

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

  constructor(props) {
    super(props);

    if (this.props.memoData) {
      let {title, src, isPublic} = this.props.memoData;

      this.state = {
        title: title,
        src: src,
        isPublic: isPublic,
        renderer: _.debounce(()=>{
          MemoMix.renderSlim(this.state.src);
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
    console.log(this.state)
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
          <section className="memo-edit content">
            <section className="memo-edit src">
              <textarea ref="editor"/>
            </section>
            <section className="memo-edit html">
              <div className="memo-edit html-container" dangerouslySetInnerHTML={{__html: rendered}}>
              </div>
            </section>
          </section>
          <section className="memo-edit submit-area">
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
