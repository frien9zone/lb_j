<template>
  <main class="page">
    <RouterLink to="/" class="back-link">
      ← Назад
    </RouterLink>

    <section v-if="event" class="details">
      <div class="details__image">
        <h2>{{ event.title }}</h2>
        <p>{{ event.shortDescription }}</p>
      </div>

      <div class="details__content">
        <span class="event-card__badge">
          {{ event.type }}
        </span>

        <h1>{{ event.title }}</h1>

        <p class="event-card__date">
          {{ event.date }}
        </p>

        <p class="details__description">
          {{ event.description }}
        </p>

        <RouterLink :to="`/events/${event.id}/register`" class="btn btn-primary btn-wide">
          Зареєструватися
        </RouterLink>
      </div>
    </section>

    <section v-if="event" class="registrations-block">
      <h2>Зареєстровані учасники</h2>

      <p v-if="eventRegistrations.length === 0" class="empty-text">
        Поки що немає зареєстрованих користувачів на цю подію.
      </p>

      <ul v-else class="registrations-list">
        <li
          v-for="user in eventRegistrations"
          :key="user.id"
          class="registration-item"
        >
          <div>
            <strong>{{ user.name }}</strong>
            <span>{{ user.email }}</span>
          </div>

          <small>
            {{ formatDate(user.createdAt) }}
          </small>
        </li>
      </ul>
    </section>

    <p v-else class="empty-text">
      Подію не знайдено
    </p>
  </main>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useEvents } from '../composables/useEvents'
import { useRegistrations } from '../composables/useRegistrations'

const route = useRoute()

const { getEventById } = useEvents()
const { getRegistrationsByEventId } = useRegistrations()

const event = getEventById(route.params.id)

const eventRegistrations = computed(() => {
  return getRegistrationsByEventId(route.params.id)
})

function formatDate(date) {
  return new Date(date).toLocaleString('uk-UA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>