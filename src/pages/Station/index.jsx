import React, { useState, useEffect } from 'react';
import DynamicPageHeader from "../../components/Breadcrumbs";
import { EuiCard, EuiSpacer, EuiText, EuiFormRow, EuiFieldText, EuiCheckbox, EuiFlexGrid, EuiRadio, EuiFlexItem, EuiDatePicker, EuiButton, EuiFieldSearch, EuiSelect } from "@elastic/eui";
import DynamicTabs from "../../components/Tablist";

import DynamicRadioGroup from '../../components/Radio';
import moment from "moment";
import TableData from './table';

const StationPage = () => {
  const [checkedItems, setCheckedItems] = useState({});
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment());

  const dummyData = [
    { id: 'checkboxId__1', label: 'TK1037-1' },
    { id: 'checkboxId__2', label: 'TK1047' },
    { id: 'checkboxId__3', label: 'FT1101' },
    { id: 'checkboxId__4', label: 'FT1146' },
    { id: 'checkboxId__5', label: 'FT1114' },
    { id: 'checkboxId__6', label: 'TK1036-2' },
    { id: 'checkboxId__7', label: 'BEJM369' },
    { id: 'checkboxId__8', label: 'PT. DIRE' },
    { id: 'checkboxId__9', label: 'TK1037 ' },
    { id: 'checkboxId__10', label: 'HFT1164' },
    { id: 'checkboxId__11', label: 'TK1037-2' },
    { id: 'checkboxId__12', label: 'T112' },
    { id: 'checkboxId__13', label: 'TK1036-1' },
    { id: 'checkboxId__14', label: 'FT1116' },
    { id: 'checkboxId__15', label: 'FT1102' },
    { id: 'checkboxId__16', label: 'FT1108' },
    { id: 'checkboxId__17', label: 'FT1151' },
    { id: 'checkboxId__18', label: 'TK1033' },
    { id: 'checkboxId__19', label: 'T112-2' },
    { id: 'checkboxId__20', label: 'TK1035' },
    { id: 'checkboxId__21', label: 'PT. MTN' },
    { id: 'checkboxId__22', label: 'FT1154' },
    { id: 'checkboxId__23', label: 'HFT1120' },
 
   
   
  ];

  useEffect(() => {
 
    const allChecked = dummyData.every(item => checkedItems[item.id]);
    setIsAllChecked(allChecked);
  }, [checkedItems]);

  const onChange = (event) => {
    const { id, checked } = event.target;
    setCheckedItems(prevState => ({
      ...prevState,
      [id]: checked
    }));
    console.log(checked)
  };

  const onSelectAllChange = (event) => {
    const { checked } = event.target;
    setIsAllChecked(checked);
    const updatedCheckedItems = dummyData.reduce((acc, item) => {
      acc[item.id] = checked;
      return acc;
    }, {});
    setCheckedItems(updatedCheckedItems);
  };
  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };


  const breadcrumbs = [
    {
      text: 'Dashboard',
      href: '#',
      onClick: (e) => e.preventDefault(),
    },
    {
      text: 'Station',
      href: '#',
      onClick: (e) => e.preventDefault(),
    },
  ];

  return (
    <>
      <div className="padding-content">
        <DynamicPageHeader
          pageTitle="Station"
          breadcrumbs={breadcrumbs}
          pageTitleStyle={{ color: '#6a6a6a', fontSize: '24px' }}
        />
        <TableData/>
      </div>
    </>
  );
}

export default StationPage;
