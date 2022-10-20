import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'

export default defineComponent({
  setup() {
    return () => (
      <>
        <div class="text-left">
          <RouterView />
        </div>
        <p class={['op-30']}>[Article layout]</p>
      </>
    )
  },
})
