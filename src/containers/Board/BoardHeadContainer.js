import React, { useEffect, useState } from 'react';
import qs from 'qs';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import BoardHead from '../../components/Board/BoardHead';

const BoardHeadContainer = props => {
  const { match, history } = props;

  const [keyword, setKeyword] = useState('');
  const [boardDescription, setBoardDescription] = useState('');
  const [postSearchType, setPostSearchType] = useState('TITLE_TEXT');
  const { menuList } = useSelector(({ menu }) => ({
    menuList: menu.loadedMenuList.data
  }));

  const { boardNameEng } = match.params;

  useEffect(() => {
    if (menuList) {
      const myMenu = menuList.data.find(menu => menu.nameEng === boardNameEng);
      if (myMenu) {
        setBoardDescription(myMenu.description);
      }
    }
  }, [menuList]);

  const onSearchChange = e => {
    const { value } = e.target;
    setKeyword(value);
  };

  const onPostSearchTypeChange = e => {
    e.preventDefault();
    const { value } = e.target;
    setPostSearchType(value);
  };

  const onSearch = e => {
    e.preventDefault();
    if (keyword.length === 0) {
      console.log('한글자 이상 입력하세요');
      return;
    }
    if (keyword.length > 50) {
      console.log('최대 50자 까지만 입력 가능합니다');
      return;
    }

    const search = {
      page: 1,
      postSearchType,
      keyword
    };

    history.push({
      pathname: `/board/${boardNameEng}`,
      search: qs.stringify(search)
    });
  };

  const onWritePost = () => {
    history.push(`/board/${match.params.boardNameEng}/write`);
  };

  return (
    <BoardHead
      boardDescription={boardDescription}
      boardNameEng={boardNameEng}
      postSearchType={postSearchType}
      keyword={keyword}
      onSearch={onSearch}
      onSearchChange={onSearchChange}
      onWritePost={onWritePost}
      onPostSearchTypeChange={onPostSearchTypeChange}
    />
  );
};

export default withRouter(BoardHeadContainer);
