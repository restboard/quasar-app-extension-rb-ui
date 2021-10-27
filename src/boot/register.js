import RbContainer from '../components/RbContainer.vue'
import RbActionMenu from '../components/RbActionMenu.vue'
import RbColumnAutoFilter from '../components/RbColumnAutoFilter.vue'
import RbDataTable from '../components/RbDataTable.vue'
import RbResourceLink from '../components/RbResourceLink.vue'
import RbUserMenu from '../components/RbUserMenu.vue'
import RbToolbar from '../components/RbToolbar.vue'
import RbSidebar from '../components/RbSidebar.vue'
import RbFormWrapper from '../components/RbFormWrapper.vue'
import RbMainLayout from '../layouts/RbMainLayout.vue'
import RbMasterDetailPage from '../pages/RbMasterDetailPage.vue'
import RbResourceTablePage from '../pages/RbResourceTablePage.vue'

export default ({ app }) => {
  app.component(RbContainer.name, RbContainer)
  app.component(RbActionMenu.name, RbActionMenu)
  app.component(RbColumnAutoFilter.name, RbColumnAutoFilter)
  app.component(RbDataTable.name, RbDataTable)
  app.component(RbResourceLink.name, RbResourceLink)
  app.component(RbUserMenu.name, RbUserMenu)
  app.component(RbToolbar.name, RbToolbar)
  app.component(RbSidebar.name, RbSidebar)
  app.component(RbFormWrapper.name, RbFormWrapper)
  app.component(RbMainLayout.name, RbMainLayout)
  app.component(RbMasterDetailPage.name, RbMasterDetailPage)
  app.component(RbResourceTablePage.name, RbResourceTablePage)
}
