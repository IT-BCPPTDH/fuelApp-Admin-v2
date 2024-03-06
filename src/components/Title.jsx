import {Title3} from '@fluentui/react-components'
import PropTypes from 'prop-types'
const Title = (props) => {
    const {title, icon} = props
    return (
        <Title3 className='width-title'>{icon} {title ?? ''}</Title3>
    )
}

export default Title

Title.propTypes = {
    title: PropTypes.string,
    icon: PropTypes.any
}