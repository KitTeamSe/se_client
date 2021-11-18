import React from 'react';
import styled from 'styled-components';

// const IconWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   margin: 4px;
//   padding: 2px;
//   align-items: center;
//   @media ${({ theme }) => theme.sizeQuery.mobile} {
//     display: none;
//   }
// `;

const TransparentButton = styled.button`
  padding: 6px 12px;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.125rem;
  background: transparent;
  border: none;
  border-radius: 1rem;
  cursor: pointer;
  @media ${({ theme }) => theme.sizeQuery.mobile} {
    display: none;
  }
`;

const LogoutDialog = props => {
  const { onLogout, ProfileClick } = props;

  return (
    <>
      <TransparentButton onClick={ProfileClick}>프로필</TransparentButton>
      <TransparentButton onClick={onLogout}>로그아웃</TransparentButton>
    </>
  );
};

export default LogoutDialog;
