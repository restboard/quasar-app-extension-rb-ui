<template>
  <q-layout
    class="bg-grey-2"
    :view="view"
  >
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

          <template>
            <slot
              name="toolbar:icons"
              v-bind="$props"
            >
            </slot>

            <slot
              name="toolbar:userarea"
              v-bind="$props"
            >
              <div
                class="q-ml-sm"
                v-if="showIdentity && $q.screen.gt.sm"
              >
                {{ userIdentity }}
              </div>
              <q-btn
                class="q-ml-sm"
                flat
                round
                dense
                icon="account_circle"
              >
                <slot
                  name="toolbar:userarea:menu"
                  v-bind="$props"
                >
                  <rb-user-menu
                    :avatar="userAvatar"
                    :identity="userIdentity"
                    :tenantIdentity="tenantIdentity"
                  />
                </slot>
              </q-btn>
            </slot>
          </template>
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
import RbUserMenu from '../components/RbUserMenu.vue'

export default defineComponent({
  name: 'RbMainLayout',

  components: {
    RbToolbar,
    RbUserMenu
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
      type: Boolean
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
