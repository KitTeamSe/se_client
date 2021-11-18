import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addReport, initialize } from '../../modules/report';
import ReportDialog from '../../components/Report/ReportDialog';

const ReportDialogContainer = () => {
  const [reportDescription, setReportDescription] = useState('');
  const dispatch = useDispatch();
  const { reportType, targetName, targetId } = useSelector(({ report }) => ({
    reportType: report.reportType,
    targetName: report.targetName,
    targetId: report.targetId
  }));

  useEffect(() => {}, [reportType]);

  // 신고 관련
  const descriptionChange = e => {
    e.preventDefault();
    const { value } = e.target;
    setReportDescription(value);
  };

  const reportSubmit = e => {
    e.preventDefault();
    dispatch(
      addReport({
        description: reportDescription,
        reportType,
        targetId
      })
    );
    setReportDescription('');
    dispatch(initialize());
  };

  const handleCancel = e => {
    e.preventDefault();
    dispatch(initialize());
    setReportDescription('');
  };

  return (
    <ReportDialog
      reportOpen={!!reportType}
      reportSubmit={reportSubmit}
      reportDescription={reportDescription}
      descriptionChange={descriptionChange}
      reportType={reportType}
      targetName={targetName}
      handleCancel={handleCancel}
    />
  );
};

export default withRouter(ReportDialogContainer);
