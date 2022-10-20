import { computed, defineComponent } from 'vue'
import './App.css'
import { RouterView } from 'vue-router'
import { useHead } from '@vueuse/head'
import { isDark } from './composables'
import ToggleDark from '~/components/ToggleDark'

export default defineComponent({
  setup() {
    useHead({
      title: 'vue tsx starter',
      meta: [
        { name: 'description', content: 'A light weight vue tsx starter template' },
        {
          name: 'theme-color',
          content: computed(() => isDark.value ? '#00aba9' : '#ffffff'),
        },
      ],
    })
    return () => (
      <>
        <main
          class={[
            'font-sans',
            'text-center',
            'mx-a max-w-45rem',
            'px-4 py-10',
            'text-gray-700',
            'dark:text-gray-200',
          ]}
        >
          <RouterView />
          <div class="text-center">
            <ToggleDark />
          </div>
        </main>
      </>
    )
  },
})
