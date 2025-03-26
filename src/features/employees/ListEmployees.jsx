import { useState, useCallback, useRef } from 'react'
import { useSelector } from 'react-redux'
import { Form, InputGroup } from 'react-bootstrap'
// AG-GRID MODULES IMPORTS
import { AgGridReact } from 'ag-grid-react'
import {
  ModuleRegistry,
  RowAutoHeightModule,
  PaginationModule,
  CellStyleModule,
  QuickFilterModule,
  ClientSideRowModelModule,
  themeQuartz
} from 'ag-grid-community'
ModuleRegistry.registerModules([
  RowAutoHeightModule,
  PaginationModule,
  CellStyleModule,
  QuickFilterModule,
  ClientSideRowModelModule
])

export function ListEmployees() {
  const employees = useSelector((state) => state.employees)

  const gridRef = useRef()

  const gridOptions = {
    domLayout: 'autoHeight',
    suppressMovableColumns: true,
    theme: themeQuartz.withParams({
      spacing: 6,
      headerColumnBorder: true
    }),
    pagination: true,
    paginationPageSize: 10,
    paginationPageSizeSelector: [10, 25, 50, 100],
    defaultColDef: {
      resizable: false,
      wrapText: true,
      autoHeight: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      flex: 1
    }
  }

  const [colDefs /*, setColDefs*/] = useState([
    {
      headerName: 'Personal Information',
      children: [
        {
          headerName: 'Name',
          columnGroupShow: 'closed',
          flex: 2,
          valueGetter: (p) => p.data.firstName + ' ' + p.data.lastName
        },
        { field: 'firstName', columnGroupShow: 'open' },
        { field: 'lastName', columnGroupShow: 'open' },
        {
          field: 'birthDate',
          valueFormatter: DateFormatter,
          getQuickFilterText: DateFormatter
        }
      ]
    },
    {
      headerName: 'Address',
      children: [
        {
          headerName: 'Full Address',
          columnGroupShow: 'closed',
          flex: 4,
          cellStyle: { 'white-space': 'pre' },
          valueGetter: (p) =>
            p.data.streetAddress +
            '\n' +
            p.data.cityAddress +
            ', ' +
            p.data.stateAddress +
            ' ' +
            p.data.zipAddress
        },
        { field: 'streetAddress', columnGroupShow: 'open' },
        { field: 'cityAddress', columnGroupShow: 'open' },
        { field: 'stateAddress', columnGroupShow: 'open' },
        { field: 'zipAddress', columnGroupShow: 'open' }
      ]
    },
    {
      headerName: 'Company Affiliation',
      children: [
        {
          headerName: 'Status',
          columnGroupShow: 'closed',
          flex: 2,
          valueGetter: (p) =>
            p.data.companyDepartment +
            ' since ' +
            (p.data.startDate
              ? new Date(p.data.startDate).toLocaleDateString()
              : '')
        },
        { field: 'companyDepartment', columnGroupShow: 'open' },
        {
          field: 'startDate',
          columnGroupShow: 'open',
          valueFormatter: DateFormatter,
          getQuickFilterText: DateFormatter
        }
      ]
    }
  ])

  const handleSearch = useCallback(() => {
    gridRef.current.api.setGridOption(
      'quickFilterText',
      document.getElementById('searchField').value
    )
  }, [])

  return (
    <main className='mb-5'>
      <h2>List of current employees</h2>
      <InputGroup className='mb-3 w-50'>
        <InputGroup.Text id='searchLabel'>Search</InputGroup.Text>
        <Form.Control
          id='searchField'
          type='text'
          aria-labelledby='searchLabel'
          onChange={handleSearch}
        />
      </InputGroup>
      <AgGridReact
        ref={gridRef}
        gridOptions={gridOptions}
        columnDefs={colDefs}
        rowData={employees}
      />
    </main>
  )

  function DateFormatter(data) {
    return data.value ? new Date(data.value).toLocaleDateString() : ''
  }
}
