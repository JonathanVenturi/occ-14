function employeesHydration() {
  if (localStorage.getItem('employees') !== null) {
    const employees = JSON.parse(localStorage.getItem('employees'))
    return { employees }
  }
}
export default employeesHydration
