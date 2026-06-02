<template>
  <div class="card">
    <img
      :src="image.download_url"
      :alt="image.author"
    />

    <h3>{{ image.author }}</h3>

    <button
      class="favorite-btn"
      @click="emit('toggle-favorite', image.id)"
    >
      {{ isFavorite ? '★' : '☆' }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  image: {
    type: Object,
    required: true
  },
  isFavorite: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['toggle-favorite'])
</script>