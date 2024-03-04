import { CompoundButton } from '@fluentui/react-components'
import { SaveArrowRight24Regular } from '@fluentui/react-icons'
import PropTypes from 'prop-types';

export const FooterPageForm = ({ handleSubmit, buttonDisabled }) => {
    return (
      <>
        <CompoundButton
            onClick={() => handleSubmit(1)}
            icon={<SaveArrowRight24Regular primaryFill='#ffffff' />}
            iconPosition='after'
            size='small'
            style={{
              float: 'right',
              marginRight: '0',
              padding: '0 1.5em',
              backgroundColor: '#035bb6',
              color: '#fff'
            }}
            disabled={buttonDisabled}
          >
            Save & Exit Form
          </CompoundButton>
          <CompoundButton
            onClick={() => handleSubmit(2)}
            icon={<SaveArrowRight24Regular primaryFill='#ffffff' />}
            iconPosition='after'
            size='small'
            style={{
              float: 'right',
              marginRight: '0.6em',
              padding: '0 1.5em',
              backgroundColor: 'green',
              color: '#fff'
            }}
            disabled={buttonDisabled}
          >
            Save & Entry Other
          </CompoundButton>
      </>
        
    
    )
}

FooterPageForm.propTypes = {
  handleSubmit: PropTypes.any,
  buttonDisabled: PropTypes.bool
}