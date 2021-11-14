import React from 'react';
import styled from 'styled-components';
import { tagList } from '../../DataExport';

const Tag = styled.span`
  display: inline-block;
`;

const TagIcon = styled.span`
  margin-left: 0.125rem;
  font-size: 0.625em;
  padding: 0 0.5em;
  border-radius: 1rem;
  color: #4f4f4f;
  background: #e0e0e0;
}
`;

const Tags = props => {
  const { tags } = props;
  if (tags.length === 0) {
    return <></>;
  }
  return (
    <Tag>
      {tags.map(tag =>
        tagList[tag.tagId] ? (
          <TagIcon key={tag.tagId}>{tag.tag}</TagIcon>
        ) : (
          <TagIcon bkey={tag.tagId}>{tag.tag}</TagIcon>
        )
      )}
    </Tag>
  );
};

export default Tags;
