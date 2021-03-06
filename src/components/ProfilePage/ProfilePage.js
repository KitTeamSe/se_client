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
  CircularProgress
} from '@mui/material';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTools, faSyncAlt } from '@fortawesome/free-solid-svg-icons';

import {
  accountData,
  changebleAccount,
  informationOpenAgreeEnum
} from '../../DataExport';

const redColor = 'ffeeeeee';

const MainWrapper = styled.div`
  width: calc(100% - 2rem);
  padding: 1rem;
  display: display;
  align-items: center;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
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
  justify-content: center;
  width: 100%;
  position: relative;
`;

const ModeIconWrapper = styled.div`
  position: absolute;
  right: 1rem;
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

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 1rem;
`;

const ButtonStyeld = styled(Button)`
  padding: 6px 24px;
  border-radius: 2rem;
  margin-left: 1rem;
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
        <Welcome>{profileUserId} ?????? ??????</Welcome>
      </MyinfoHeader>
    );
  }

  return (
    <MyinfoHeader>
      <div />
      <Welcome>??? ??????</Welcome>
      {mode === 'editMode' ? (
        <>
          <ModeIconWrapper id="refreshIcon">
            <RefreshIcon
              icon={faSyncAlt}
              size="lg"
              style={{ cursor: 'pointer' }}
              onClick={editFormRefresh}
            />
          </ModeIconWrapper>
        </>
      ) : (
        <>
          <ModeIconWrapper id="modeChanger">
            <FontAwesomeIcon
              icon={faTools}
              size="lg"
              style={{ cursor: 'pointer' }}
              onClick={menuClick}
            />
          </ModeIconWrapper>
          <Menu
            id="ModeMenu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={menuClick}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
          >
            <MenuItem id="editMode" onClick={modeChange}>
              ???????????? ??????
            </MenuItem>
            <MenuItem id="pwChangeMode" onClick={modeChange}>
              ???????????? ??????
            </MenuItem>
            <MenuItem id="withdrawalMode" onClick={modeChange}>
              ????????????
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
      <TableRow>
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
  const { row, informationOpenAgreeChange, infoEditObj, handleChange } = props;
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
        id="infoAgree"
      >
        {informationOpenAgreeEnum[editRowValue]}
      </EditTableCell>
    );
  }

  if (row[0] === 'nickname') {
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
  }
  return (
    <EditTableCell>
      <FormInput
        name={accountData[row[0]]}
        id={row[0]}
        value={editRowValue}
        onChange={handleChange}
        type="password"
      />
    </EditTableCell>
  );
};

const EditRow = props => {
  const { row, infoEditObj, informationOpenAgreeChange, handleChange } = props;
  return (
    <EditTableRow>
      <TableCell component="th" scope="row">
        {accountData[row[0]]}
      </TableCell>
      <EditRowClassifier
        row={row}
        infoEditObj={infoEditObj}
        informationOpenAgreeChange={informationOpenAgreeChange}
        handleChange={handleChange}
      />
    </EditTableRow>
  );
};

const SubmitButton = props => {
  const { modeChange, myInfoEditSubmit, pwLength } = props;
  return (
    <ButtonWrapper>
      <ButtonStyeld
        className="CancelBtn"
        variant="contained"
        color="error"
        onClick={modeChange}
      >
        ??????
      </ButtonStyeld>
      {pwLength > 7 ? (
        <ButtonStyeld
          variant="contained"
          color="primary"
          onClick={myInfoEditSubmit}
        >
          ??????
        </ButtonStyeld>
      ) : (
        <ButtonStyeld variant="contained" disabled>
          ??????
        </ButtonStyeld>
      )}
    </ButtonWrapper>
  );
};

const EditModeProfilePage = props => {
  const { rows, infoEditObj, informationOpenAgreeChange, handleChange } = props;
  return (
    <>
      {rows.map(row => (
        <React.Fragment key={`${row[0]}profileRow`}>
          {changebleAccount.includes(row[0]) ? (
            <EditRow
              row={row}
              infoEditObj={infoEditObj}
              informationOpenAgreeChange={informationOpenAgreeChange}
              handleChange={handleChange}
            />
          ) : (
            <ProfileRow row={row} />
          )}
        </React.Fragment>
      ))}
      <EditRow
        row={['password', '']}
        infoEditObj={infoEditObj}
        informationOpenAgreeChange={informationOpenAgreeChange}
        handleChange={handleChange}
      />
    </>
  );
};

const ProfileBody = props => {
  const {
    rows,
    infoEditObj,
    informationOpenAgreeChange,
    handleChange,
    modeChange,
    mode,
    myInfoEditSubmit
  } = props;
  const pwLength = infoEditObj.password.length;

  return (
    <>
      <InfoTable>
        <Table>
          <TableBody>
            {mode === 'editMode' ? (
              <EditModeProfilePage
                rows={rows}
                infoEditObj={infoEditObj}
                informationOpenAgreeChange={informationOpenAgreeChange}
                handleChange={handleChange}
                modeChange={modeChange}
                myInfoEditSubmit={myInfoEditSubmit}
              />
            ) : (
              <>
                {rows.map(row => (
                  <ProfileRow row={row} key={`${row[0]}profile`} />
                ))}
              </>
            )}
          </TableBody>
        </Table>
      </InfoTable>
      {mode === 'editMode' && (
        <SubmitButton
          modeChange={modeChange}
          myInfoEditSubmit={myInfoEditSubmit}
          pwLength={pwLength}
        />
      )}
    </>
  );
};

const PropfilePage = props => {
  const { infoObj, infoEditObj, anchorEl, mode, loading } = props;

  const {
    handleChange,
    informationOpenAgreeChange,
    menuClick,
    modeChange,
    myInfoEditSubmit,
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

  // profile res data??? password??? ????????? ????????????
  const profileKeys = Object.keys(infoObj);
  const index = profileKeys.indexOf('password');
  if (index > -1) {
    rows.splice(index, 1);
  }
  const profileUserId = infoObj.idString;
  const userId = localStorage.getItem('userId');
  return (
    <MainWrapper>
      <ProfileHeader
        mode={mode}
        anchorEl={anchorEl}
        profileUserId={profileUserId}
        userId={userId}
        modeChange={modeChange}
        menuClick={menuClick}
        editFormRefresh={editFormRefresh}
      />
      <ProfileBody
        rows={rows}
        infoEditObj={infoEditObj}
        informationOpenAgreeChange={informationOpenAgreeChange}
        handleChange={handleChange}
        modeChange={modeChange}
        mode={mode}
        myInfoEditSubmit={myInfoEditSubmit}
      />
    </MainWrapper>
  );
};

export default PropfilePage;
