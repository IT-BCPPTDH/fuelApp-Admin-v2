import React from 'react';
import { EuiBreadcrumbs } from '@elastic/eui';

const DynamicBreadcrumbs = ({
  breadcrumbs = [],
  max = 5,
  ariaLabel = 'Breadcrumb navigation',
}) => {
  return (
    <EuiBreadcrumbs
      max={max}
      breadcrumbs={breadcrumbs}
      aria-label={ariaLabel}
    />
  );
};

export default DynamicBreadcrumbs;
