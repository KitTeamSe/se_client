import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Button
} from '@material-ui/core';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTools } from '@fortawesome/free-solid-svg-icons';
import { accountData, changebleAccount } from '../../DataExport';

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

const FormInput = styled.input`
  height: 15px;
  border: none;
  text-align: right;
  font-size: 0.875rem;
  font-weight: bold;
  outline: 0;
  width: 196px;
`;

const ProfileMode = props => {
  const { myinfoEditMode, rows } = props;

  return (
    <Wrapper>
      <InfoTableWrapper>
        <MyinfoHeader>
          <div />
          <Welcome>기본정보</Welcome>
          <FontAwesomeIcon
            icon={faTools}
            size="lg"
            style={{ cursor: 'pointer' }}
            onClick={myinfoEditMode}
          />
        </MyinfoHeader>
        <InfoTable>
          <Table>
            <TableBody>
              {rows.map(row => (
                <TableRow key={row[0]}>
                  <TableCell component="th" scope="row">
                    {accountData[row[0]]}
                  </TableCell>
                  <TableCell align="right">{row[1]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </InfoTable>
      </InfoTableWrapper>
    </Wrapper>
  );
};

const EditMode = props => {
  const {
    rows,
    myinfoEditMode,
    handleChange,
    infoEdit,
    onMyinfoEditSubmit,
    editMode
  } = props;

  return (
    <Wrapper>
      <InfoTableWrapper>
        <MyinfoHeader>
          <div />
          <Welcome>기본정보</Welcome>
          <FontAwesomeIcon
            icon={faTools}
            size="lg"
            style={{ cursor: 'pointer' }}
            onClick={myinfoEditMode}
          />
        </MyinfoHeader>
        <InfoTable>
          <Table>
            <TableBody>
              {rows.map(row => (
                <TableRow key={row[0]}>
                  {changebleAccount.includes(row[0]) && editMode ? (
                    <>
                      <TableCell component="th" scope="row">
                        {accountData[row[0]]}
                      </TableCell>
                      <TableCell align="right">
                        <FormInput
                          name={accountData[row[0]]}
                          id={row[0]}
                          value={infoEdit[row[0]]}
                          onChange={handleChange}
                        />
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell component="th" scope="row">
                        {accountData[row[0]]}
                      </TableCell>
                      <TableCell align="right">{row[1]}</TableCell>
                    </>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </InfoTable>

        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{ margin: '24px', cursor: 'pointer' }}
          onClick={onMyinfoEditSubmit}
        >
          수정
        </Button>
      </InfoTableWrapper>
    </Wrapper>
  );
};

const PropfilePage = props => {
  const {
    info,
    myinfoEditMode,
    editMode,
    infoEdit,
    handleChange,
    onMyinfoEditSubmit
  } = props;
  const rows = Object.entries(info);

  return (
    <div>
      {editMode ? (
        <EditMode
          rows={rows}
          myinfoEditMode={myinfoEditMode}
          handleChange={handleChange}
          infoEdit={infoEdit}
          onMyinfoEditSubmit={onMyinfoEditSubmit}
          editMode={editMode}
        />
      ) : (
        <ProfileMode rows={rows} myinfoEditMode={myinfoEditMode} />
      )}
    </div>
  );
};

export default PropfilePage;
