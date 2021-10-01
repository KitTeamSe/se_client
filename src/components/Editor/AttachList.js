import React from 'react';
import styled from 'styled-components';
import { ListItem, ListItemSecondaryAction, ListItemText } from '@mui/material';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const AttachListWrapper = styled.div`
  display: block;
  padding: 0 5px 0 10px;
  border-left: 1px solid #e6e6e6;
  border-bottom: 1px solid #e6e6e6;
`;

const ListWrapper = styled.div`
  max-height: 160px;
  overflow-y: scroll;
  margin: 0 -5px;
  padding: 5px 0;
  & .MuiListItem-container {
    list-style: none;
  }
`;

const ListItemStyled = styled(ListItem)`
  padding: 0;
`;

const ListItemTextStyled = styled(ListItemText)`
  display: flex;

  & span {
    font-size: 0.875rem;
    margin-right: 5px;
  }
`;

const AttachRemoveIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
`;

const AttachList = props => {
  const { attachList, onDeleteAttach } = props;
  return attachList.length ? (
    <AttachListWrapper>
      <ListWrapper>
        {attachList.map(
          e =>
            e.fileName && (
              <ListItemStyled>
                <ListItemTextStyled
                  id={e.fileName}
                  primary={e.fileName}
                  secondary={`[${e.fileSize} byte]`}
                />
                <ListItemSecondaryAction>
                  <AttachRemoveIcon
                    icon={faTimes}
                    onClick={() => onDeleteAttach(e.attachId)}
                  />
                </ListItemSecondaryAction>
              </ListItemStyled>
            )
        )}
      </ListWrapper>
    </AttachListWrapper>
  ) : null;
};

export default AttachList;
