import {Title3} from '@fluentui/react-components'
import PropTypes from 'prop-types'
const Title = (props) => {
    const {title} = props
    return (
        <Title3>{title}</Title3>
    )
}

export default Title

Title.propTypes = {
    title: PropTypes.string
}