import React from "react";
import Navtop from "../../components/NavTop";
import CardContent from "./widget";
import {
  EuiPanel,
  EuiFlexGrid,
  EuiFlexItem,
  EuiText,
  EuiButton,
  EuiDataGrid,
} from "@elastic/eui";
import TableData from "./table";
const HomePage = () => {
  return (
    <>
      <Navtop />
      <div className="content-padding">
        <EuiFlexGrid columns={4}>
          <EuiFlexItem>
            <EuiText  paddingSize="l">
              <div className="summary">Fuel Summary</div>
              <div className="date">Tuesday, 26-April-2024</div>
            </EuiText>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiText paddingSize="l"></EuiText>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiText paddingSize="l"></EuiText>
          </EuiFlexItem>
          <EuiFlexItem>
            <>
              <EuiFlexGrid columns={3}>
                <EuiFlexItem>
                  <div>Tanggal</div>
                </EuiFlexItem>
                <EuiFlexItem>
                  <div>Tanggal</div>
                </EuiFlexItem>
                <EuiButton
                  size="s"
                  style={{
                    background: "#73A33F",
                    color: "white",
                    width: "100px",
                  }}
                >
                  <div>Select</div>
                </EuiButton>
              </EuiFlexGrid>
            </>
          </EuiFlexItem>
        </EuiFlexGrid>
        <div style={{ marginTop: "20px" }}>
          <CardContent />
        </div>
        <div className="mt20">
        <EuiFlexGrid columns={2}>
            <EuiFlexItem>
            <EuiText   paddingSize="l" >
                  <div className="summary">
                    Fuel Station Summary
                  </div>
            </EuiText>
            <EuiText>
              <div className="note-summary">
                  Notes for validation:
              </div>
              <div className="note-summary">
                <div>Close Data = Open Stock + Receipt KPC + Receipt - Issued - Transfer</div>
                <div> * Variant = Close Sonding - Close Data</div>
                <div>* Intershift O/C Variance = Opening Stock Current Shift - Closing Stock Previous Shift</div>
              </div>
            </EuiText>
            </EuiFlexItem>
        </EuiFlexGrid>
        </div>
        <div className="mt20">
            <TableData/>
        </div>
      </div>
    </>
  );
};

export default HomePage;
