<template>
  <main class="app">
    <h1>Галерея зображень</h1>

    <div class="controls">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Пошук за автором..."
        class="search"
      />

      <div class="buttons">
        <button
          @click="filterMode = 'all'"
          :class="{ active: filterMode === 'all' }"
        >
          Усі
        </button>

        <button
          @click="filterMode = 'favorites'"
          :class="{ active: filterMode === 'favorites' }"
        >
          Обрані
        </button>

        <button
          @click="prevPage"
          :disabled="page === 1"
        >
          ←
        </button>

        <span class="page">{{ page }}</span>

        <button @click="nextPage">
          →
        </button>
      </div>
    </div>

    <div v-if="isLoading" class="status">
      Завантаження...
    </div>

    <div v-else-if="error" class="error">
      <p>{{ error }}</p>

      <button @click="loadImages">
        Спробувати ще раз
      </button>
    </div>

    <div v-else class="gallery">
      <ImageCard
        v-for="image in filteredImages"
        :key="image.id"
        :image="image"
        :is-favorite="isFavorite(image.id)"
        @toggle-favorite="toggleFavorite"
      />
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import ImageCard from './components/ImageCard.vue'

const images = ref([])
const favorites = ref(
  JSON.parse(localStorage.getItem('favorites')) || []
)
const searchQuery = ref('')
const filterMode = ref('all')
const page = ref(1)
const limit = 12
const isLoading = ref(false)
const error = ref('')

const loadImages = async () => {
  isLoading.value = true
  error.value = ''

  try {
    const response = await fetch(
      `https://picsum.photos/v2/list?page=${page.value}&limit=${limit}`
    )

    if (!response.ok) {
      throw new Error('Не вдалося завантажити зображення')
    }

    images.value = await response.json()
  } catch (err) {
    error.value = err.message || 'Сталася помилка під час запиту'
  } finally {
    isLoading.value = false
  }
}

const toggleFavorite = (imageId) => {
  if (favorites.value.includes(imageId)) {
    favorites.value = favorites.value.filter(id => id !== imageId)
  } else {
    favorites.value.push(imageId)
  }
}

const isFavorite = (imageId) => {
  return favorites.value.includes(imageId)
}

const filteredImages = computed(() => {
  let result = images.value

  if (filterMode.value === 'favorites') {
    result = result.filter(image => favorites.value.includes(image.id))
  }

  if (searchQuery.value.trim()) {
    result = result.filter(image =>
      image.author
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase())
    )
  }

  return result
})

const nextPage = () => {
  page.value++
  loadImages()
}

const prevPage = () => {
  if (page.value > 1) {
    page.value--
    loadImages()
  }
}

watch(favorites, (newFavorites) => {
  localStorage.setItem(
    'favorites',
    JSON.stringify(newFavorites)
  )
}, { deep: true })

onMounted(() => {
  loadImages()
})
</script>