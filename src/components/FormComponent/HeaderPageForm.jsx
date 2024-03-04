import { useCallback, useEffect } from 'react'
import Title from '../Title'
import { Button } from '@fluentui/react-components'
import { ArrowCircleLeft24Regular, Add24Filled } from '@fluentui/react-icons'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types';

export const HeaderPageForm = ({ title, urlCreate, urlBack, childrenMenu, icon }) => {
  const navigate = useNavigate()

  const handleClick = useCallback((url) => {
    navigate(url)
  }, [navigate])

  useEffect(() => {
    document.title = title
  }, [title]);

  return (
    <div className='flex-space-between mb2em'>
      <Button
        icon={<ArrowCircleLeft24Regular />}
        iconPosition='before'
        style={{ backgroundColor: '#69797e', color: '#ffffff' }}
        onClick={() => handleClick(urlBack)}
      >
        Back
      </Button>
      {childrenMenu ? <div className='left--15em'>{childrenMenu}</div> : <></>}
      <Title title={title} icon={icon} />
      {urlCreate ? <Button
        icon={<Add24Filled />}
        iconPosition='before'
        style={{ backgroundColor: '#107c10', color: '#ffffff' }}
        onClick={() => handleClick(urlCreate)}
      >
        New Data Entry
      </Button> : <></>}
    </div>
  )
}

HeaderPageForm.propTypes = {
  title: PropTypes.string,
  urlCreate: PropTypes.string,
  urlBack: PropTypes.string,
  childrenMenu: PropTypes.any,
  icon: PropTypes.any
}
