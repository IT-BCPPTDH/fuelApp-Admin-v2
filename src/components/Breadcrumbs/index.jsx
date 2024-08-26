import React from 'react';
import { EuiPageHeader } from '@elastic/eui';

const DynamicPageHeader = ({ pageTitle, description, breadcrumbs, rightSideItems, pageTitleStyle }) => (
  <EuiPageHeader
    pageTitle={<span style={pageTitleStyle}>{pageTitle}</span>}
    description={description}
    breadcrumbs={breadcrumbs}
    rightSideItems={rightSideItems}
  />
);

export default DynamicPageHeader;
