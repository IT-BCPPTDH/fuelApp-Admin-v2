import { CompoundButton } from '@fluentui/react-components'
import { SaveArrowRight24Regular } from '@fluentui/react-icons'
import PropTypes from 'prop-types';

export const FooterPageForm = ({ handleSubmit, buttonDisabled, buttonDraftDisabled }) => {
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
        Save as Validated
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
          backgroundColor: '#2196f3',
          color: '#fff'
        }}
        disabled={buttonDraftDisabled}
      >
        Save as Draft
      </CompoundButton>
    </>
  )
}

FooterPageForm.propTypes = {
  handleSubmit: PropTypes.any,
  buttonDisabled: PropTypes.bool,
  buttonDraftDisabled: PropTypes.bool
}