import { useState, useMemo, useCallback, useRef } from 'react'
import { useSelector } from 'react-redux'
import { Form, Row } from 'react-bootstrap'
import { AgGridReact } from 'ag-grid-react'
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'
ModuleRegistry.registerModules([AllCommunityModule])

export function ListEmployees() {
  const employees = useSelector((state) => state.employees)

  const gridRef = useRef()

  const defaultColDef = useMemo(() => {
    return {
      resizable: true,
      wrapText: true,
      autoHeight: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      flex: 1
    }
  }, [])

  const [colDefs /*, setColDefs*/] = useState([
    { field: 'firstName' },
    { field: 'lastName' },
    {
      field: 'birthDate',
      valueFormatter: DateFormatter,
      getQuickFilterText: DateFormatter
    },
    {
      field: 'startDate',
      valueFormatter: DateFormatter,
      getQuickFilterText: DateFormatter
    },
    { field: 'streetAddress' },
    { field: 'cityAddress' },
    { field: 'stateAddress' },
    { field: 'zipAddress' },
    { field: 'companyDepartment' }
  ])

  const tableHeaders = [
    'First Name',
    'Last Name',
    'Birthdate',
    'Start Date',
    'City',
    'Street',
    'State',
    'Zip Code',
    'Department'
  ]

  const handleSearch = useCallback(() => {
    gridRef.current.api.setGridOption(
      'quickFilterText',
      document.getElementById('searchField').value
    )
  }, [])

  return (
    <Row as='main'>
      <h2>List of current employees</h2>

      <Form.Group controlId='searchField' className='mb-3'>
        <Form.Label>Search </Form.Label>
        <Form.Control type='text' onChange={handleSearch} />
      </Form.Group>

      <div style={{ height: '600px' }}>
        <AgGridReact
          ref={gridRef}
          defaultColDef={defaultColDef}
          columnDefs={colDefs}
          rowData={employees}
          pagination={true}
        />
      </div>
    </Row>
  )

  function DateFormatter(data) {
    return data.value ? new Date(data.value).toLocaleDateString() : ''
  }
}
