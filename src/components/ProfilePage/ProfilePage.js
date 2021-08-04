import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Button,
  Menu,
  MenuItem,
  TextField,
  DialogActions,
  Dialog,
  DialogTitle
} from '@material-ui/core';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTools, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import {
  accountData,
  changebleAccount,
  informationOpenAgreeEnum
} from '../../DataExport';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const InfoTableWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 540px;
`;

const InfoTable = styled(TableContainer)`
  margin-top: 24px;
`;

const Welcome = styled.div`
  margin: 24px;
  font-size: 24px;
`;

const MyinfoHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
`;

const EditTableCell = styled.th`
  text-align: right;
  padding: 6px;
  display: table-cell;
  font-size: 0.875rem;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-weight: 400;
  line-height: 1.43;
  border-bottom: 1px solid rgba(224, 224, 224, 1);
  letter-spacing: 0.01071em;
  vertical-align: inherit;
`;

const FormInput = styled.input`
  size: 20;
  height: 15px;
  border: none;
  padding: 12px;
  text-align: right;
  font-size: 0.875rem;
  font-weight: bold;
  autocomplete: off;
  &:focus {
    outline: none;
    border: none;
  }
`;

const FormField = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

const FormTextField = styled(TextField)`
  margin: 12px;
  margin-left: 32px;
  margin-right: 32px;
  margin="dense"
`;

const ErrorText = styled.div`
  margin: 6px;
  font-size: 18px;
  color: red;
`;

const PwChangeDialog = props => {
  const {
    pwChangeDialogOpen,
    pwChangeClick,
    pwChangeSubmit,
    error,
    newPwForm,
    pwFormChange
  } = props;
  return (
    <>
      <Dialog
        open={pwChangeDialogOpen}
        onClose={pwChangeClick}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">비밀번호 변경</DialogTitle>
        <FormField onSubmit={pwChangeSubmit}>
          <FormTextField
            autoFocus
            id="nowPassword"
            label="현재 비밀번호를 입력하세요"
            type="password"
            onChange={pwFormChange}
            value={newPwForm.nowPassword}
          />
          <FormTextField
            id="newPassword"
            label="새로운 비밀번호"
            type="password"
            onChange={pwFormChange}
            value={newPwForm.newPassword}
          />
          <FormTextField
            id="newPasswordConfirm"
            label="새로운 비밀번호 확인"
            type="password"
            onChange={pwFormChange}
            value={newPwForm.newPasswordConfirm}
          />
        </FormField>
        <ErrorText>{error}</ErrorText>
        <DialogActions>
          <Button onClick={pwChangeClick} color="primary">
            취소
          </Button>
          <Button onClick={pwChangeSubmit} color="primary">
            변경하기
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const ProfileHeader = props => {
  const {
    editMode,
    editModeChangeClick,
    menuClick,
    anchorEl,
    pwChangeDialogOpen,
    pwChangeClick,
    newPwForm,
    pwFormChange,
    pwChangeSubmit
  } = props;

  return (
    <MyinfoHeader>
      {editMode ? (
        <>
          <div />
          <Welcome>기본정보</Welcome>
          <FontAwesomeIcon
            icon={faTimesCircle}
            size="lg"
            color="#DC143C"
            style={{ cursor: 'pointer' }}
            onClick={editModeChangeClick}
          />
        </>
      ) : (
        <>
          <div />
          <Welcome>기본정보</Welcome>
          <FontAwesomeIcon
            icon={faTools}
            size="lg"
            style={{ cursor: 'pointer' }}
            onClick={menuClick}
          />
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={menuClick}
            style={{ marginLeft: '36px' }}
          >
            <MenuItem onClick={editModeChangeClick}>개인정보 수정</MenuItem>
            <MenuItem onClick={pwChangeClick}>비밀번호 변경</MenuItem>
            <MenuItem onClick={menuClick}>회원탈퇴</MenuItem>
          </Menu>
        </>
      )}
      <PwChangeDialog
        pwChangeDialogOpen={pwChangeDialogOpen}
        pwChangeClick={pwChangeClick}
        newPwForm={newPwForm}
        pwFormChange={pwFormChange}
        pwChangeSubmit={pwChangeSubmit}
      />
    </MyinfoHeader>
  );
};

const ProfileRow = props => {
  const { row } = props;
  return (
    <>
      <TableRow key={row[0]}>
        <TableCell component="th" scope="row">
          {accountData[row[0]]}
        </TableCell>
        {row[0] === 'informationOpenAgree' ? (
          <TableCell align="right">
            {informationOpenAgreeEnum[row[1]]}
          </TableCell>
        ) : (
          <TableCell align="right">{row[1]}</TableCell>
        )}
      </TableRow>
    </>
  );
};

const EditRow = props => {
  const { informationOpenAgreeChange, row, infoEdit, handleChange } = props;
  return (
    <TableRow key={row[0]}>
      <TableCell component="th" scope="row">
        {accountData[row[0]]}
      </TableCell>
      {row[0] === 'informationOpenAgree' ? (
        <EditTableCell
          align="right"
          onClick={informationOpenAgreeChange}
          style={{
            paddingRight: '16px',
            cursor: 'pointer'
          }}
        >
          {informationOpenAgreeEnum[infoEdit[row[0]]]}
        </EditTableCell>
      ) : (
        <EditTableCell>
          <FormInput
            name={accountData[row[0]]}
            id={row[0]}
            value={infoEdit[row[0]]}
            onChange={handleChange}
          />
        </EditTableCell>
      )}
    </TableRow>
  );
};

const SubmitButton = props => {
  const { editMode, onMyinfoEditSubmit } = props;
  return (
    <>
      {editMode ? (
        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{ margin: '24px', cursor: 'pointer' }}
          onClick={onMyinfoEditSubmit}
        >
          수정
        </Button>
      ) : (
        <></>
      )}
    </>
  );
};

const PropfilePage = props => {
  const {
    info,
    editMode,
    infoEdit,
    editRes,
    anchorEl,
    pwChangeDialogOpen,
    newPwForm
  } = props;

  const {
    editModeChangeClick,
    handleChange,
    informationOpenAgreeChange,
    onMyinfoEditSubmit,
    menuClick,
    pwChangeClick,
    pwFormChange,
    pwChangeSubmit
  } = props;

  const rows = Object.entries(info);

  return (
    <Wrapper>
      <InfoTableWrapper>
        <ProfileHeader
          anchorEl={anchorEl}
          editMode={editMode}
          editModeChangeClick={editModeChangeClick}
          menuClick={menuClick}
          pwChangeDialogOpen={pwChangeDialogOpen}
          pwChangeClick={pwChangeClick}
          newPwForm={newPwForm}
          pwFormChange={pwFormChange}
          pwChangeSubmit={pwChangeSubmit}
        />
        {editRes}
        <InfoTable>
          <Table>
            <TableBody>
              {rows.map(row => (
                <>
                  {changebleAccount.includes(row[0]) && editMode ? (
                    <EditRow
                      informationOpenAgreeChange={informationOpenAgreeChange}
                      row={row}
                      infoEdit={infoEdit}
                      handleChange={handleChange}
                    />
                  ) : (
                    <ProfileRow row={row} />
                  )}
                </>
              ))}
            </TableBody>
          </Table>
        </InfoTable>
        <SubmitButton
          editMode={editMode}
          onMyinfoEditSubmit={onMyinfoEditSubmit}
        />
      </InfoTableWrapper>
    </Wrapper>
  );
};

export default PropfilePage;
