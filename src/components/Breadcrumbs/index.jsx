import React from 'react';
import { EuiPageHeader, } from '@elastic/eui';

const DynamicPageHeader = ({ pageTitle, description, breadcrumbs, rightSideItems }) => (
  <EuiPageHeader
    pageTitle={pageTitle}
    description={description}
    breadcrumbs={breadcrumbs}
    rightSideItems={rightSideItems}
  />
);

export default DynamicPageHeader;
