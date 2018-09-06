import React from 'react';
import Helmet from 'react-helmet';
// import brace from 'brace';
// import AceEditor from 'react-ace';
// import * as ace from 'brace';
// import 'brace/mode/javascript';
// import 'brace/mode/java';
// import 'brace/theme/github';
// import 'brace/theme/monokai';
// import RichText from './RichText';
import QuillEditor from './QuillEditor';

import { PageLayout } from '../../common/components/web';
import settings from '../../../../../../settings';
import translate, { TranslateFunction } from '../../../i18n';
import { ClientCounter } from '../clientCounter';
import { ServerCounter } from '../serverCounter';
import { ReduxCounter } from '../reduxCounter';
import { CodeEditor } from './CodeEditor';

interface CounterProps {
  t: TranslateFunction;
}

// function onChange(newValue) {
//   console.log('change', newValue);
// }

// {window && typeof window !== 'undefined' ? (
//   <AceEditor mode="java" theme="github" onChange={() => {}} name="UNIQUE_ID_OF_DIV" />
// ) : null}

const Counter = ({ t }: CounterProps) => (
  <PageLayout>
    <Helmet
      title={`${settings.app.name} - ${t('title')}`}
      meta={[
        {
          name: 'description',
          content: `${settings.app.name} - ${t('meta')}`
        }
      ]}
    />
    {/* {window !== 'undefined' ? <CodeEditor /> : null} */}
    {/* <RichText /> */}
    <QuillEditor />
    <p>Yo</p>
    <ServerCounter />
    <ReduxCounter />
    <ClientCounter />
  </PageLayout>
);

export default translate('counter')(Counter);
