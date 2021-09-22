import React,{useState} from 'react';
import ReactDOM from 'react-dom';
import '../zh_tw';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
const PageEditor = () => {
	// const [editorState, setEditorState] = useState(EditorState.createEmpty());
	return (
	  <Editor
    wrapperClassName="demo-wrapper"
    editorClassName="demo-editor"
    localization={{
    //   locale: 'zh-TW',
    }}
  />
  );
}

export default PageEditor;