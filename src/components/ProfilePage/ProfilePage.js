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

const ProfileHeader = props => {
  const { myinfoEditMode } = props;

  return (
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
  );
};

const ProfileMode = props => {
  const { myinfoEditMode, rows } = props;

  return (
    <Wrapper>
      <InfoTableWrapper>
        <ProfileHeader myinfoEditMode={myinfoEditMode} />
        <InfoTable>
          <Table>
            <TableBody>
              {rows.map(row => (
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
    editMode,
    informationOpenAgreeChange
  } = props;

  return (
    <Wrapper>
      <InfoTableWrapper>
        <ProfileHeader myinfoEditMode={myinfoEditMode} />
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
    onMyinfoEditSubmit,
    editRes,
    informationOpenAgreeChange
  } = props;
  const rows = Object.entries(info);

  return (
    <div>
      {editRes}
      {editMode ? (
        <EditMode
          rows={rows}
          myinfoEditMode={myinfoEditMode}
          handleChange={handleChange}
          infoEdit={infoEdit}
          onMyinfoEditSubmit={onMyinfoEditSubmit}
          editMode={editMode}
          informationOpenAgreeChange={informationOpenAgreeChange}
        />
      ) : (
        <ProfileMode rows={rows} myinfoEditMode={myinfoEditMode} />
      )}
    </div>
  );
};

export default PropfilePage;
