import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReplyAdd from '../../components/Reply/ReplyAdd';

import { changeField, addReply } from '../../modules/reply';
import { addAttachList, initializeAdd } from '../../modules/attach';
import confirmFileExtension from '../../utils/confirmFileExtension';
import { getDecodeHTML } from '../../utils/format';

const ReplyAddContainer = props => {
  const { match } = props;
  const dispatch = useDispatch();
  const { addForm, addAttachData, loading, error, attachList } = useSelector(
    ({ reply, attach }) => ({
      addForm: reply.addForm,
      addAttachData: attach.addAttach.data,
      loading: attach.addAttach.loading,
      error: attach.addAttach.error,
      attachList: attach.attachList
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
    dispatch(
      addReply({
        anonymous,
        isSecret,
        text: replaceText,
        postId,
        parentId,
        attachmentList
      })
    );
  };

  const handleEditorImg = ({ downloadUrl, fileName }) =>
    `<p><img src="${downloadUrl}" alt="${fileName}"></p>`;

  useEffect(() => {
    if (addAttachData) {
      console.log(attachList);
      const attachIamges = attachList.filter(e =>
        confirmFileExtension(e.fileName)
      );
      const text = `${addForm.text}${addAttachData.data
        .filter(e => confirmFileExtension(e.fileName))
        .map(e => handleEditorImg(e))
        .join('')}`;
      const attachId = addAttachData.data.map(e => ({ attachId: e.attachId }));
      setAttachImgList(attachIamges);

      dispatch(
        changeField({
          form: 'addForm',
          key: 'text',
          value: text
        })
      );

      dispatch(
        changeField({
          form: 'addForm',
          key: 'attachmentList',
          value: attachId
        })
      );
      dispatch(initializeAdd());
    }
  }, [addAttachData]);

  return (
    <>
      <ReplyAdd
        attachList={attachList}
        attachImgList={attachImgList}
        addForm={addForm}
        handleChange={handleChange}
        handleSecret={handleSecret}
        handleContentText={handleContentText}
        onSubmit={onSubmit}
        loading={loading}
        error={error}
        handleAttachFiles={handleAttachFiles}
      />
    </>
  );
};

export default withRouter(ReplyAddContainer);
