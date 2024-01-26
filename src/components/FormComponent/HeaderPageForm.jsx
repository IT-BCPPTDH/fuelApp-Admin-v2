import Title from '../Title'
import { Button } from '@fluentui/react-components'
import { ArrowCircleLeft24Regular } from '@fluentui/react-icons'
import { useNavigate } from 'react-router-dom'
export const HeaderPageForm = ({ title }) => {
    const navigate = useNavigate()

    const handleClick = () =>{
        navigate('/')
    }
  return (
    <div className='flex-space-between'>
      <Title title={title} />
      <Button
        icon={<ArrowCircleLeft24Regular />}
        iconPosition='before'
        style={{ backgroundColor: '#607d8b', color: '#ffffff' }}
        onClick={handleClick}
      >
        Cancel Entry
      </Button>
    </div>
  )
}
