import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const InfoIcon = styled(FontAwesomeIcon)`
  margin: 1px;
  color: gray;
`;

const PostMaker = props => {
  const { makePost } = props;

  return (
    <InfoIcon size="2x" icon={faLock} onClick={makePost}>
      asdf
    </InfoIcon>
  );
};

export default PostMaker;
