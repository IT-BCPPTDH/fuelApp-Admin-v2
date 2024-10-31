import React from 'react';
import {
  EuiCard,
  EuiFlexGrid,
  EuiFlexGroup,
  EuiFlexItem,
  EuiImage,
  EuiText,
} from '@elastic/eui';

const CardContentData = ({ cardsData }) => {
  return (
    <EuiFlexGroup gutterSize="l" wrap responsive={true}>
      {cardsData.map((card, index) => (
        <EuiFlexItem key={index} style={{ maxWidth: card.maxWidth || '32%', flexBasis: '100%' }}>
          <EuiCard title = {""} titleSize={card.titleSize || 'xs'} paddingSize={card.paddingSize || 'm'}>
            <EuiFlexGrid columns={2} gutterSize={card.gutterSize || 'm'}>
              <EuiFlexItem>
                <EuiText
                  size={card.titleSize || 's'}
                  style={{
                    fontWeight: card.titleFontWeight || 'bold',
                    fontSize: card.titleFontSize || '36px',
                    textAlign: card.textAlign || 'left',
                    lineHeight: card.lineHeight || 1
                  }}
                >
                  {card.title}
                </EuiText>
                <EuiText
                  style={{
                    fontSize: card.description1FontSize || '16px',
                    textAlign: card.textAlign || 'left',
                    marginTop: card.marginTop || '15px',
                  }}
                  size={card.textSize || 'xs'}
                >
                  {card.description1}
                </EuiText>
                {card.description2 && (
                  <EuiText
                    style={{
                      fontSize: card.description2FontSize || '12px',
                      textAlign: card.textAlign || 'left',
                    }}
                    size={card.textSize || 'xs'}
                    color="subdued"
                  >
                    {card.description2}
                  </EuiText>
                )}
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiImage
                  src={card.icon}
                  alt={card.iconAlt || 'icon'}
                  style={{
                    maxWidth: card.iconMaxWidth || 100,
                    marginTop: card.iconMarginTop || '0px',
                  }}
                />
              </EuiFlexItem>
            </EuiFlexGrid>
          </EuiCard>
        </EuiFlexItem>
      ))}
    </EuiFlexGroup>
  );
};

export default CardContentData;
