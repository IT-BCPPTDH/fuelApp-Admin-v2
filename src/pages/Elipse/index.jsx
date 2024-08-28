import React, { useState, useEffect } from 'react';
import DynamicPageHeader from "../../components/Breadcrumbs";
import { EuiCard, EuiSpacer, EuiText, EuiFormRow, EuiFieldText, EuiCheckbox, EuiFlexGrid, EuiRadio, EuiFlexItem, EuiDatePicker, EuiButton, EuiFieldSearch, EuiSelect } from "@elastic/eui";
import DynamicTabs from "../../components/Tablist";

import DynamicRadioGroup from '../../components/Radio';
import moment from "moment";
import TableData from './table';

const ElipsePage = () => {
  const [checkedItems, setCheckedItems] = useState({});

  const breadcrumbs = [
    {
      text: 'Dashboard',
      href: '#',
      onClick: (e) => e.preventDefault(),
    },
    {
      text: 'Elipse',
      href: '#',
      onClick: (e) => e.preventDefault(),
    },
  ];

  return (
    <>
      <div className="padding-content">
        <DynamicPageHeader
          pageTitle="Master Elipse"
          breadcrumbs={breadcrumbs}
          pageTitleStyle={{ color: '#6a6a6a', fontSize: '24px' }}
        />
        <TableData/>
      </div>
    </>
  );
}

export default ElipsePage;
