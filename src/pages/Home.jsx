import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUsers, faList } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"

const Home = () => {
    return (
        <>
            <div className="container">
                <div className="row mt-5 pt-5">
                    <div className="col-md-3 offset-md-3">
                        <Link to='/todos' className="text-decoration-none">
                            <div className="card text-center">
                                <div className="card-body">
                                    <FontAwesomeIcon icon={faList} />

                                    <h3 className="mt-3">
                                        Todos
                                    </h3>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="col-md-3">
                        <Link to='/users' className="text-decoration-none">
                            <div className="card text-center">
                                <div className="card-body">
                                    <FontAwesomeIcon icon={faUsers} />

                                    <h3 className="mt-3">
                                        Users
                                    </h3>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home