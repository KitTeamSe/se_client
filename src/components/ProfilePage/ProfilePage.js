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

const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const HalfButton = styled(Button)`
  width: 50%;
  padding: 8px;
  margin: 8px;
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
  const { mode, error, newPwForm, modeChange, pwChangeSubmit, formChange } =
    props;
  return (
    <>
      <Dialog
        open={mode === 'pwChangeMode'}
        onClose={modeChange}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">비밀번호 변경</DialogTitle>
        <FormField onSubmit={pwChangeSubmit}>
          <FormTextField
            autoFocus
            id="nowPassword"
            label="현재 비밀번호를 입력하세요"
            type="password"
            onChange={formChange}
            value={newPwForm.nowPassword}
          />
          <FormTextField
            id="newPassword"
            label="새로운 비밀번호"
            type="password"
            onChange={formChange}
            value={newPwForm.newPassword}
          />
          <FormTextField
            id="newPasswordConfirm"
            label="새로운 비밀번호 확인"
            type="password"
            onChange={formChange}
            value={newPwForm.newPasswordConfirm}
          />
          <ErrorText>{error}</ErrorText>
          <ButtonWrapper>
            <HalfButton onClick={modeChange} color="primary">
              취소
            </HalfButton>
            <HalfButton type="submit" onClick={pwChangeSubmit} color="primary">
              변경하기
            </HalfButton>
          </ButtonWrapper>
        </FormField>
      </Dialog>
    </>
  );
};

const WithdrawalDialog = props => {
  const {
    mode,
    error,
    withDrawalForm,
    modeChange,
    formChange,
    withdrawalSubmit
  } = props;
  return (
    <>
      <Dialog
        open={mode === 'withdrawalMode'}
        onClose={modeChange}
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
            onChange={formChange}
            value={withDrawalForm.password}
          />
          <FormTextField
            id="text"
            label="'탈퇴'를 입력하세요"
            type="text"
            onChange={formChange}
            value={withDrawalForm.text}
          />
          <Wrapper>
            <ErrorText style={{ fontSize: '16px' }}>{error}</ErrorText>
          </Wrapper>
          <ButtonWrapper>
            <HalfButton onClick={modeChange} color="primary">
              취소
            </HalfButton>
            <HalfButton
              type="submit"
              onClick={withdrawalSubmit}
              color="primary"
            >
              탈퇴
            </HalfButton>
          </ButtonWrapper>
        </FormField>
      </Dialog>
    </>
  );
};

const ProfileHeader = props => {
  const {
    mode,
    anchorEl,
    error,
    newPwForm,
    withDrawalForm,
    modeChange,
    menuClick,
    formChange,
    pwChangeSubmit,
    withdrawalSubmit,
    editFormRefresh
  } = props;

  return (
    <MyinfoHeader>
      {mode === 'editMode' ? (
        <>
          <div />
          <Welcome>기본정보</Welcome>
          <FontAwesomeIcon
            icon={faTimesCircle}
            size="lg"
            color="#DC143C"
            style={{ cursor: 'pointer' }}
            onClick={modeChange}
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
            id="editMode"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={menuClick}
            style={{ marginLeft: '36px' }}
          >
            <MenuItem id="editMode" onClick={modeChange}>
              개인정보 수정
            </MenuItem>
            <MenuItem id="pwChangeMode" onClick={modeChange}>
              비밀번호 변경
            </MenuItem>
            <MenuItem id="withdrawalMode" onClick={modeChange}>
              회원탈퇴
            </MenuItem>
          </Menu>
        </>
      )}
      <PwChangeDialog
        mode={mode}
        error={error}
        newPwForm={newPwForm}
        modeChange={modeChange}
        formChange={formChange}
        pwChangeSubmit={pwChangeSubmit}
      />
      <WithdrawalDialog
        mode={mode}
        withDrawalForm={withDrawalForm}
        error={error}
        modeChange={modeChange}
        formChange={formChange}
        withdrawalSubmit={withdrawalSubmit}
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
    infoEditObj,
    handleChange,
    typeChange
  } = props;
  const editRowValue = infoEditObj[row[0]];
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
        {informationOpenAgreeEnum[editRowValue]}
      </EditTableCell>
    );
  }
  if (row[0] === 'type') {
    return (
      <EditTableCell>
        <FormSelectField
          name="editType"
          id={row[0]}
          value={editRowValue}
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
        value={editRowValue}
        onChange={handleChange}
      />
    </EditTableCell>
  );
};

const EditRow = props => {
  const {
    row,
    infoEditObj,
    informationOpenAgreeChange,
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
        infoEditObj={infoEditObj}
        informationOpenAgreeChange={informationOpenAgreeChange}
        handleChange={handleChange}
        typeChange={typeChange}
      />
    </TableRow>
  );
};

const SubmitButton = props => {
  const { mode, myinfoEditSubmit } = props;
  return (
    <>
      {mode === 'editMode' ? (
        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{ margin: '24px', cursor: 'pointer' }}
          onClick={myinfoEditSubmit}
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
    infoEditObj,
    anchorEl,
    newPwForm,
    error,
    withDrawalForm,
    mode
  } = props;

  const {
    handleChange,
    modeChange,
    informationOpenAgreeChange,
    myinfoEditSubmit,
    menuClick,
    formChange,
    pwChangeSubmit,
    typeChange,
    withdrawalSubmit,
    editFormRefresh
  } = props;

  const rows = Object.entries(infoObj);

  return (
    <Wrapper>
      <InfoTableWrapper>
        <ProfileHeader
          mode={mode}
          error={error}
          anchorEl={anchorEl}
          newPwForm={newPwForm}
          withDrawalForm={withDrawalForm}
          formChange={formChange}
          modeChange={modeChange}
          menuClick={menuClick}
          pwChangeSubmit={pwChangeSubmit}
          withdrawalSubmit={withdrawalSubmit}
          editFormRefresh={editFormRefresh}
        />
        <InfoTable>
          <Table>
            <TableBody>
              {rows.map(row => (
                <>
                  {changebleAccount.includes(row[0]) && mode === 'editMode' ? (
                    <EditRow
                      row={row}
                      infoEditObj={infoEditObj}
                      informationOpenAgreeChange={informationOpenAgreeChange}
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
        <SubmitButton mode={mode} myinfoEditSubmit={myinfoEditSubmit} />
      </InfoTableWrapper>
    </Wrapper>
  );
};

export default PropfilePage;
