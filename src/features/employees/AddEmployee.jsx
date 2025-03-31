import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Modal, Row, Col } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.min.css'
import { SimpleSelect } from '@jonathanventuri/react-simpleselect'
import { addEmployee } from './employeesSlice'
import { US_STATES } from './helpers/states'
import { DEPARTMENTS } from './helpers/departments'

export function AddEmployee() {
  const dispatch = useDispatch()
  const newEmployee = {
    firstName: '',
    lastName: '',
    birthDate: 0,
    startDate: 0,
    streetAddress: '',
    cityAddress: '',
    stateAddress: '',
    zipAddress: '',
    companyDepartment: ''
  }
  const [employee, setEmployee] = useState(newEmployee)
  const [modal, setModal] = useState(false)
  const navigate = useNavigate()

  return (
    <>
      <main>
        <Form id='addEmployeeForm' onSubmit={handleFormSubmit}>
          <h2>Create Employee</h2>
          <Row>
            <Form.Group controlId='firstName' className='mb-3'>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type='text'
                value={employee.firstName}
                onChange={handleFirstNameChange}
              />
            </Form.Group>
            <Form.Group controlId='lastName' className='mb-3'>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type='text'
                value={employee.lastName}
                onChange={handleLastNameChange}
              />
            </Form.Group>
            <Form.Group controlId='birthDate' className='mb-3'>
              <Form.Label>Birthdate</Form.Label>
              <DatePicker
                placeholderText='Click to select a date'
                dateFormat='yyyy/MM/dd'
                autoComplete='off'
                showMonthDropdown
                showYearDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={50}
                maxDate={new Date().setFullYear(new Date().getFullYear() - 14)}
                popperPlacement='bottom-start'
                showPopperArrow={false}
                showIcon
                calendarIconClassName='end-0'
                wrapperClassName='container g-0'
                customInput={<Form.Control />}
                selected={employee.birthDate}
                onChange={(date) =>
                  setEmployee({
                    ...employee,
                    birthDate: date.getTime()
                  })
                }
              />
            </Form.Group>
          </Row>

          <fieldset className='form-group border px-3 mb-3'>
            <legend className='float-none w-auto p-2'>Address</legend>
            <Row>
              <Form.Group controlId='streetAddress' className='mb-3'>
                <Form.Label>Street</Form.Label>
                <Form.Control
                  type='text'
                  value={employee.streetAddress}
                  onChange={handleStreetAddressChange}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} controlId='cityAddress' className='mb-3'>
                <Form.Label>City</Form.Label>
                <Form.Control
                  type='text'
                  value={employee.cityAddress}
                  onChange={handleCityAddressChange}
                />
              </Form.Group>
              <Form.Group as={Col} controlId='stateAddress' className='mb-3'>
                <Form.Label>State</Form.Label>
                <SimpleSelect
                  as={Form.Select}
                  aria-label='State'
                  placeholder='Select a state'
                  value={employee.stateAddress}
                  onChange={handleStateAddressChange}
                  options={US_STATES}
                />
              </Form.Group>

              <Form.Group as={Col} controlId='zipAddress' className='mb-3'>
                <Form.Label>Zip Code</Form.Label>
                <Form.Control
                  type='number'
                  value={employee.zipAddress}
                  onChange={handleZipAddressChange}
                />
              </Form.Group>
            </Row>
          </fieldset>
          <Row as='fieldset' className='form-group border px-3 mx-0 mb-3'>
            <legend className='float-none w-auto p-2'>
              Company Credentials
            </legend>
            <Form.Group as={Col} controlId='companyDepartment' className='mb-3'>
              <Form.Label>Department</Form.Label>
              <SimpleSelect
                as={Form.Select}
                aria-label='Company Department'
                placeholder='Select a department'
                value={employee.companyDepartment}
                onChange={handleCompanyDepartmentChange}
                options={DEPARTMENTS}
              />
            </Form.Group>
            <Form.Group as={Col} controlId='startDate' className='mb-3'>
              <Form.Label>Start Date</Form.Label>
              <DatePicker
                placeholderText='Click to select a date'
                dateFormat='yyyy/MM/dd'
                autoComplete='off'
                showMonthDropdown
                showYearDropdown
                todayButton={<Button>Today</Button>}
                popperPlacement='bottom-start'
                showPopperArrow={false}
                showIcon
                calendarIconClassName='end-0'
                wrapperClassName='container g-0'
                customInput={<Form.Control />}
                selected={employee.startDate}
                onChange={(date) =>
                  setEmployee({
                    ...employee,
                    startDate: date.getTime()
                  })
                }
              />
            </Form.Group>
          </Row>

          <div className='d-flex justify-content-center'>
            <Button variant='primary' type='submit' className='w-100 mt-3'>
              Add employee to the database
            </Button>
          </div>
        </Form>
      </main>

      <Modal show={modal} onHide={hideModal}>
        <Modal.Header closeButton>
          <Modal.Title>New employee added to the database</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='d-block border-bottom p-2'>Name</div>
          <p className='p-3'>
            {employee.firstName} {employee.lastName}
          </p>
          <div className='d-block border-bottom p-2'>Birth Date</div>
          <p className='p-3'>
            {new Date(employee.birthDate).toLocaleDateString()}
          </p>
          <div className='d-block border-bottom p-2'>Address</div>
          <p className='p-3'>
            {employee.streetAddress}
            <br />
            {employee.cityAddress}, {employee.stateAddress}{' '}
            {employee.zipAddress}
          </p>
          <div className='d-block border-bottom p-2'>Company Credentials</div>
          <p className='p-3'>
            Working in {employee.companyDepartment} {' since '}
            {new Date(employee.startDate).toLocaleDateString()}
          </p>
        </Modal.Body>
        <Modal.Footer className='d-flex justify-content-between'>
          <Button variant='secondary' onClick={goToList}>
            Go to employees list
          </Button>
          <Button variant='primary' onClick={hideModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )

  // Function for form submission

  function handleFormSubmit(event) {
    event.preventDefault()
    showModal()
    dispatch(addEmployee(employee))
  }

  // Functions for form field handling

  function handleFirstNameChange(event) {
    setEmployee({
      ...employee,
      firstName: event.target.value
    })
  }
  function handleLastNameChange(event) {
    setEmployee({
      ...employee,
      lastName: event.target.value
    })
  }
  function handleStreetAddressChange(event) {
    setEmployee({
      ...employee,
      streetAddress: event.target.value
    })
  }
  function handleCityAddressChange(event) {
    setEmployee({
      ...employee,
      cityAddress: event.target.value
    })
  }
  function handleStateAddressChange(event) {
    setEmployee({
      ...employee,
      stateAddress: event.target.value
    })
  }
  function handleZipAddressChange(event) {
    setEmployee({
      ...employee,
      zipAddress: event.target.value
    })
  }
  function handleCompanyDepartmentChange(event) {
    setEmployee({
      ...employee,
      companyDepartment: event.target.value
    })
  }

  // Functions for modal handling

  function showModal() {
    setModal(true)
  }
  function hideModal() {
    // Hide modal and reset HTML form
    setModal(false)
    document.getElementById('addEmployeeForm').reset()
    // Clear React controlled form by resetting the employee state back to newEmployee
    setEmployee(newEmployee)
  }
  function goToList() {
    setModal(false)
    navigate('/')
  }
}
