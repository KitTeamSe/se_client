import React from 'react';
import styled from 'styled-components';
import { ListItem, ListItemText } from '@mui/material';

const AttachListWrapper = styled.div`
  display: block;
  padding: 0 5px 0 10px;
  border: 1px solid #cccccc;
`;

const ListWrapper = styled.div`
  padding: 5px 0;

  & .MuiListItem-container {
    list-style: none;
  }
`;

const ListItemStyled = styled(ListItem)`
  padding: 0;
  color: #000;
`;

const ListItemTextStyled = styled(ListItemText)`
  display: flex;

  & span {
    font-size: 0.75rem;
    margin-right: 5px;
  }
  & p {
    font-size: 0.75rem;
  }
`;

const AttachDownloadList = props => {
  const { attachList } = props;
  return attachList.length ? (
    <AttachListWrapper>
      <ListWrapper>
        {attachList.map(
          e =>
            e.fileName && (
              <ListItemStyled component="a" href={e.downloadUrl}>
                <ListItemTextStyled
                  id={e.fileName}
                  primary={e.fileName}
                  secondary={`[${e.fileSize} byte]`}
                />
              </ListItemStyled>
            )
        )}
      </ListWrapper>
    </AttachListWrapper>
  ) : null;
};

export default AttachDownloadList;
