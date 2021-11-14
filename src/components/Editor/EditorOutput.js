import React from 'react';
import styled from 'styled-components';

const Content = styled.div`
  padding: 1rem;
  font-size: 0.875rem;
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
