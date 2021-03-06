import { Stack, TextField } from '@fluentui/react';
import { SendIcon } from '@fluentui/react-northstar';
import React, { useState, Dispatch } from 'react';
import { Smile } from 'react-feather';
import { Picker } from 'emoji-mart/';
import 'emoji-mart/css/emoji-mart.css';

import { ENTER_KEY, EMPTY_MESSAGE_REGEX, MAXIMUM_LENGTH_OF_MESSAGE } from '../../src/constants';
import { sendBoxStyle, sendIconStyle, textFieldStyle, TextFieldStyleProps, emojiStyle } from './styles/SendBox.styles';
import { User } from '../core/reducers/ContosoClientReducers';

interface SendboxProps {
  onSendMessage(messageContent: string): void;
  onSendTypingNotification(
    lastSentTypingNotificationDate: number,
    setLastSentTypingNotificationDate: Dispatch<number>
  ): void;
  user: User;
}

export default (props: SendboxProps): JSX.Element => {
  const [textValue, setTextValue] = useState('');
  const [textValueOverflow, setTextValueOverflow] = useState(false);
  const [lastSentTypingNotificationDate, setLastSentTypingNotificationDate] = useState(0);
  const [showEmojiPicker, setEmojiPicker] = useState(false);

  const addEmoji = (emoji: any) => {
    const text = `${textValue}${emoji.native}`;
    setTextValue(text);
    setEmojiPicker(false);
  };
  const toggleEmojiPicker = () => {
    setEmojiPicker(!showEmojiPicker);
  };
  const addMessage = () => {
    // we dont want to send empty messages including spaces, newlines, tabs
    if (!EMPTY_MESSAGE_REGEX.test(textValue)) {
      props.onSendMessage(textValue);
      setTextValue('');
    }
  };
  const setText = (e: any) => {
    if (e.target.value.length > MAXIMUM_LENGTH_OF_MESSAGE) {
      setTextValueOverflow(true);
    } else {
      setTextValueOverflow(false);
    }
    setTextValue(e.target.value);
  };

  return (
    <div>
      {showEmojiPicker ? (
          <Picker set="apple" onSelect={addEmoji}  />
        ) : null}

      <Stack horizontal={true}>
        <button
          type="button"
          className={emojiStyle}
          onClick={toggleEmojiPicker}
        >
          <Smile />
        </button>   

        <TextField
          className={textFieldStyle}
          id="sendbox"
          borderless={true}
          ariaLabel={'Type'}
          inputClassName={sendBoxStyle}
          placeholder="Type your message"
          value={textValue}
          onChange={setText}
          autoComplete="off"
          onKeyUp={(ev) => {
            if (ev.which === ENTER_KEY && !textValueOverflow) {
              addMessage();
            }
            props.onSendTypingNotification(lastSentTypingNotificationDate, setLastSentTypingNotificationDate);
          }}
          styles={TextFieldStyleProps}
        />
        <SendIcon
          outline
          className={sendIconStyle}
          id="sendmessage"
          onClick={() => {
            if (!textValueOverflow) {
              addMessage();
            }
          }}
        />
      </Stack>
    </div>
  );
};
