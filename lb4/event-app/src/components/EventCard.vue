<template>
  <div class="event-card">
    <div class="event-card__image">
      <h3>{{ event.title }}</h3>
      <p>{{ event.shortDescription }}</p>
    </div>

    <span class="event-card__badge">
      {{ event.type }}
    </span>

    <h2 class="event-card__title">
      {{ event.title }}
    </h2>

    <p class="event-card__date">
      {{ event.date }}
    </p>

    <p class="event-card__description">
      {{ event.shortDescription }}
    </p>

    <div class="event-card__buttons">
      <RouterLink :to="`/events/${event.id}`" class="btn btn-dark">
        Деталі
      </RouterLink>

      <RouterLink :to="`/events/${event.id}/register`" class="btn btn-primary">
        Реєстрація
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
defineProps({
  event: {
    type: Object,
    required: true,
  },
})
</script>