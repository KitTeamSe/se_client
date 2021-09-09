import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReplyAdd from '../../components/Reply/ReplyAdd';

import { changeField, addReply } from '../../modules/reply';
import { addAttachList, removeAttach } from '../../modules/attach';
import confirmFileExtension from '../../utils/confirmFileExtension';
import { getDecodeHTML } from '../../utils/format';

const ReplyAddContainer = props => {
  const { match } = props;
  const dispatch = useDispatch();
  const { addForm, addAttachData, loading, error } = useSelector(
    ({ reply, attach }) => ({
      addForm: reply.addForm,
      addAttachData: attach.addAttach.data,
      loading: attach.addAttach.loading,
      error: attach.addAttach.error
    })
  );
  const [attachImgList, setAttachImgList] = useState([]);

  const handleChange = e => {
    const { id, value } = e.target;

    dispatch(
      changeField({
        form: 'addForm',
        key: id,
        value
      })
    );
  };

  const handleSecret = e => {
    const { id, checked } = e.target;
    const value = checked ? 'SECRET' : 'NORMAL';

    dispatch(
      changeField({
        form: 'addForm',
        key: id,
        value
      })
    );
  };

  const handleContentText = (e, editor) => {
    const value = editor.getData();

    dispatch(
      changeField({
        form: 'addForm',
        key: 'text',
        value
      })
    );
  };

  const handleAttachFiles = files => {
    dispatch(addAttachList({ files }));
  };

  const onSubmit = e => {
    e.preventDefault();
    const {
      anonymousNickname,
      anonymousPassword,
      isSecret,
      text,
      attachmentList
    } = addForm;
    const anonymous = { anonymousNickname, anonymousPassword };
    const { postId } = match.params;
    const parentId = null;
    const replaceText = getDecodeHTML(text);
    const attachIdList = attachmentList.map(attach => ({
      attachId: attach.attachId
    }));

    dispatch(
      addReply({
        anonymous,
        isSecret,
        text: replaceText,
        postId,
        parentId,
        attachmentList: attachIdList
      })
    );
  };

  const onDeleteAttach = attachId => {
    const attachListData = addForm.attachmentList.filter(
      e => e.attachId !== attachId
    );

    dispatch(
      changeField({
        form: 'addForm',
        key: 'attachmentList',
        value: attachListData
      })
    );
    dispatch(removeAttach({ id: attachId }));
  };

  const handleEditorImg = ({ downloadUrl, fileName }) => {
    const $p = document.createElement('p');
    const $img = document.createElement('img');
    $img.setAttribute('src', downloadUrl);
    $img.setAttribute('alt', fileName);
    $p.appendChild($img);
    return $p.outerHTML;
  };

  useEffect(() => {
    if (addAttachData) {
      const attachListData = addForm.attachmentList.concat(addAttachData.data);
      const editorText = `${addForm.text}${addAttachData.data
        .filter(e => confirmFileExtension(e.fileName))
        .map(e => handleEditorImg(e))
        .join('')}`;

      dispatch(
        changeField({
          form: 'addForm',
          key: 'text',
          value: editorText
        })
      );

      dispatch(
        changeField({
          form: 'addForm',
          key: 'attachmentList',
          value: attachListData
        })
      );
    }
  }, [addAttachData]);

  useEffect(() => {
    if (addForm.attachmentList) {
      const attachIamges = addForm.attachmentList.filter(e =>
        confirmFileExtension(e.fileName)
      );

      setAttachImgList(attachIamges);
    }
  }, [addForm.attachmentList]);

  return (
    <>
      <ReplyAdd
        attachImgList={attachImgList}
        loading={loading}
        error={error}
        addForm={addForm}
        handleChange={handleChange}
        handleSecret={handleSecret}
        handleContentText={handleContentText}
        onSubmit={onSubmit}
        onDeleteAttach={onDeleteAttach}
        handleAttachFiles={handleAttachFiles}
      />
    </>
  );
};

export default withRouter(ReplyAddContainer);
