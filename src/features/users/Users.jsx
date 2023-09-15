import React from "react"
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { useGetUsersQuery, useUpdateUserMutation, useDeleteUserMutation } from "../api/apiSlice"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import Swal from "sweetalert2"
import AddUserModal from "../../components/AddUserModal/AddUserModal"
import Navbar from "../../components/Navbar/Navbar"

const Users = () => {

    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery()
    
    const [updateUser] = useUpdateUserMutation()
    const [deleteUser] = useDeleteUserMutation()

    const handleDeleteUserBtnClick = (e, row) => {
        e.stopPropagation()

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to reverse this",
            icon: 'warning',
            showCancelButon: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#333',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteUser({ id: row.systemId })      
            }
        })
    }

    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            flex: 1
        },
        {
            field: 'name',
            headerName: 'Name',
            editable: true,
            flex: 1
        },
        {
            field: 'username',
            headerName: 'Username',
            editable: true,
            flex: 1
        },
        {
            field: 'email',
            headername: 'Email',
            editable: true,
            flex: 1
        },
        {
            field: 'street',
            headerName: 'Street',
            editable: true,
            flex: 1
        },
        {
            field: 'suite',
            headerName: 'Suite',
            editable: true,
            flex: 1
        },
        {
            field: 'city',
            headerName: 'City',
            editable: true,
            flex: 1
        },
        {
            field: 'zipcode',
            headerName: 'Zipcode',
            editable: true,
            flex: 1
        },
        {
            field: 'phone',
            headerName: 'Phone',
            editable: true,
            flex: 1
        },
        {
            field: 'website',
            headerName: 'Website',
            editable: true,
            flex: 1
        },
        {
            field: 'company',
            headerName: 'Company',
            editable: true,
            flex: 1
        },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 1,
            renderCell: (params) => {
                return (
                    <>
                        <button className="btn btn-danger" onClick={(e) => handleDeleteUserBtnClick(e, params.row)}>
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </>
                )
            }
        }
    ]

    let counter = 1
    let usersArray = []

    users?.forEach(user => {
        
        let record = {
            id: counter++,
            name: user?.name,
            username: user?.username,
            email: user?.email,
            street: user?.address?.street,
            suite: user?.address?.suite,
            city: user?.address?.city,
            zipcode: user?.address?.zipcode,
            phone: user?.phone,
            website: user?.website,
            company: user?.company?.name,
            systemId: user?.id
        }

        usersArray.push(record)
        
    });

    let content
    // Define conditional content
    if (isLoading) {
        content = <p>Loading...</p>
    } else if (isSuccess) {
        content = 
            <DataGrid 
                editMode="row" 
                rows={usersArray} 
                columns={columns} 
                slots={{ toolbar: GridToolbar }} 
                processRowUpdate={
                    async (updatedRow, originalRow) => {

                        try {

                            updateUser({
                                id: updatedRow.systemId,
                                name: updatedRow.name,
                                username: updatedRow.username,
                                email: updatedRow.email,
                                address: {
                                    street: updatedRow.street,
                                    suite: updatedRow.suite,
                                    city: updatedRow.city,
                                    zipcode: updatedRow.zipcode,
                                    geo: {
                                        lat: '-37.3159',
                                        lng: '84.8753',
                                    }
                                },
                                phone: updatedRow.phone,
                                website: updatedRow.website,
                                company: {
                                    name: updatedRow.company
                                }
                            })

                            Swal.fire({
                                icon: 'success',
                                title: 'The user has been updated',
                                showConfirmButton: false,
                                timer: 2000
                            })
                            
                        } catch (error) {

                            Swal.fire({
                                icon: 'error',
                                title: `${error.message}`,
                                showConfirmButton: false,
                                timer: 2000
                            })
                            
                        }

                    }
                }
            />
    } else if (isError) {
        content = <p>{error}</p>
    }

    return (
        <>
            <Navbar />
            <div className="container-fluid mb-5">
                <div className="row">
                    <div className="col-10">
                    <h1 className="text-primary mb-3 mt-3">Users</h1>
                    </div>
                    <div className="col-2">
                        <div className="mt-3">
                            <AddUserModal />
                        </div>
                    </div>
                </div>
                {content}
            </div>
        </>
    )
}

export default Users