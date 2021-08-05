import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Button,
  Menu,
  Select,
  MenuItem,
  TextField,
  DialogActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText
} from '@material-ui/core';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTools,
  faTimesCircle,
  faSyncAlt
} from '@fortawesome/free-solid-svg-icons';

import {
  accountData,
  changebleAccount,
  informationOpenAgreeEnum,
  typeList
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
  max-width: 396px;
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
  position: relative;
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
  margin: 12px 32px 12px 32px;
  min-width: 256px;
`;

const ErrorText = styled.div`
  margin: 6px;
  font-size: 18px;
  color: red;
`;

const FormSelectField = styled(Select)`
  margin-right: 2px;
  width: 128px;
`;

const RefreshIcon = styled(FontAwesomeIcon)`
  position: absolute;
  right: -10px;
  transition: 0.5s;
  &:hover {
    transform: rotate(180deg);
    transition: 1s;
  }
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
        <Wrapper>
          <ErrorText>{error}</ErrorText>
        </Wrapper>
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

const WithdrawalDialog = props => {
  const {
    withdrawalOpen,
    withdrawalClick,
    error,
    withDrawalForm,
    withDrawalFormChange,
    withdrawalSubmit
  } = props;
  return (
    <>
      <Dialog
        open={withdrawalOpen}
        onClose={withdrawalClick}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">회원 탈퇴</DialogTitle>
        <DialogContent>
          <DialogContentText> 나 탈퇴한다~~~~~~~~~</DialogContentText>
        </DialogContent>
        <FormField submit={withdrawalSubmit}>
          <FormTextField
            autoFocus
            id="password"
            label="비밀번호를 입력하세요"
            type="password"
            onChange={withDrawalFormChange}
            value={withDrawalForm.password}
          />
          <FormTextField
            id="text"
            label="'탈퇴'를 입력하세요"
            type="text"
            onChange={withDrawalFormChange}
            value={withDrawalForm.text}
          />
        </FormField>
        <Wrapper>
          <ErrorText style={{ fontSize: '16px' }}>{error}</ErrorText>
        </Wrapper>
        <DialogActions>
          <Button onClick={withdrawalClick} color="primary">
            취소
          </Button>
          <Button onClick={withdrawalSubmit} color="primary">
            탈퇴
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
    pwChangeSubmit,
    error,
    withdrawalOpen,
    withdrawalClick,
    withDrawalForm,
    withDrawalFormChange,
    withdrawalSubmit,
    editFormRefresh
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
          <RefreshIcon
            icon={faSyncAlt}
            size="lg"
            style={{ cursor: 'pointer' }}
            onClick={editFormRefresh}
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
            <MenuItem onClick={withdrawalClick}>회원탈퇴</MenuItem>
          </Menu>
        </>
      )}
      <PwChangeDialog
        pwChangeDialogOpen={pwChangeDialogOpen}
        pwChangeClick={pwChangeClick}
        newPwForm={newPwForm}
        pwFormChange={pwFormChange}
        pwChangeSubmit={pwChangeSubmit}
        error={error}
      />
      <WithdrawalDialog
        withdrawalOpen={withdrawalOpen}
        withdrawalClick={withdrawalClick}
        pwFormChange={pwFormChange}
        withDrawalFormChange={withDrawalFormChange}
        withDrawalForm={withDrawalForm}
        withdrawalSubmit={withdrawalSubmit}
        error={error}
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

const EditRowClassifier = props => {
  const {
    row,
    informationOpenAgreeChange,
    infoEdit,
    handleChange,
    typeChange
  } = props;
  if (row[0] === 'informationOpenAgree') {
    return (
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
    );
  }
  if (row[0] === 'type') {
    return (
      <EditTableCell>
        <FormSelectField
          name="zzz"
          id={row[0]}
          value={infoEdit[row[0]]}
          onChange={typeChange}
        >
          {typeList.map(type => (
            <MenuItem value={type.userType} key={type.typeid}>
              {type.userType}
            </MenuItem>
          ))}
        </FormSelectField>
      </EditTableCell>
    );
  }
  return (
    <EditTableCell>
      <FormInput
        name={accountData[row[0]]}
        id={row[0]}
        value={infoEdit[row[0]]}
        onChange={handleChange}
      />
    </EditTableCell>
  );
};

const EditRow = props => {
  const {
    informationOpenAgreeChange,
    row,
    infoEdit,
    handleChange,
    typeChange
  } = props;
  return (
    <TableRow key={row[0]}>
      <TableCell component="th" scope="row">
        {accountData[row[0]]}
      </TableCell>
      <EditRowClassifier
        row={row}
        informationOpenAgreeChange={informationOpenAgreeChange}
        infoEdit={infoEdit}
        handleChange={handleChange}
        typeChange={typeChange}
      />
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
    infoObj,
    editMode,
    infoEdit,
    anchorEl,
    pwChangeDialogOpen,
    newPwForm,
    error,
    withdrawalOpen,
    withDrawalForm
  } = props;

  const {
    editModeChangeClick,
    handleChange,
    informationOpenAgreeChange,
    onMyinfoEditSubmit,
    menuClick,
    pwChangeClick,
    pwFormChange,
    pwChangeSubmit,
    typeChange,
    withdrawalClick,
    withDrawalFormChange,
    withdrawalSubmit,
    editFormRefresh
  } = props;

  const rows = Object.entries(infoObj);

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
          error={error}
          withdrawalOpen={withdrawalOpen}
          withdrawalClick={withdrawalClick}
          withDrawalForm={withDrawalForm}
          withDrawalFormChange={withDrawalFormChange}
          withdrawalSubmit={withdrawalSubmit}
          editFormRefresh={editFormRefresh}
        />
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
                      typeChange={typeChange}
                    />
                  ) : (
                    <ProfileRow row={row} />
                  )}
                </>
              ))}
            </TableBody>
          </Table>
        </InfoTable>
        <ErrorText>{error}</ErrorText>
        <SubmitButton
          editMode={editMode}
          onMyinfoEditSubmit={onMyinfoEditSubmit}
        />
      </InfoTableWrapper>
    </Wrapper>
  );
};

export default PropfilePage;
