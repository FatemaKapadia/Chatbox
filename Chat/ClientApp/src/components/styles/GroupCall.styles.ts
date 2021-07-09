import { IStackItemStyles, IStackStyles, getTheme, mergeStyles } from '@fluentui/react';

const palette = getTheme().palette;
export const headerStyles: IStackItemStyles = {
  root: {
    width: '100%'
  }
};
export const containerStyles: IStackStyles = {
  root: {
    height: '100%',
    minHeight: '9.375rem',
    width: '100%'
  }
};
export const paneStyles: IStackItemStyles = {
  root: {
    width: '17.875rem'
  }
};
export const overlayStyles: IStackItemStyles = {
  root: {
    background: palette.white,
    marginTop: '4rem'
  }
};
export const hiddenContainerClassName: IStackItemStyles = {
  root: {
    border: `solid 1px ${palette.neutralLighterAlt}`,
    height: '100%',
    display: 'none'
  }
};
export const activeContainerClassName: IStackItemStyles = {
  root: {
    border: `solid 1px ${palette.neutralLighterAlt}`,
    height: 'calc(100% - 3px)',
    display: 'initial',
    width: '100%'
  }
};

export const loadingStyle: IStackItemStyles ={
  root: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  }  
};

export const chatPopupStyle: IStackItemStyles ={
  root: {
    display: 'none',
    position: 'fixed',
    bottom: '0',
    left: '15px',
    border: '3px solid #f1f1f1',
  }
};

export const messageBoxstyle: IStackItemStyles ={
  root: {
    
  }
}
// body {box-sizing: border-box;}
// /* The popup chat - hidden by default */
// .chat-popup {

// }
// .message-box {
// display: none;
// position: fixed;
// bottom: 0;
// left: 15px;
// border: 3px solid #FFFACD;
// z-index: 9;
// }
// .form-container {
// max-width: 300px;
// padding: 10px;
// background-color: white;
// }
// .form-container textarea {
// width: 90%;
// padding: 15px;
// margin: 5px 0 22px 0;
// border: none;
// background: #e1e1e1;
// resize: none;
// min-height: 50px;
// }
// .form-container .btn {
// background-color: #4CAF40;
// color: white;
// padding: 14px 18px;
// margin-bottom:10px;
// opacity: 0.6;
// border: none;
// cursor: pointer;
// width: 100%;
// }
// .container {
// border: 1px solid #dedede;
// background-color: #F1F1F1;
// border-radius: 3px;
// padding: 8px;
// margin: 8px 0;
// }
// .darker {
// border-color: #ccc;
// background-color: #ffdab9;
// margin-left: 25px;
// margin-right: 3px;
// }
// .lighter {
// margin-right: 20px;
// margin-left: 3px;
// }
// .container::after {
// content: "";
// clear: both;
// display: table;
// }
// </style>
