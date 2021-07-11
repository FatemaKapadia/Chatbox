import { DefaultButton, Stack } from '@fluentui/react';
import React from 'react';

import {
  buttonsStackTokens,
  buttonStyle,
  endCallContainerStyle,
  endCallTitleStyle,
  mainStackTokens,
  upperStackTokens
} from './styles/EndChat.styles';

export interface RemovedFromThreadProps {
  homeHandler(): void;
}

export default (props: RemovedFromThreadProps): JSX.Element => {
  const leftCall = 'You are no longer a participant for the chat thread.';
  const goHomePage = 'Go to homepage';

  return (
    <Stack verticalAlign="center" tokens={mainStackTokens} className={endCallContainerStyle}>
      <Stack tokens={upperStackTokens}>
        <div tabIndex={0} className={endCallTitleStyle}>
          {leftCall}
        </div>
        <Stack horizontal tokens={buttonsStackTokens}>
          <DefaultButton className={buttonStyle} onClick={props.homeHandler}>
            {goHomePage}
          </DefaultButton>
        </Stack>
      </Stack>
    </Stack>
  );
};
