import React from 'react';
import { Button } from 'antd';
import { Editor, EditorState, RichUtils, Entity, CompositeDecorator } from 'draft-js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fal } from '@fortawesome/pro-light-svg-icons';
import { library, dom } from '@fortawesome/fontawesome-svg-core';

library.add(fal);
dom.watch();

import 'draft-js/dist/Draft.css';
import './DraftEditor.less';

const styles = {
  root: {
    fontFamily: "'Georgia', serif",
    padding: 20,
    width: 600
  },
  buttons: {
    marginBottom: 10
  },
  urlInputContainer: {
    marginBottom: 10
  },
  urlInput: {
    fontFamily: "'Georgia', serif",
    marginRight: 10,
    padding: 3
  },
  editor: {
    border: '1px solid #ccc',
    cursor: 'text',
    minHeight: 80,
    padding: 10
  },
  button: {
    marginTop: 10,
    textAlign: 'center'
  },
  link: {
    color: '#3b5998',
    textDecoration: 'underline'
  }
};

function findLinkEntities(contentBlock, callback) {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity();
    return entityKey !== null && Entity.get(entityKey).getType() === 'LINK';
  }, callback);
}

const Link = (props: any) => {
  const { url } = Entity.get(props.entityKey).getData();
  return (
    <a href={url} style={styles.link}>
      {props.children}
    </a>
  );
};

export class DraftEditor extends React.Component {
  constructor(props) {
    super(props);

    const decorator = new CompositeDecorator([
      {
        strategy: findLinkEntities,
        component: Link
      }
    ]);

    this.state = {
      editorState: EditorState.createEmpty(decorator),
      showURLInput: false,
      urlValue: '',
      editor: null
    };

    // this.focus = () => this.editor.focus();
    this.focus = () => this.refs.editor.focus();
    this.onChange = editorState => this.setState({ editorState });

    this.handleKeyCommand = command => this._handleKeyCommand(command);
    this.onTab = e => this._onTab(e);
    this.toggleBlockType = type => this._toggleBlockType(type);
    this.toggleInlineStyle = style => this._toggleInlineStyle(style);
    this.toggleLinkStyle = style => this._toggleLinkStyle(style);

    this.promptForLink = this._promptForLink.bind(this);
    this.onURLChange = e => this.setState({ urlValue: e.target.value });
    this.confirmLink = this._confirmLink.bind(this);
    this.onLinkInputKeyDown = this._onLinkInputKeyDown.bind(this);
    this.removeLink = this._removeLink.bind(this);
  }

  public componentDidMount() {
    this.setState({ editor: Editor });
  }

  public _promptForLink(e) {
    // e.preventDefault();
    const { editorState } = this.state;
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      const contentState = editorState.getCurrentContent();
      const startKey = editorState.getSelection().getStartKey();
      const startOffset = editorState.getSelection().getStartOffset();
      const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
      const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);
      let url = '';
      if (linkKey) {
        const linkInstance = contentState.getEntity(linkKey);
        url = linkInstance.getData().url;
      }
      this.setState(
        {
          showURLInput: true,
          urlValue: url
        },
        () => {
          setTimeout(() => this.refs.url.focus(), 0);
        }
      );
    }
  }

  public _confirmLink(e) {
    e.preventDefault();
    const { editorState, urlValue } = this.state;
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity('LINK', 'MUTABLE', { url: urlValue });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity
    });
    this.setState(
      {
        editorState: RichUtils.toggleLink(newEditorState, newEditorState.getSelection(), entityKey),
        showURLInput: false,
        urlValue: ''
      },
      () => {
        setTimeout(() => this.refs.editor.focus(), 0);
      }
    );
  }

  public _onLinkInputKeyDown(e) {
    if (e.which === 13) {
      this._confirmLink(e);
    }
  }

  public _removeLink(e: any) {
    e.preventDefault();
    const { editorState } = this.state;
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      this.setState({
        editorState: RichUtils.toggleLink(editorState, selection, null)
      });
    }
  }

  public _handleKeyCommand(command: any) {
    const { editorState } = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  public _onTab(e: any) {
    const maxDepth = 4;
    this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
  }

  public _toggleBlockType(blockType: any) {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  }

  public _toggleInlineStyle(inlineStyle: any) {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle));
  }

  public render() {
    const { editorState } = this.state;
    const ClientEditor = this.state.editor;

    let urlInput;
    if (this.state.showURLInput) {
      urlInput = (
        <div style={styles.urlInputContainer}>
          <input
            onChange={this.onURLChange}
            ref="url"
            style={styles.urlInput}
            type="text"
            value={this.state.urlValue}
            onKeyDown={this.onLinkInputKeyDown}
          />
          <button onMouseDown={this.confirmLink}>Confirm</button>
        </div>
      );
    }

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
      <div className="RichEditor-root" style={styles.root}>
        <BlockStyleControls editorState={editorState} onToggle={this.toggleBlockType} />
        <InlineStyleControls editorState={editorState} onToggle={this.toggleInlineStyle} />
        <LinkStyleControls editorState={editorState} onToggle={this.promptForLink} />
        {/* <div style={styles.buttons}>
          <button onMouseDown={this.promptForLink} style={{ marginRight: 10 }}>
            Add Link
          </button>
          <button onMouseDown={this.removeLink}>Remove Link</button>
        </div> */}
        {urlInput}
        {/* <div className={className} onClick={this.focus} style={styles.editor}> */}
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
              //   ref={ref => (this.editor = ref)}
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
      <span className={className} onMouseDown={this.onToggle}>
        <FontAwesomeIcon icon={['fal', this.props.icon]} />
      </span>
    );
  }
}

const LINKS = [{ label: 'LINK', style: 'link', icon: 'link' }];

const LinkStyleControls = props => {
  return (
    <div className="RichEditor-controls">
      {LINKS.map(type => (
        <StyleButton
          key={type.label}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
          icon={type.icon}
        />
      ))}
    </div>
  );
};

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
