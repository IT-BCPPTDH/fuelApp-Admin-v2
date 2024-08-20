import React, { useState, useMemo } from 'react';
import {
  
  EuiTabs,
  EuiTab,
  
} from '@elastic/eui';

const DynamicTabs = ({ tabs, initialSelectedTabId }) => {
  const [selectedTabId, setSelectedTabId] = useState(initialSelectedTabId);

  const selectedTabContent = useMemo(() => {
    return tabs.find((tab) => tab.id === selectedTabId)?.content;
  }, [selectedTabId, tabs]);

  const onSelectedTabChanged = (id) => {
    setSelectedTabId(id);
  };

  const renderTabs = () => {
    return tabs.map((tab, index) => (
      <EuiTab
        key={index}
        href={tab.href}
        onClick={() => onSelectedTabChanged(tab.id)}
        isSelected={tab.id === selectedTabId}
        disabled={tab.disabled}
        prepend={tab.prepend}
        append={tab.append}
      >
        {tab.name}
      </EuiTab>
    ));
  };

  return (
    <>
      <EuiTabs>{renderTabs()}</EuiTabs>
      {selectedTabContent}
    </>
  );
};

export default DynamicTabs;
