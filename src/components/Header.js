import PropTypes from 'prop-types'
import Button from './Button'
// check the current location(url) to whether display the add button or not
import { useLocation } from 'react-router-dom'




const Header = ({ title, onAdd, showAdd }) => {

    const location = useLocation()

    return (
        <header className="header">
            <h1>{title}</h1>
            {/* if url is /, then show the button */}
            {location.pathname ==='/' && <Button color={showAdd ? 'red' : 'green'} text={showAdd ? 'Close' : 'Add'} onClick={onAdd} />}
        </header>
    )
}

Header.defaultProps ={
    title: 'Task Tracker'
}

// validate variable title beforehand
Header.propTypes ={
    title: PropTypes.string.isRequired,
}

export default Header
