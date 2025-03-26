import { configureStore } from '@reduxjs/toolkit'
import employeesHydration from '../features/employees/employeesHydration'
import employeesReducer from '../features/employees/employeesSlice'
import employeesMiddleware from '../features/employees/employeesMiddleware'

export default configureStore({
  preloadedState: employeesHydration(),
  reducer: {
    employees: employeesReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(employeesMiddleware)
})
