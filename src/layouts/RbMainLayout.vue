<template>
  <q-layout :view="view">
    <q-header elevated>
      <slot
        name="toolbar"
        v-bind="$props"
      >
        <rb-toolbar
          :is-menu-open="leftDrawerOpen"
          :title="title"
          @toggle-menu="toggleLeftDrawer"
        >
          <template v-slot:left>
            <slot
              name="toolbar:left"
              v-bind="$props"
            >
            </slot>
          </template>

          <div>
            <slot
              name="toolbar:icons"
              v-bind="$props"
            >
            </slot>

            <slot
              name="toolbar:userarea"
              v-bind="$props"
            >
              <rb-user-area
                :show-identity="showIdentity && $q.screen.gt.sm"
                :user-avatar="userAvatar"
                :user-identity="userIdentity"
                :tenant-identity="tenantIdentity"
                @profile="evt => $emit(evt)"
                @logout="evt => $emit(evt)"
              >
                <template v-slot:menu>
                  <slot
                    name="toolbar:userarea:menu"
                    v-bind="$props"
                  >
                  </slot>
                </template>
              </rb-user-area>
            </slot>
          </div>
        </rb-toolbar>
      </slot>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :mini="miniSidebar"
    >
      <slot
        name="sidebar"
        v-bind="$props"
        :resources="resources"
      >
        <rb-sidebar :resources="resources" />
      </slot>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import RbToolbar from '../components/RbToolbar.vue'
import RbUserArea from '../components/RbUserArea.vue'

export default defineComponent({
  name: 'RbMainLayout',

  components: {
    RbToolbar,
    RbUserArea
  },

  props: {
    view: {
      type: String,
      default: 'hHh Lpr lFf'
    },
    title: {
      type: String,
      default: 'Restboard'
    },
    showIdentity: {
      type: Boolean,
      default: true
    },
    userAvatar: {
      type: String
    },
    userIdentity: {
      type: String
    },
    tenantIdentity: {
      type: String
    },
    miniSidebar: {
      type: Boolean
    }
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  },

  computed: {
    resources () {
      return this.$rb.getAllResources()
    }
  }
})
</script>
