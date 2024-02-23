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
      
      <Button
        icon={<ArrowCircleLeft24Regular />}
        iconPosition='before'
        style={{ backgroundColor: '#69797e', color: '#ffffff' }}
        onClick={handleClick}
      >
        Back
      </Button>
      <Title title={title} />
      <Button
        icon={<ArrowCircleLeft24Regular />}
        iconPosition='before'
        style={{ backgroundColor: '#107c10', color: '#ffffff' }}
        onClick={handleClick}
      >
        New Data Entry
      </Button>

      
    </div>
  )
}
