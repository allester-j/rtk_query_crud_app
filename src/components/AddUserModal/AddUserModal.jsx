import React, { useState } from 'react'
import { useAddUserMutation } from '../../features/api/apiSlice'
import Swal from 'sweetalert2'

const AddUserModal = () => {

    const [newUser, setNewUser] = useState({
        name: '',
        username: '',
        email: '',
        street: '',
        suite: '',
        city: '',
        zipcode: '',
        lat: '-37.3159',
        lng: '84.8753',
        phone: '',
        website: '',
        companyName: ''
    })

    const { name, username, email, street, suite, city, zipcode, lat, lng, phone, website, companyName } = newUser

    const [addUser] = useAddUserMutation()

    const handleChange = (e) => {
        setNewUser((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // Add User
        addUser({
            name: name,
            username: username,
            email: email,
            address: {
                street: street,
                suite: suite,
                city: city,
                zipcode: zipcode,
                geo: {
                    lat: lat,
                    lng: lng
                }
            },
            phone: phone,
            website: website,
            company: {
                name: companyName
            }
        })

        Swal.fire({
            icon: 'success',
            title: 'The user has been created',
            showConfirmButton: false,
            timer: 2000
        })

        // Reset state
        setNewUser({
            name: '',
            username: '',
            email: '',
            street: '',
            suite: '',
            city: '',
            zipcode: '',
            lat: '-37.3159',
            lng: '84.8753',
            phone: '',
            website: '',
            companyName: ''
        })
    }

    return (
        <>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addUserModal">
                <div className="d-flex align-items-center">
                    <div>
                        <i className="fa-solid fa-square-plus"></i> &nbsp;
                        Add User
                    </div>
                </div>
            </button>

            <div className="modal fade" id="addUserModal" tabIndex="-1" aria-labelledby="addUserModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5">Add User</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input type="text" className="form-control" name="name" id="name" value={name} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Username</label>
                                    <input type="text" className="form-control" name="username" id="username" value={username} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input type="email" className="form-control" name="email" id="email" value={email} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Street</label>
                                    <input type="text" className="form-control" name="street" id="street" value={street} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Suite</label>
                                    <input type="text" className="form-control" name="suite" id="suite" value={suite} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">City</label>
                                    <input type="text" className="form-control" name="city" id="city" value={city} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Zipcode</label>
                                    <input type="text" className="form-control" name="zipcode" id="zipcode" value={zipcode} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Phone</label>
                                    <input type="text" className="form-control" name="phone" id="phone" value={phone} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Website</label>
                                    <input type="text" className="form-control" name="website" id="website" value={website} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Company Name</label>
                                    <input type="text" className="form-control" name="companyName" id="companyName" value={companyName} onChange={handleChange} />
                                </div>
                                <div>
                                    <button type="submit" data-bs-dismiss="modal" className="btn btn-secondary">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddUserModal