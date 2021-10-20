import RbActionMenu from '../components/RbActionMenu.vue'
import RbColumnAutoFilter from '../components/RbColumnAutoFilter.vue'
import RbDataTable from '../components/RbDataTable.vue'
import RbResourceLink from '../components/RbResourceLink.vue'
import RbSidebar from '../components/RbSidebar.vue'
import RbFormWrapper from '../components/RbFormWrapper.vue'

export default ({ app }) => {
  app.component(RbActionMenu.name, RbActionMenu)
  app.component(RbColumnAutoFilter.name, RbColumnAutoFilter)
  app.component(RbDataTable.name, RbDataTable)
  app.component(RbResourceLink.name, RbResourceLink)
  app.component(RbSidebar.name, RbSidebar)
  app.component(RbFormWrapper.name, RbFormWrapper)
}