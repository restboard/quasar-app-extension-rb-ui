import RbDataTable from '../components/RbDataTable.vue'

export default ({ app }) => {
  // we globally register our component in the app
  app.component(RbDataTable.name, RbDataTable)
}