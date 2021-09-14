import React from 'react';
import styled from 'styled-components';
import { Chip, TextField } from '@material-ui/core';
import { faRedo, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Autocomplete } from '@material-ui/lab';

const TagWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  liststyle: none;
  margin-bottom: 5px;
`;

const TagActionWrapper = styled.div`
  display: flex;
  margin-bottom: 5px;
`;
const TagInputWrapper = styled.div`
  display: flex;
  width: 100%;
  @media ${props => props.theme.mobile} {
    flex-direction: column;
  }
`;

const TagListWrapper = styled.div`
  display: flex;
  margin-bottom: 5px;
  flex-wrap: wrap;
  @media ${props => props.theme.mobile} {
    flex-direction: column;
  }
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: 0.875rem;
  margin-left: 6px;
  margin-right: -9px;
`;

const ChipStyled = styled(Chip)`
  font-size: 0.75rem;
  height: 28px;
  margin-right: 3px;
  & span {
    width: 100%;
    text-align: center;
  }
  @media ${props => props.theme.mobile} {
    margin-right: 0px;
  }
`;

const AutocompleteStyled = styled(Autocomplete)`
  width: 100%;
  margin-bottom: 5px;
`;

const PostTagInput = props => {
  const {
    data = [
      {
        tagId: 1,
        text: '1학년'
      },
      {
        tagId: 2,
        text: '2학년'
      },
      {
        tagId: 3,
        text: '3학년'
      },
      {
        tagId: 4,
        text: '4학년'
      }
    ],
    value = '',
    onChange = () => console.log('ch')
  } = props;

  return (
    <TagInputWrapper>
      <AutocompleteStyled
        id="free-solo-demo"
        value={value}
        onChange={onChange}
        freeSolo
        options={data.map(option => option.text)}
        renderInput={params => <TextField {...params} />}
      />
      <TagActionWrapper>
        <ChipStyled icon={<Icon icon={faPlus} />} label="태그 추가" />
      </TagActionWrapper>
    </TagInputWrapper>
  );
};

const PostTagList = props => {
  const {
    data = [
      {
        tagId: 1,
        text: '1학년'
      },
      {
        tagId: 2,
        text: '2학년'
      },
      {
        tagId: 3,
        text: '3학년'
      },
      {
        tagId: 4,
        text: '4학년'
      }
    ],
    handleRemoveTag = () => console.log('removetag')
  } = props;
  return (
    <TagListWrapper>
      <ChipStyled
        color="secondary"
        icon={<Icon icon={faRedo} />}
        label="초기화"
        disabled={!data.length}
      />
      {data.map(e => (
        <ChipStyled
          variant="outlined"
          label={e.text}
          onDelete={handleRemoveTag}
        />
      ))}
      <ChipStyled
        variant="outlined"
        label="스무자를채워야하는데어떻게스무자까지채워"
        onDelete={handleRemoveTag}
      />
    </TagListWrapper>
  );
};

const PostTagAdd = props => {
  const {
    data = [
      {
        tagId: 1,
        text: '1학년'
      },
      {
        tagId: 2,
        text: '2학년'
      },
      {
        tagId: 3,
        text: '3학년'
      },
      {
        tagId: 4,
        text: '4학년'
      }
    ],
    value = '',
    onChange = () => console.log('ch'),
    handleRemoveTag = () => console.log('removetag')
  } = props;

  return (
    <TagWrapper>
      <PostTagInput value={value} onChange={onChange} />
      <PostTagList data={data} handleRemoveTag={handleRemoveTag} />
    </TagWrapper>
  );
};

export default PostTagAdd;
