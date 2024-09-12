import React, { useState, useEffect } from 'react';
import DynamicPageHeader from "../../components/Breadcrumbs";
// import { EuiCard, EuiFieldPassword, EuiSpacer, EuiText, EuiFormRow, EuiFieldText, EuiCheckbox, EuiFlexGrid, EuiRadio, EuiFlexItem, EuiDatePicker, EuiButton, EuiFieldSearch, EuiSelect, EuiForm } from "@elastic/eui";
import { EuiCard, EuiForm, EuiFormRow, EuiFieldPassword, EuiButton, EuiFlexGroup, EuiFlexItem } from '@elastic/eui';
import DynamicTabs from "../../components/Tablist";

import DynamicRadioGroup from '../../components/Radio';
import moment from "moment";
// import TableData from './table';

const ChangePage = () => {
  const breadcrumbs = [
    {
      text: 'Dashboard',
      href: '/',
    },
    {
      text: 'Change Password',
      href: '#',
      onClick: (e) => e.preventDefault(),
    },
  ];

  return (
    <>
      <div className="padding-content">
        <DynamicPageHeader
          pageTitle="Change Password"
          breadcrumbs={breadcrumbs}
          pageTitleStyle={{ color: '#6a6a6a', fontSize: '24px' }}
        />
        <EuiCard style={{width:"250vh", marginLeft:"20px", marginTop:"25px"}}>
          <EuiForm component="form" style={{width:"200vh", marginLeft:"20vh", marginTop:"30px"}}>
            {/* FlexGroup untuk menempatkan input New Password dan Confirm Password secara horizontal */}
            <EuiFlexGroup>
              <EuiFlexItem>
                <EuiFormRow label="New Password">
                  <EuiFieldPassword
                    placeholder="Enter new password"
                    // value={newPassword}
                    // onChange={(e) => setNewPassword(e.target.value)}
                  />
                </EuiFormRow>
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiFormRow label="Confirm Password">
                  <EuiFieldPassword
                    placeholder="Confirm new password"
                    // value={confirmPassword}
                    // onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </EuiFormRow>
              </EuiFlexItem>
            </EuiFlexGroup>

            {/* FlexGroup for aligning the buttons to the right */}
            <EuiFlexGroup justifyContent="flexEnd" style={{marginTop:"30px", marginRight: "55px"}}>
              <EuiFlexItem grow={false}>
                <EuiButton color="text" 
                // onClick={handleCancel}
                >
                  Cancel
                </EuiButton>
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiButton fill color="primary" 
                // onClick={handleSave}
                >
                  Save
                </EuiButton>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiForm>
        </EuiCard>
        {/* <TableData/> */}
      </div>
    </>
  );
}

export default ChangePage;
