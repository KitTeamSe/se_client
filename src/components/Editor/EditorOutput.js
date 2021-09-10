import React from 'react';
import styled from 'styled-components';

const Content = styled.div`
  font-size: 0.875rem;
  width: 100%;
  word-break: break-all;
  @media ${props => props.theme.mobile} {
    font-size: 1rem;
  }
`;

const EditorOutput = props => {
  const { content } = props;

  return <Content className="ck-content" dangerouslySetInnerHTML={content} />;
};

export default EditorOutput;
