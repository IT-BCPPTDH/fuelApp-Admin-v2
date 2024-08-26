import React, { useState, useEffect } from 'react';
import NavTop from "../../components/NavTop";
import DynamicPageHeader from "../../components/Breadcrumbs";
import { EuiCard, EuiSpacer, EuiText, EuiFormRow, EuiFieldText, EuiCheckbox, EuiFlexGrid, EuiRadio, EuiFlexItem, EuiDatePicker, EuiButton, EuiFieldSearch, EuiSelect } from "@elastic/eui";
import DynamicTabs from "../../components/Tablist";
import './style.css';
import DynamicRadioGroup from '../../components/Radio';
import moment from "moment";

const ReportFuel = () => {
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
      text: '',
      href: '#',
      onClick: (e) => e.preventDefault(),
    },
  ];

  const radioOptions = [
    { label: 'All' },
    { label: 'Issued And Transfer' },
    { label: 'Receipt Only' },
    { label: 'Issued Only' },
    { label: 'Receipt KPC Only' },
  ];

  // Define the default selected option ID
  const defaultSelectedId = 'radioGroupItem_1';

  const tabs = [
    {
      id: 'lfk--id',
      name: 'Export LKF',
      content: (
        <>
        <div className='mt20'>
        <EuiCard className="cardContainer">
            <div className="formRowContainer">
                <EuiDatePicker   fullWidth 
                  selected={startDate}
                  onChange={handleStartDateChange}
                />
                <EuiDatePicker  fullWidth
              selected={endDate}
                  onChange={handleEndDateChange}
                />
            </div>
            <EuiFlexGrid className='mt20'>
              <EuiFormRow>
                <EuiCheckbox
                  id="selectAll"
                  label={<span className="all">All Station</span>}
                  checked={isAllChecked}
                  onChange={onSelectAllChange}
                />
              </EuiFormRow>
            </EuiFlexGrid>
            <div className="checkbox-content">
              {dummyData.map(item => (
                <EuiFormRow key={item.id} className="euiFormRow">
                  <EuiCheckbox
                    id={item.id}
                    label={<span className="checkboxLabel">{item.label}</span>}
                    checked={!!checkedItems[item.id]}
                    onChange={onChange}
                  />
                </EuiFormRow>
              ))}
             
            </div>
            <div className="checkbox-content">
            <EuiFlexGrid>
                <DynamicRadioGroup 
                 options={radioOptions}
                 defaultSelectedId={defaultSelectedId}
               
                />
              </EuiFlexGrid>
            </div>
            <div className='checkbox-content'>
              <EuiSelect fullWidth></EuiSelect>
            </div>
            <EuiButton
                  size="s"
                  style={{
                    background: "#73A33F",
                    color: "white",
                    width: "100px",
                    textAlign:"center",
                    float:"inline-end",
                    marginTop:"40px"
                  }}
                 
                >
                  <div>Create Report</div>
                </EuiButton>
          </EuiCard>
          
        </div>
          
        </>
      ),
    },
    {
      id: 'daily--id',
      name: 'Daily Report',
      content: (
        <>
          <EuiSpacer />
          <EuiText>
            <p>
              Intravenous sugar solution, also known as dextrose solution, is a 
              mixture of dextrose (glucose) and water. It is used to treat low 
              blood sugar or water loss without electrolyte loss.
            </p>
          </EuiText>
        </>
      ),
    },
  ];
  

  return (
    <>
      <NavTop />
      <div className="padding-content">
        <DynamicPageHeader
          pageTitle="Report LFK"
          breadcrumbs={breadcrumbs}
          pageTitleStyle={{ color: '#6a6a6a', fontSize: '24px' }}
        />
        <DynamicTabs
          tabs={tabs}
          initialSelectedTabId="lfk--id"
        />

      </div>
    </>
  );
}

export default ReportFuel;
