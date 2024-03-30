import { useState, useEffect } from "react"
import PropTypes from 'prop-types'
import FallbackUI from "./FallbackUI"

const ErrorBoundary = ({children}) => {
    const [ hasError, setHasError] = useState(false)

    useEffect(() => {
        if(hasError){
            console.error('Error occured')
        }
    }, [hasError]);

    if(hasError){
        return <FallbackUI />
    }

    return children

}

export default ErrorBoundary
ErrorBoundary.propTypes = {
    children: PropTypes.any
}