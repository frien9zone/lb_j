<template>
  <section v-if="task">
    <RouterLink to="/" class="back-link">
      ← Назад до списку
    </RouterLink>

    <h1>{{ task.title }}</h1>

    <div class="badges detail-badges">
      <span class="badge category">{{ task.category }}</span>

      <span class="badge priority">
        {{ task.priority }} пріоритет
      </span>

      <span
        v-if="isOverdue(task)"
        class="badge overdue-text"
      >
        Прострочено до {{ formatDate(task.deadline) }}
      </span>
    </div>

    <div class="detail-grid">
      <div class="detail-card">
        <span>Статус</span>
        <strong>
          {{ task.completed ? 'Виконана' : 'Активна' }}
        </strong>
      </div>

      <div class="detail-card">
        <span>Категорія</span>
        <strong>{{ task.category }}</strong>
      </div>

      <div class="detail-card">
        <span>Дата створення</span>
        <strong>{{ formatDate(task.createdAt) }}</strong>
      </div>

      <div class="detail-card">
        <span>Дедлайн</span>
        <strong>{{ formatDate(task.deadline) }}</strong>
      </div>
    </div>

    <div class="description-card">
      <span>Опис</span>

      <p>{{ task.description }}</p>
    </div>

    <div class="detail-actions">
      <RouterLink
        :to="`/tasks/${task.id}/edit`"
        class="btn primary"
      >
        ✎ Редагувати
      </RouterLink>

      <button
        class="btn danger-btn"
        @click="deleteTask"
      >
        × Видалити
      </button>
    </div>
  </section>

  <section v-else class="empty-page">
    <h2>Задачу не знайдено</h2>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTaskStore } from '../stores/taskStore'

const route = useRoute()
const router = useRouter()
const taskStore = useTaskStore()

const task = computed(() =>
  taskStore.tasks.find(
    (task) => task.id === Number(route.params.id)
  )
)

function formatDate(date) {
  return new Date(date).toLocaleDateString('uk-UA')
}

function isOverdue(task) {
  const today = new Date().toISOString().split('T')[0]

  return !task.completed && task.deadline < today
}

function deleteTask() {
  if (confirm('Видалити цю задачу?')) {
    taskStore.deleteTask(route.params.id)
    router.push('/')
  }
}
</script>