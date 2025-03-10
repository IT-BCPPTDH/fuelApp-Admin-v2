import React, { useState } from 'react';
import DynamicPageHeader from "../../components/Breadcrumbs";
import TableData from './table';

const OperatorPage = () => {
  const [checkedItems, setCheckedItems] = useState({});

  const breadcrumbs = [
    {
      text: 'Dashboard',
      href: '/',
    },
    {
      text: 'Opeator',
      href: '#',
      onClick: (e) => e.preventDefault(),
    },
  ];

  return (
    <>
      <div className="padding-content">
        <DynamicPageHeader
          pageTitle="Equipment"
          breadcrumbs={breadcrumbs}
          pageTitleStyle={{ color: '#6a6a6a', fontSize: '24px' }}
        />
        <TableData/>
      </div>
    </>
  );
}

export default OperatorPage;
