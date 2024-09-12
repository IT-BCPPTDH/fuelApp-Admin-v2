import React, { useEffect, useState } from 'react';
import { EuiCard, EuiFlexGrid, EuiFlexGroup, EuiFlexItem, EuiImage, EuiText } from '@elastic/eui';
import Icon1 from "../../images/icon1.png";
import requestService from '../../services/requestQuota';

const CardContentQouta = () => {
  const [total, setTotal] = useState(0)
  const date = JSON.parse(localStorage.getItem('formattedDatesReq'));

  const cardsData = [
    { title: total.totalQuota ? total.totalQuota+' Ltrs' : '0 Ltrs', description1: 'Total All Request', description2: total.totalAllUnit ? total.totalAllUnit+' Unit' : '0 Unit', icon: Icon1 },
    { title: total.totalDay ? total.totalDay+' Ltrs' : '0 Ltrs', description1: 'Total Request Day Shift', description2: total.totalDay ? total.totalDay+' Unit' : '0 Unit', icon: Icon1 },
    { title: total.totalNight ? total.totalNight+' Ltrs' : '0 Ltrs', description1: 'Total Request Nigth Shift', description2: total.totalNight ? total.totalNight+' Unit' : '0 Unit', icon: Icon1 },
  ];

  useEffect(() => {
    const fetchSummary = async (date) => {
      try {
        const response = await requestService.summaryRequest(`${date}`)
        if (response.status != 200) {
          throw new Error('Network response was not ok');
        }
        setTotal(response.data);
      } catch (error) {
        console.log(error)
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
        <EuiFlexItem key={index} style={{ maxWidth: '32%', flexBasis: '100%' }}>
          <EuiCard titleSize="xs">
            <EuiFlexGrid columns={2} gutterSize="m">
              <EuiFlexItem>
                <EuiText size="s" style={{ fontWeight: 'bold', fontSize: '36px', textAlign:"left" }}>
                  {card.title}
                </EuiText>
                <EuiText  style={{ fontSize: '16px', textAlign:"left", marginTop:"20px" }}size="xs">
                  {card.description1}
                </EuiText >
                {card.description2 && (
                  <EuiText style={{  fontSize: '12px', textAlign:"left", marginTop:"10px" }} size="xs" color="subdued">
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
