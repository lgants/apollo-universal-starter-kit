import React from 'react';
import { Button } from 'antd';
import { Editor, EditorState, RichUtils } from 'draft-js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fal } from '@fortawesome/pro-light-svg-icons';
import { library, dom } from '@fortawesome/fontawesome-svg-core';

library.add(fal);
dom.watch();

import 'draft-js/dist/Draft.css';
import './DraftEditor.less';

export class DraftEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty(), editor: null };

    this.focus = () => this.refs.editor.focus();
    this.onChange = editorState => this.setState({ editorState });

    this.handleKeyCommand = command => this._handleKeyCommand(command);
    this.onTab = e => this._onTab(e);
    this.toggleBlockType = type => this._toggleBlockType(type);
    this.toggleInlineStyle = style => this._toggleInlineStyle(style);
  }

  public componentDidMount() {
    this.setState({ editor: Editor });
  }

  public _handleKeyCommand(command) {
    const { editorState } = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  public _onTab(e) {
    const maxDepth = 4;
    this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
  }

  public _toggleBlockType(blockType) {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  }

  public _toggleInlineStyle(inlineStyle) {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle));
  }

  public render() {
    const { editorState } = this.state;
    const ClientEditor = this.state.editor;

    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = 'RichEditor-editor';
    const contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (
        contentState
          .getBlockMap()
          .first()
          .getType() !== 'unstyled'
      ) {
        className += ' RichEditor-hidePlaceholder';
      }
    }

    return (
      <div className="RichEditor-root">
        <BlockStyleControls editorState={editorState} onToggle={this.toggleBlockType} />
        <InlineStyleControls editorState={editorState} onToggle={this.toggleInlineStyle} />
        <div className={className} onClick={this.focus}>
          {this.state.editor ? (
            <ClientEditor
              blockStyleFn={getBlockStyle}
              customStyleMap={styleMap}
              editorState={editorState}
              handleKeyCommand={this.handleKeyCommand}
              onChange={this.onChange}
              onTab={this.onTab}
              placeholder="Tell a story..."
              ref="editor"
              spellCheck={true}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default DraftEditor;

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2
  }
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote':
      return 'RichEditor-blockquote';
    default:
      return null;
  }
}

class StyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = e => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  public render() {
    let className = 'RichEditor-styleButton';
    if (this.props.active) {
      className += ' RichEditor-activeButton';
    }

    return (
      <Button>
        <FontAwesomeIcon icon={['fal', this.props.icon]} />
      </Button>
    );
  }
}
{
  /* <Button type="primary" shape="circle" icon="search" />
<span className={className} onMouseDown={this.onToggle}>
        {this.props.label}
      </span> */
}

const BLOCK_TYPES = [
  { label: 'H1', style: 'header-one', icon: 'code' },
  { label: 'H2', style: 'header-two', icon: 'code' },
  { label: 'H3', style: 'header-three', icon: 'code' },
  { label: 'H4', style: 'header-four', icon: 'code' },
  { label: 'H5', style: 'header-five', icon: 'code' },
  { label: 'H6', style: 'header-six', icon: 'code' },
  { label: 'Blockquote', style: 'blockquote', icon: 'quote-right' },
  { label: 'UL', style: 'unordered-list-item', icon: 'list-ul' },
  { label: 'OL', style: 'ordered-list-item', icon: 'list-ol' },
  { label: 'Code Block', style: 'code-block', icon: 'code' }
];

const BlockStyleControls = props => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map(type => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
          icon={type.icon}
        />
      ))}
    </div>
  );
};

const INLINE_STYLES = [
  { label: 'Bold', style: 'BOLD', icon: 'bold' },
  { label: 'Italic', style: 'ITALIC', icon: 'italic' },
  { label: 'Underline', style: 'UNDERLINE', icon: 'underline' },
  { label: 'Monospace', style: 'CODE', icon: 'code' }
];

const InlineStyleControls = props => {
  const currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map(type => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
          icon={type.icon}
        />
      ))}
    </div>
  );
};
