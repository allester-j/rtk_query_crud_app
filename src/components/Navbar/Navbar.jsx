import React from 'react'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav class="navbar bg-body-tertiary">
            <div class="container-fluid">
                <Link className="navbar-brand text-primary" to='/'>
                    <FontAwesomeIcon icon={faHome} /> Home
                </Link>
            </div>
        </nav>
    )
}

export default Navbar