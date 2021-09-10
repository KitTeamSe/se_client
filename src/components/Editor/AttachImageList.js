import React from 'react';
import styled from 'styled-components';

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

const ImageList = styled.li`
  position: relative;
  display: inline-block;
  margin: 5px;
  width: 80px;
  height: 80px;
  border: 2px solid #ddd;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
`;

const AttachImageList = props => {
  const { attachImgList } = props;
  return (
    <AttachListWrapper>
      <ListWrapper>
        <ol>
          {attachImgList.length
            ? attachImgList.map(
                e =>
                  e.fileName && (
                    <span>
                      <ImageList>
                        <Image src={e.downloadUrl} alt={e.fileName} />
                      </ImageList>
                    </span>
                  )
              )
            : null}
        </ol>
      </ListWrapper>
    </AttachListWrapper>
  );
};

export default AttachImageList;
