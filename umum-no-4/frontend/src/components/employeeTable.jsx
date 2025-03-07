import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import Modal from 'react-modal'

export default function EmployeeTable() {
    const [isLoading, setIsLoading] = useState(true)
    const [isOpen, setIsOpen] = useState(false)
    const [employeeData, setEmployeeData] = useState({
        name: '',
        email: '',
        address: '',
        position: ''
    })
    const [employeeError, setEmployeeError] = useState({
        name: '',
        email: '',
        address: '',
        position: ''
    })
    const [toUpdate, setToUpdate] = useState(0)
    const [responseData, setResponseData] = useState([])
    const [responseError, setResponseError] = useState("")
    const [isUpdateModal, setIsUpdateModal] = useState(false)
    const [modalResponseError, setModalResponseError] = useState("")

    const isEmailValid = (email) => {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
        return emailPattern.test(email)
    }

    const capitalizeFirstLetter = (val) => {
        return String(val).charAt(0).toUpperCase() + String(val).slice(1)
    }

    const fetchData = async () => {
        setIsLoading(true)
        const response = await axios.get('http://localhost:3000/employees')
        if (response.status != 200) setResponseError("Error retrieving data from API")
        else {
            const data = response.data
            setResponseData(data)
        }
        setIsLoading(false)
    }

    const fetchSingleData = async (id) => {
        const response = await axios.get(`http://localhost:3000/employees/${id}`)
        if (response.status != 200) setModalResponseError("Error retrieving data from API")
        else {
            const data = response.data
            const { id, ...employeeResponse } = data
            setEmployeeData(employeeResponse)
        }
    }

    const resetInputData = () => {
        setEmployeeData({
            name: '',
            email: '',
            address: '',
            position: ''
        })
        setEmployeeError({
            name: '',
            email: '',
            address: '',
            position: ''
        })
    }

    const onCloseModal = useCallback((e) => {
        e.preventDefault()
        resetInputData()
        setIsUpdateModal(false)
        setToUpdate(0)
        setIsOpen(false)
    })

    const onInputChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        if (!value.trim()) {
            setEmployeeError({
                ...employeeError,
                [name]: `${capitalizeFirstLetter(name)} cannot be empty`
            })
        } else if (name == 'email' && !isEmailValid(value)) {
            setEmployeeError({
                ...employeeError,
                [name]: `${capitalizeFirstLetter(name)} must be a valid email address format`
            })
        } else {
            setEmployeeError({
                ...employeeError,
                [name]: ''
            })
        }
        setEmployeeData({
            ...employeeData,
            [name]: value
        })
    }

    const onSubmit = useCallback(async (e) => {
        e.preventDefault()
        if (Object.values(employeeData).filter(v => v === '').length > 0 && Object.values(employeeError).filter(v => v !== '').length > 0) {
            setModalResponseError("Please ensure form data is properly filled out first")
        } else {
            let response
            if (isUpdateModal) {
                response = await axios.put(`http://localhost:3000/employees/${toUpdate}`, employeeData)

            } else {
                response = await axios.post('http://localhost:3000/employees/', employeeData)
            }
            if (response.status != 200) setModalResponseError("Error submitting data to API")
            else {
                resetInputData()
                setIsUpdateModal(false)
                setToUpdate(0)
                fetchData()
                setIsOpen(false)
            }
        }
    })

    const onClickUpdate = (id) => {
        setIsUpdateModal(true)
        fetchSingleData(id)
        setToUpdate(id)
        setIsOpen(true)
    }

    const onClickCreate = () => {
        setIsUpdateModal(false)
        setToUpdate(0)
        setIsOpen(true)
    }

    const onClickDelete = async (id) => {
        const response = await axios.delete(`http://localhost:3000/employees/${id}`)
        if (response.status != 200) setResponseError("Error deleting row")
        else fetchData()
    }

    const onRefresh = useCallback(() => {
        fetchData()
    })

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            {isLoading && <h2>{"Now Loading..."}</h2>}
            {responseError && <p>{responseError}</p>}
            {responseData.length > 0 && <div>
                <Modal
                    isOpen={isOpen}
                    onRequestClose={onCloseModal}
                    contentLabel='Employee Form'
                >
                    <h2>{isUpdateModal ? "Update Employee" : "Create Employee"}</h2>
                    {modalResponseError && <div>{modalResponseError}</div>}
                    <form onSubmit={onSubmit}>
                        <div className='form-group'>
                            <label>Name</label>
                            <input
                                type='text'
                                name='name'
                                value={employeeData.name}
                                onChange={onInputChange}
                            />
                            {employeeError.name && <small className='form-text text-muted'>{employeeError.name}</small>}
                        </div>
                        <div className='form-group'>
                            <label>Email</label>
                            <input
                                type='email'
                                name='email'
                                value={employeeData.email}
                                onChange={onInputChange}
                            />
                            {employeeError.email && <small className='form-text text-muted'>{employeeError.email}</small>}
                        </div>
                        <div className='form-group'>
                            <label>Address</label>
                            <input
                                type='text'
                                name='address'
                                value={employeeData.address}
                                onChange={onInputChange}
                            />
                            {employeeError.address && <small className='form-text text-muted'>{employeeError.address}</small>}
                        </div>
                        <div className='form-group'>
                            <label>Position</label>
                            <input
                                type='text'
                                name='position'
                                value={employeeData.position}
                                onChange={onInputChange}
                            />
                            {employeeError.position && <small className='form-text text-muted'>{employeeError.position}</small>}
                        </div>
                        <button
                            type='submit'
                            className='btn btn-primary'
                        >
                            Submit
                        </button>
                        <button
                            className='btn btn-danger'
                            onClick={(e) => onCloseModal(e)}
                        >
                            Cancel
                        </button>
                    </form>
                </Modal>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Position</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {responseData.map((employee) => (
                            <tr>
                                <td>{employee.id}</td>
                                <td>{employee.name}</td>
                                <td>{employee.email}</td>
                                <td>{employee.address}</td>
                                <td>{employee.position}</td>
                                <td>
                                    <button
                                        className='btn btn-primary'
                                        onClick={() => onClickUpdate(employee.id)}
                                    >
                                        Update
                                    </button>
                                    <button
                                        className='btn btn-danger'
                                        onClick={() => onClickDelete(employee.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button
                    className='btn btn-primary'
                    onClick={() => onClickCreate()}
                >
                    Create
                </button>
                <button
                    className='btn btn-primary'
                    onClick={() => onRefresh()}
                >
                    Refresh
                </button>
            </div>
            }
        </>
    )
}