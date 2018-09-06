import React from 'react';
import 'react-quill/dist/quill.snow.css';

export class QuillEditor extends React.Component {
  constructor(props: any) {
    super(props);

    this.state = { editorHtml: null };

    this.ReactQuill = null;
  }

  public componentDidMount() {
    this.setState({ editorHtml: '' });
    this.ReactQuill = require('react-quill');
  }

  public handleChange(html: any) {
    this.setState({ editorHtml: html });
  }

  public render() {
    const ReactQuill = this.ReactQuill;
    const modules = {
      toolbar: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
        ['link', 'code', 'image'],
        ['clean']
      ]
    };

    const formats = [
      'header',
      'bold',
      'italic',
      'underline',
      'strike',
      'blockquote',
      'list',
      'bullet',
      'indent',
      'link',
      'image'
    ];

    if (ReactQuill) {
      return (
        <div>
          <ReactQuill onChange={this.handleChange} value={this.state.value} modules={modules} formats={formats} />
        </div>
      );
    } else {
      return <textarea />;
    }
  }
}

export default QuillEditor;

{
  /* <ReactQuill onChange={this.handleChange} placeholder={this.props.placeholder} modules={Editor.modules}>
  <div
    key="editor"
    ref="editor"
    className="quill-contents"
    dangerouslySetInnerHTML={{ __html: this.state.editorHtml }}
  />
</ReactQuill>; */
}
