import React from 'react';
import ReactDOM from 'react-dom';
import { Editor, EditorState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';

class RichText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editor: null,
      editorState: EditorState.createEmpty()
    };

    this.onChange = editorState => this.setState({ editorState });
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
  }

  public componentDidMount() {
    this.setState({ editor: Editor });
  }

  public _onBoldClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }

  public _onCodeClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'CODE'));
  }

  public _onCodeClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'CODE'));
  }

  public handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  // const contentState = editorState.getCurrentContent();

  public render() {
    const ClientEditor = this.state.editor;

    return (
      <div>
        <button onClick={this._onBoldClick.bind(this)}>Bold</button>{' '}
        <button onClick={this._onCodeClick.bind(this)}>Code</button>
        {this.state.editor ? (
          <ClientEditor
            editorState={this.state.editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
          />
        ) : null}
      </div>
    );
  }
}

export default RichText;
