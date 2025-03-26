import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit'
import { addEmployee } from './employeesSlice'

const employeesMiddleware = createListenerMiddleware()
employeesMiddleware.startListening({
  matcher: isAnyOf(addEmployee),
  effect: (action, listenerApi) => {
    localStorage.setItem(
      'employees',
      JSON.stringify(listenerApi.getState().employees)
    )
  }
})
export default employeesMiddleware.middleware
