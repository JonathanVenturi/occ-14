import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Container, Navbar, Nav, Button } from 'react-bootstrap'

import Store from './Store.js'
import { ListEmployees } from '../features/employees/ListEmployees.jsx'
import { AddEmployee } from '../features/employees/AddEmployee.jsx'

function App() {
  return (
    <BrowserRouter>
      <Provider store={Store}>
        <Navbar sticky='top' bg='light' data-bs-theme='light' className='mb-3'>
          <Container>
            <h1>HRnet</h1>
            <Routes>
              <Route
                path='/'
                element={
                  <Nav.Link as={NavLink} to='/new'>
                    <Button>Add a new employee</Button>
                  </Nav.Link>
                }
              />
              <Route
                path='/new'
                element={
                  <Nav.Link as={NavLink} to='/'>
                    <Button>Go back to the list of employees</Button>
                  </Nav.Link>
                }
              />
            </Routes>
          </Container>
        </Navbar>
        <Container>
          <Routes>
            <Route path='/' element={<ListEmployees />} />
            <Route path='/new' element={<AddEmployee />} />
          </Routes>
        </Container>
      </Provider>
    </BrowserRouter>
  )
}

export default App
