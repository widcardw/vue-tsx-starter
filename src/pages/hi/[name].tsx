import { defineComponent, watchEffect } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import Counter from '~/components/Counter'
import { useUserStore } from '~/store/user'

export default defineComponent({
  props: {
    name: String,
  },
  setup(props) {
    const router = useRouter()
    const user = useUserStore()
    watchEffect(() => {
      user.setNewName(props.name || 'default user')
    })
    return () => (
      <>
        <p>Hi, {props.name}!</p>
        <div class="m-3">
          <Counter class="btn" />
        </div>
        {user.otherNames.length
          ? (
            <p class="text-sm mt-4">
              <span class="op-75">Also known as</span>
              <ul class="p-0">
                {
                user.otherNames.map(n => (
                  <li key={n} class="list-none">
                    <RouterLink to={`/hi/${n}`} replace>
                      {n}
                    </RouterLink>
                  </li>
                ))
              }
              </ul>
            </p>)
          : ''}
        <div>
          <button
            class="btn m-3 text-sm"
            onClick={() => router.back()}
          >
            Back
          </button>
        </div>
      </>
    )
  },
})
