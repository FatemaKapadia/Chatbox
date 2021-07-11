import { loadTheme, initializeIcons } from '@fluentui/react';
import React, { useState, useCallback, useEffect} from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { CallEndReason } from '@azure/communication-calling';

import ChatScreen from './containers/ChatScreen';
import ConfigurationScreen from './containers/ConfigurationScreen';
import CallConfigurationScreen from './containers/CallConfigurationScreen';
import EndScreen from './components/EndScreen';
import RemovedFromThreadScreen from './components/RemovedFromThreadScreen';
import HomeScreen from './containers/HomeScreen';
import { reducer } from './core/reducers/index';
import { getBuildTime, getChatSDKVersion, getThreadId } from './utils/utils';

import GroupCall from './containers/GroupCall';
import EndCall from './components/EndCall';

console.info(`Azure Communication Services chat sample using @azure/communication-chat : ${getChatSDKVersion()}`);
console.info(`Build Date : ${getBuildTime()}`);

loadTheme({});
initializeIcons();

const store = createStore(reducer, applyMiddleware(thunk));
const groupId = "c07ff9d0-e09a-11eb-a078-25f7f03a6567";


export default (): JSX.Element => {
  const [page, setPage] = useState('home');
  const [callEndReason, setCallEndReason] = useState<CallEndReason | undefined>();
  const [screenWidth, setScreenWidth] = useState(0);
  const [localVideoStream, setLocalVideoStream] = useState(undefined);

  const unsupportedStateHandler = useCallback((): void => setPage('unsupported'), []);  

  useEffect(() => {
    const setWindowWidth = (): void => {
      const width = typeof window !== 'undefined' ? window.innerWidth : 0;
      setScreenWidth(width);
    };

    setWindowWidth();
    window.addEventListener('resize', setWindowWidth);
    return (): void => {
      window.removeEventListener('resize', setWindowWidth);
    } 
  }, []);

  const getGroupIdFromUrl = (): string | null => {
    const urlParams = new URLSearchParams(window.location.search);
    console.log("I am here" + urlParams.get('groupId'));
    return urlParams.get('groupId');
  };

  const getGroupId = (): string => {
    return groupId;
  };

  const getComponent = () => {
    if (page === 'home') {
      return <HomeScreen />;
    } else if (page === 'configuration') {
      return <ConfigurationScreen joinChatHandler={() => setPage('chat') } />;
    } else if (page === 'chat') {     
      return (
        <ChatScreen
          removedFromThreadHandler={() => setPage('removedFromThread')}
          leaveChatHandler={() => setPage('end')}
          startCallHandler={(): void => {
            if(!getGroupIdFromUrl()) {
              window.history.pushState({}, document.title, window.location.href + '&groupId=' + getGroupId());
            }
            setPage('callConfiguration');
          }}
        />
      );
    } else if (page === 'callConfiguration') {
      return (
        <CallConfigurationScreen
          startCallHandler={(): void => setPage('call')}
          unsupportedStateHandler={unsupportedStateHandler}
          callEndedHandler={(errorMsg: CallEndReason): void => {
            setCallEndReason(errorMsg);
            setPage('error');
          }}
          groupId={getGroupId()}
          screenWidth={screenWidth}
          localVideoStream={localVideoStream}
          setLocalVideoStream={setLocalVideoStream}
        />
      );
    } else if (page === 'call') {
      return (
        <GroupCall
          endCallHandler={(): void => setPage('endCall')}
          groupId={getGroupId()}
          screenWidth={screenWidth}
          localVideoStream={localVideoStream}
          setLocalVideoStream={setLocalVideoStream}
        />
      );
    } else if (page === 'endCall') {
      return (
        <EndCall
          message={'You left the call'}
          rejoinHandler={(): void => {
            setPage('callConfiguration');
          }}
          homeHandler={(): void => {
            setPage('chat');
          }}
        />
      );
    } 
    else if (page === 'end') {
      return (
        <EndScreen
          rejoinHandler={() => {
            setPage('chat');
          }}
          homeHandler={() => (window.location.href = window.location.origin)}
        />
      );
    } else if (page === 'removedFromThread') {
      return <RemovedFromThreadScreen homeHandler={() => (window.location.href = window.location.origin)} />;
    }
  };

  if (getThreadId() && page === 'home') {
    setPage('configuration');
  }

  // if (getGroupIdFromUrl() && page === 'chat') {
  //   setPage('callConfiguration');
  // }

  return <Provider store={store}>{getComponent()}</Provider>;
};
