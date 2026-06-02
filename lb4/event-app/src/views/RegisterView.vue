<template>
  <main class="page">
    <RouterLink :to="event ? `/events/${event.id}` : '/'" class="back-link">
      ← Назад
    </RouterLink>

    <section v-if="event" class="register-page">
      <div>
        <h1>{{ event.title }}</h1>
        <p class="event-card__date">{{ event.date }}</p>
        <p>{{ event.description }}</p>
      </div>

      <form class="form" @submit.prevent="submitForm">
        <h2>Реєстрація</h2>
        <p>Заповніть форму для реєстрації на подію</p>

        <input
          v-model="form.name"
          type="text"
          placeholder="Ваше ім’я"
        />

        <input
          v-model="form.email"
          type="email"
          placeholder="Email"
        />

        <p v-if="validationError" class="error-text">
          {{ validationError }}
        </p>

        <p v-if="error" class="error-text">
          {{ error }}
        </p>

        <button class="btn btn-primary btn-wide" :disabled="isLoading">
          {{ isLoading ? 'Реєстрація...' : 'Зареєструватися' }}
        </button>
      </form>
    </section>

    <p v-else class="empty-text">
      Подію не знайдено
    </p>

    <Teleport to="body">
      <div v-if="successMessage" class="toast">
        {{ successMessage }}
      </div>
    </Teleport>
  </main>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useEvents } from '../composables/useEvents'
import { useRegistrations } from '../composables/useRegistrations'

const route = useRoute()
const router = useRouter()

const { getEventById } = useEvents()
const event = getEventById(route.params.id)

const { isLoading, error, successMessage, registerUser } = useRegistrations()

const validationError = ref('')

const form = reactive({
  name: '',
  email: '',
})

function validateForm() {
  if (!form.name.trim()) {
    return 'Введіть ім’я'
  }

  if (!form.email.trim()) {
    return 'Введіть email'
  }

  if (!form.email.includes('@')) {
    return 'Email має бути коректним'
  }

  return ''
}

async function submitForm() {
  validationError.value = validateForm()

  if (validationError.value) {
    return
  }

  try {
    await registerUser(event.id, form)

    form.name = ''
    form.email = ''

    setTimeout(() => {
      router.push(`/events/${event.id}`)
    }, 1200)
  } catch {
    console.log('Registration failed')
  }
}
</script>