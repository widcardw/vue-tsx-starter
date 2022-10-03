import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'

export default defineComponent({
  setup() {
    return () => (
      <>
        <RouterView />
        <p class={['op-30']}>[Home layout]</p>
      </>
    )
  },
})
