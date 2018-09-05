import React from 'react';
import AceEditor from 'react-ace';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


interface Props {
  //props
}

interface State {
  dropdownOpen: boolean;
  mode: string;
  theme: string;
}

export class CodeEditor extends React.Component<Props, State> {
  public constructor(props: Props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      mode: 'python',
      theme: 'github'
    };
  }

  public toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  public setMode(mode: any) {
    this.setState(() => ({
      mode
    }));
  }

  public setTheme(theme: any) {
    this.setState(() => ({
      theme
    }));
  }

  public render() {
    if (typeof window !== 'undefined') {
      /* tslint:disable */
      require('brace');
      // var AceEditor = require('react-ace');
      require('brace/mode/java');
      require('brace/mode/javascript');
      require('brace/mode/python');
      require('brace/theme/github');
      require('brace/theme/monokai');
      /* tslint:enable */

      const modes = ['java', 'javascript', 'python']
      const themes = ['github', 'monokai']

      return (
        <div>
          <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret>{this.state.mode}</DropdownToggle>
            <DropdownMenu>
              {modes.map(mode => (
                <DropdownItem key={mode} onClick={() => this.setMode(mode)}>
                  {mode}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <AceEditor
            mode={this.state.mode}
            theme={this.state.theme}
            onChange={() => {}}
            name="UNIQUE_ID_OF_DIV"
            enableBasicAutocompletion={true}
            enableLiveAutocompletion={true}
          />
        </div>
      );
    }
    return null;
  }
}

// editorProps={{ $blockScrolling: true }}

export default CodeEditor;
