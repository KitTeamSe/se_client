import React from 'react';
import styled from 'styled-components';
import { tagList } from '../../DataExport';

const Tag = styled.span`
  display: inline-block;
`;

const TagIcon = styled.span`
  padding: 0px 4px;
  margin: 2px;
  font-size: 0.7em;
  vertical-align: middle;
  border-radius: 1rem;
  background-image: linear-gradient(
    to right,
    #${props => props.color1} 0%,
    #${props => props.color2} 100%
  );
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
          <TagIcon
            color1={tagList[tag.tagId].color1}
            color2={tagList[tag.tagId].color2}
            key={tag.tagId}
          >
            {tag.tag}
          </TagIcon>
        ) : (
          <TagIcon color1="ffffff" color2="ffffff" key={tag.tagId}>
            {tag.tag}
          </TagIcon>
        )
      )}
    </Tag>
  );
};

export default Tags;
