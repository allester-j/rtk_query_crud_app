import React, { useState, useEffect } from "react"
import { DataGrid, GridToolbar, GridRowsProp, GridColDef } from '@mui/x-data-grid'
import { useGetUsersQuery, useAddUserMutation, useUpdateUserMutation, useDeleteUserMutation } from "../api/apiSlice"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons"

const Users = () => {

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

    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery()
    const [addUser] = useAddUserMutation()
    const [updateUser] = useUpdateUserMutation()
    const [deleteUser] = useDeleteUserMutation()

    const handleSubmit = (e) => {
        e.preventDefault()

        // Add User
        addUser({
            
        })
    }

    return (
        <>
            <h1>Users</h1>
        </>
    )
}

export default Users