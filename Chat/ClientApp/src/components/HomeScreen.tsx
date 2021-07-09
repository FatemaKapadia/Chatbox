import { Image, PrimaryButton, Stack, IImageStyles, Spinner } from '@fluentui/react';
import { ChatIcon } from '@fluentui/react-icons-northstar';
import React, { useState } from 'react';

import heroSVG from '../assets/hero.svg';
import {
  buttonStyle,
  containerTokens,
  headerStyle,
  imgStyle,
  upperStackStyle,
  upperStackTokens,
  videoCameraIconStyle,
  startChatTextStyle
} from './styles/HomeScreen.styles';

export interface HomeScreenProps {
  createThreadHandler(): void;
}

const imageStyleProps: IImageStyles = {
  image: {
    height: '100%'
  },
  root: {}
};

export default (props: HomeScreenProps): JSX.Element => {
  const spinnerLabel = 'Creating a new chat thread...';
  const imageProps = { src: heroSVG.toString() };
  const headerTitle = 'Exceptionally simple chat app';
  const startChatButtonText = 'Start chat';

  const [isCreatingThread, setIsCreatingThread] = useState(false);

  const onCreateThread = () => {
    props.createThreadHandler();
    setIsCreatingThread(true);
  };

  const creatThreadLoading = () => {
    return <Spinner label={spinnerLabel} ariaLive="assertive" labelPosition="top" />;
  };

  const homeScreen = () => {
    return (
      <div>
        <Stack horizontal horizontalAlign="center" verticalAlign="center" tokens={containerTokens}>
          <Stack className={upperStackStyle} tokens={upperStackTokens}>
            <div tabIndex={0} className={headerStyle}>
              {headerTitle}
            </div>
            <PrimaryButton
              id="startChat"
              role="main"
              aria-label="Start chat"
              className={buttonStyle}
              onClick={() => {
                onCreateThread();
              }}
            >
              <ChatIcon className={videoCameraIconStyle} size="medium" />
              <div className={startChatTextStyle}>{startChatButtonText}</div>
            </PrimaryButton>
          </Stack>
          <Image
            styles={imageStyleProps}
            alt="Welcome to the Azure Communication Services Chat sample app"
            className={imgStyle}
            {...imageProps}
          />
        </Stack>
      </div>
    );
  };

  return isCreatingThread ? creatThreadLoading() : homeScreen();
};
