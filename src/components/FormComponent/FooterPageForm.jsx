import { Button } from '@fluentui/react-components'
import { SaveArrowRight24Regular, ArrowReset24Regular, SaveEdit24Regular } from '@fluentui/react-icons'
import PropTypes from 'prop-types';

export const FooterPageForm = ({ handleSubmit, buttonDisabled, buttonDraftDisabled, handleReset }) => {
  return (
    <>
     <Button
        onClick={() => handleReset()}
        icon={<ArrowReset24Regular primaryFill='#ffffff' />}
        iconPosition='after'
        size='small'
        style={{
          float: 'right',
          marginRight: '0',
          padding: '8px 1.5em',
          backgroundColor: '#ff5722',
          color: '#fff',
          fontSize: '14px'
        }}
        disabled={buttonDraftDisabled}
      >
        Clear Form
      </Button>
      <Button
        onClick={() => handleSubmit(1)}
        icon={<SaveArrowRight24Regular primaryFill='#ffffff' />}
        iconPosition='after'
        size='small'
        style={{
          float: 'right',
          marginRight: '0.8em',
          padding: '8px 1.5em',
          backgroundColor: '#035bb6',
          color: '#fff',
          fontSize: '14px'
        }}
        disabled={buttonDisabled}
      >
        Save as Validated
      </Button>
      <Button
        onClick={() => handleSubmit(2)}
        icon={<SaveEdit24Regular primaryFill='#ffffff' />}
        iconPosition='after'
        size='small'
        style={{
          float: 'right',
          marginRight: '0.6em',
          padding: '8px 1.5em',
          backgroundColor: '#2196f3',
          color: '#fff',
          fontSize: '14px'
        }}
        disabled={buttonDraftDisabled}
      >
        Save as Draft
      </Button>
    </>
  )
}

FooterPageForm.propTypes = {
  handleSubmit: PropTypes.func,
  buttonDisabled: PropTypes.bool,
  buttonDraftDisabled: PropTypes.bool,
  handleReset: PropTypes.func
}