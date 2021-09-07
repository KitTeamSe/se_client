import React from 'react';
import styled from 'styled-components';

const ButtonStyled = styled.button`
  padding: 0;
  margin-left: 10px;
  color: #999999;
  background: none;
  font-size: 0.8125rem;
  border: none;
  border-radius: 0;
  text-transform: uppercase;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    color: #666666;
  }
`;

const ReplyActionButton = props => {
  const { children, onClick } = props;

  return <ButtonStyled onClick={onClick}>{children}</ButtonStyled>;
};

export default ReplyActionButton;
