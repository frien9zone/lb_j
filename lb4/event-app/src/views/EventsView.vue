<template>
  <main class="page">
    <h1 class="page-title">Події</h1>

    <div class="events-grid">
      <EventCard
        v-for="event in eventList"
        :key="event.id"
        :event="event"
      />
    </div>
  </main>
</template>

<script setup>
import EventCard from '../components/EventCard.vue'
import { useEvents } from '../composables/useEvents'

const { eventList } = useEvents()
</script>