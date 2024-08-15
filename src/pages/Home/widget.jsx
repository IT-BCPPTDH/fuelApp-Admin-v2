import React from 'react';
import { EuiCard, EuiFlexGrid, EuiFlexGroup, EuiFlexItem, EuiImage, EuiText } from '@elastic/eui';
import Icon1 from "../../images/icon1.png";
import Icon2 from "../../images/chart.png";
import Icon3 from "../../images/circle.png";
import Icon4 from "../../images/icon4.png";

const CardContent = () => {
  const cardsData = [
    { title: '119,271 Ltrs', description1: 'Previous Close Sonding', description2: 'Total close sonding', icon: Icon1 },
    { title: '119,271 Ltrs', description1: 'Open Stock (Sonding)', description2: 'Summary Open Sonding', icon: Icon1 },
    { title: '119,271 Ltrs', description1: 'Receipt KPC', description2: 'Summary Receipt KPC', icon: Icon1 },
    { title: '227,778', description1: 'Issued Transaction', description2: 'Summary Issued', icon: Icon2 },
    { title: '277,557', description1: 'Transfer Transaction', description2: 'Summary Transaction', icon: Icon2 },
    { title: '128,039', description1: 'Close Data', description2: 'Total Close Data ', icon: Icon2 },
    { title: '128,706', description1: 'Close Sonding', description2: 'Total Close Sonding ', icon: Icon3 },
    { title: '277,557', description1: 'Variant', description2: 'Summary Transaction', icon: Icon3 },
    { title: '128,039', description1: 'Intershift O/C Variance', description2: 'Total Intershift (N to D)', icon: Icon3 },
    { title: '0', description1: 'Total Intershift (N to D)', description2: 'Total close sonding ', icon: Icon4 },
  ];
  return (
    <EuiFlexGroup gutterSize="l" wrap responsive={true}>
      {cardsData.map((card, index) => (
        <EuiFlexItem key={index} style={{ maxWidth: '32%', flexBasis: '100%' }}>
          <EuiCard titleSize="xs">
            <EuiFlexGrid columns={2} gutterSize="m">
              <EuiFlexItem>
                <EuiText size="s" style={{ fontWeight: 'bold', fontSize: '36px', textAlign:"left" }}>
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
