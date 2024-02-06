import React from "react";
import Title from "../components/Title";
import InputUnit from "./AdminCoalHauling/InputUnit";
import TableInputUnit from "./AdminCoalHauling/TableInputUnit";
import InputOperator from "./AdminCoalHauling/InputOperator";
import { DynamicTablistMenu } from "../components/Tablist";

const tabs = [
  { label: 'Data Master Unit', value: 'coalhaulig-admin/nounit/' },
  { label: 'Data Master Operator', value: 'coalhaulig-admin/operator/' }
]

const activeTab = 'coalhaulig-admin/nounit/'; 


const AdminCoalHauling = () => {
  const handleTabChange = (value) => {
    console.log(`Navigating to: /${value}`);
    navigate(`/${value}`);
  };
  return (
    <>
      <Title title="Master Data" />
      <DynamicTablistMenu tabs={tabs} active={activeTab} onTab={(tab) => handleTabChange(tabs.value)} />
    </>
  );
};

export default AdminCoalHauling;
