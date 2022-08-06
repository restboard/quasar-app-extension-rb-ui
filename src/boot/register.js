import RbResourceCollection from '../components/RbResourceCollection.vue'
import RbResourceInstance from '../components/RbResourceInstance.vue'
import RbContainer from '../components/RbContainer.vue'
import RbActionMenu from '../components/RbActionMenu.vue'
import RbColumnAutoFilter from '../components/RbColumnAutoFilter.vue'
import RbDataTable from '../components/RbDataTable.vue'
import RbPivotDataTable from '../components/RbPivotDataTable.vue'
import RbDataGrid from '../components/RbDataGrid.vue'
import RbDataCard from '../components/RbDataCard.vue'
import RbEmptyBanner from '../components/RbEmptyBanner.vue'
import RbUserArea from '../components/RbUserArea.vue'
import RbUserMenu from '../components/RbUserMenu.vue'
import RbToolbar from '../components/RbToolbar.vue'
import RbSidebar from '../components/RbSidebar.vue'
import RbFormWrapper from '../components/RbFormWrapper.vue'
import RbResourceCard from '../components/RbResourceCard.vue'
import RbMedia from '../components/RbMedia.vue'
import RbUploadArea from '../components/RbUploadArea.vue'
import RbSelect from '../components/RbSelect.vue'
import RbResourceSelect from '../components/RbResourceSelect.vue'

export default ({ app }) => {
  app.component(RbResourceCollection.name, RbResourceCollection)
  app.component(RbResourceInstance.name, RbResourceInstance)
  app.component(RbContainer.name, RbContainer)
  app.component(RbActionMenu.name, RbActionMenu)
  app.component(RbColumnAutoFilter.name, RbColumnAutoFilter)
  app.component(RbDataTable.name, RbDataTable)
  app.component(RbPivotDataTable.name, RbPivotDataTable)
  app.component(RbDataGrid.name, RbDataGrid)
  app.component(RbDataCard.name, RbDataCard)
  app.component(RbEmptyBanner.name, RbEmptyBanner)
  app.component(RbUserArea.name, RbUserArea)
  app.component(RbUserMenu.name, RbUserMenu)
  app.component(RbToolbar.name, RbToolbar)
  app.component(RbSidebar.name, RbSidebar)
  app.component(RbFormWrapper.name, RbFormWrapper)
  app.component(RbResourceCard.name, RbResourceCard)
  app.component(RbMedia.name, RbMedia)
  app.component(RbUploadArea.name, RbUploadArea)
  app.component(RbSelect.name, RbSelect)
  app.component(RbResourceSelect.name, RbResourceSelect)
}
