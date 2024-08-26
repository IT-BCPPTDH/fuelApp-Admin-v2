import React from 'react';
import { EuiCard, EuiFlexGrid, EuiFlexGroup, EuiFlexItem, EuiImage, EuiText } from '@elastic/eui';
import Icon1 from "../../images/icon1.png";
import Icon2 from "../../images/chart.png";
import Icon3 from "../../images/circle.png";
import Icon4 from "../../images/icon4.png";

const CardContentQouta = () => {
  const cardsData = [
    { title: '119,271 Ltrs', description1: 'Previous Close Sonding', description2: 'Total close sonding', icon: Icon1 },
    { title: '119,271 Ltrs', description1: 'Open Stock (Sonding)', description2: 'Summary Open Sonding', icon: Icon1 },

  ];
  return (
    <EuiFlexGroup gutterSize="l" wrap responsive={true}>
      {cardsData.map((card, index) => (
        <EuiFlexItem key={index} style={{ maxWidth: '49%', flexBasis: '100%' }}>
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

export default CardContentQouta;
