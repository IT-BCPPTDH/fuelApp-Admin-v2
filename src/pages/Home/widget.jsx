import React, { useEffect, useState } from 'react';
import { EuiCard, EuiFlexGrid, EuiFlexGroup, EuiFlexItem, EuiImage, EuiText } from '@elastic/eui';
import Icon1 from "../../images/icon1.png";
import Icon2 from "../../images/chart.png";
import Icon3 from "../../images/circle.png";
import Icon4 from "../../images/icon4.png";
import MainService from '../../services/HomeData';

const CardContent = () => {
  const [summary, setSummary] = useState(0)
  const date = JSON.parse(localStorage.getItem('formattedOption'));
  const cardsData = [
    { title: summary.prevSonding ? summary.prevSonding + ' Ltrs' : 0 + ' Ltrs', description1: 'Previous Close Sonding', description2: 'Total close sonding (h-1)', icon: Icon1 },
    { title: summary.openSonding ? summary.openSonding + ' Ltrs' : 0 + ' Ltrs', description1: 'Open Stock (Sonding)', description2: 'Summary Open Sonding (h)', icon: Icon1 },
    { title: summary.reciptKpc ? summary.reciptKpc + ' Ltrs' : 0 + ' Ltrs', description1: 'Receipt KPC', description2: 'Summary Receipt KPC', icon: Icon1 },
    { title: summary.recipt ? summary.recipt + ' Ltrs' : 0 + ' Ltrs', description1: 'Receipt Transaction', description2: 'Summary Receipt', icon: Icon1 },
    { title: summary.issuedTrx ? summary.issuedTrx + ' Ltrs' : 0 + ' Ltrs', description1: 'Issued Transaction', description2: 'Summary Issued', icon: Icon2 },
    { title: summary.tfTrx ? summary.tfTrx + ' Ltrs' : 0 + ' Ltrs', description1 : 'Transfer Transaction', description2: 'Summary Transaction', icon: Icon2 },
    { title: summary.closeData ? summary.closeData + ' Ltrs' : 0 + ' Ltrs', description1: 'Close Data', description2: 'Total Close Data ', icon: Icon2 },
    { title: summary.closeSonding ? summary.closeSonding + ' Ltrs': 0 + ' Ltrs', description1: 'Close Sonding', description2: 'Total Close Sonding ', icon: Icon2 },
    { title: summary.variant ? summary.variant + ' Ltrs' : 0 + ' Ltrs', description1: 'Variant', description2: 'Summary Transaction', icon: Icon3 },
    { title: summary.intershiftDtoN ? summary.intershiftDtoN + ' Ltrs' : 0 + ' Ltrs', description1: 'Intershift O/C Variance', description2: 'Total Intershift (D to N)', icon: Icon3 },
    { title: summary.intershiftNtoD  ? summary.intershiftNtoD + ' Ltrs' : 0 + ' Ltrs', description1: 'Intershift O/C Variance', description2: ' Total Intershift (N to D)', icon: Icon3 },
  ];

  useEffect(() => {
    const fetchSummary = async (date) => {
      try {
        const response = await MainService.summaryDashboard(date)
        if (response.status != 200) {
          throw new Error('Network response was not ok');
        }
        setSummary(prevSummary => {
          if (JSON.stringify(prevSummary) !== JSON.stringify(response.data)) {
            return response.data;
          }
          return prevSummary;
        });
      } catch (error) {
        // console.log(2,error)
        // setError(error);
      } 
    };
    if (date) {  
      fetchSummary(date);
    }
    
  },[date]);
  
  return (
    <EuiFlexGroup gutterSize="l" wrap responsive={true}>
      {cardsData.map((card, index) => (
        <EuiFlexItem key={index} style={{ maxWidth: '23%', flexBasis: '100%' }}>
          <EuiCard  title={""} 
           titleSize="xs">
            <EuiFlexGrid columns={2} gutterSize="m">
              <EuiFlexItem>
                <EuiText size="s" style={{ fontWeight: 'bold', fontSize: '36px', textAlign:"left", lineHeight:"1" }}>
                  {card.title}
                </EuiText>
                <EuiText  style={{ fontSize: '16px', textAlign:"left", marginTop:"15px" }}size="xs">
                  {card.description1}
                </EuiText >
                {card.description2 && (
                  <EuiText style={{  fontSize: '12px', textAlign:"left" }} size="xs" color="subdued">
                    {card.description2}
                  </EuiText>
                )}
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiImage src={card.icon} alt="icon" style={{ maxWidth: 100, marginTop: "0px"}} />
              </EuiFlexItem>
            </EuiFlexGrid>
          </EuiCard>
        </EuiFlexItem>
      ))}
    </EuiFlexGroup>
  );
};

export default CardContent;
