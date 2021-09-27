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
  CircularProgress
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

const redColor = 'ffeeeeee';

const MainWrapper = styled.div`
  margin: auto;
  margin-top: 3rem;
  width: 30vw;
  padding: 1.5rem;
  display: display;
  align-items: center;
  background-color: #ffffff;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  @media ${props => props.theme.mobile} {
    width: calc(100vw - 1rem);
    margin-top: 1rem;
    padding: 0.5rem;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
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
  background-color: #${redColor};
  height: 15px;
  border: 1px solid #e0e0e0;
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

const FormSelectField = styled(Select)`
  margin-right: 2px;
  width: 128px;
`;

const RefreshIcon = styled(FontAwesomeIcon)`
  margin-left: 1.5rem;
  transition: 1s;
  &:hover {
    transform: rotate(360deg);
    transition: 1s;
  }
`;

const LoadingCircle = styled(CircularProgress)`
  position: absolute;
  bottom: 50vh;
`;

const EditTableRow = styled(TableRow)`
  background-color: #${redColor};
`;

const ProfileHeader = props => {
  const {
    mode,
    anchorEl,
    profileUserId,
    userId,
    modeChange,
    menuClick,
    editFormRefresh
  } = props;

  if (profileUserId !== userId) {
    return (
      <MyinfoHeader>
        <Welcome>{profileUserId} 님의 정보</Welcome>
      </MyinfoHeader>
    );
  }

  return (
    <MyinfoHeader>
      {mode === 'editMode' ? (
        <>
          <div />
          <Welcome>내 정보</Welcome>
          <div>
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
          </div>
        </>
      ) : (
        <>
          <div />
          <Welcome>내 정보</Welcome>
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
    </MyinfoHeader>
  );
};

const ProfileRow = props => {
  const { row } = props;
  return (
    <>
      <TableRow key={`${row[0]}profileRow`}>
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
            <MenuItem value={type.userType} key={type.userType}>
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
    <EditTableRow key={`${row[0]}profileRow`}>
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
    </EditTableRow>
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

const ProfileBody = props => {
  const {
    rows,
    infoEditObj,
    informationOpenAgreeChange,
    handleChange,
    typeChange,
    mode,
    myinfoEditSubmit
  } = props;
  return (
    <>
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
                    key={`${row[0]}editRow`}
                  />
                ) : (
                  <ProfileRow row={row} />
                )}
              </>
            ))}
          </TableBody>
        </Table>
      </InfoTable>
      <SubmitButton mode={mode} myinfoEditSubmit={myinfoEditSubmit} />
    </>
  );
};

const PropfilePage = props => {
  const { infoObj, infoEditObj, anchorEl, mode, loading } = props;

  const {
    handleChange,
    modeChange,
    informationOpenAgreeChange,
    myinfoEditSubmit,
    menuClick,
    formChange,
    typeChange,
    editFormRefresh
  } = props;

  if (infoObj === null || loading) {
    return (
      <Wrapper>
        <LoadingCircle />
      </Wrapper>
    );
  }
  const rows = Object.entries(infoObj);
  const profileUserId = infoObj.idString;
  const userId = localStorage.getItem('userId');
  return (
    <MainWrapper>
      <ProfileHeader
        mode={mode}
        anchorEl={anchorEl}
        profileUserId={profileUserId}
        userId={userId}
        formChange={formChange}
        modeChange={modeChange}
        menuClick={menuClick}
        editFormRefresh={editFormRefresh}
      />
      <ProfileBody
        rows={rows}
        infoEditObj={infoEditObj}
        informationOpenAgreeChange={informationOpenAgreeChange}
        handleChange={handleChange}
        typeChange={typeChange}
        mode={mode}
        myinfoEditSubmit={myinfoEditSubmit}
      />
    </MainWrapper>
  );
};

export default PropfilePage;
