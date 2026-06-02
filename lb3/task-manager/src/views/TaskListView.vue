<template>
  <section>
    <div class="page-top">
      <h1>Задачі</h1>

      <RouterLink to="/tasks/new" class="btn primary">
        + Додати задачу
      </RouterLink>
    </div>

    <div class="filters">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Пошук за назвою..."
      />

      <select v-model="selectedCategory">
        <option value="">Усі категорії</option>
        <option value="Навчання">Навчання</option>
        <option value="Робота">Робота</option>
        <option value="Особисте">Особисте</option>
      </select>

      <select v-model="selectedPriority">
        <option value="">Усі пріоритети</option>
        <option value="Високий">Високий</option>
        <option value="Середній">Середній</option>
        <option value="Низький">Низький</option>
      </select>

      <select v-model="sortType">
        <option value="deadline">Сортувати за дедлайном</option>
        <option value="priority">Сортувати за пріоритетом</option>
      </select>
    </div>

    <div v-if="filteredTasks.length" class="task-list">
      <article
        v-for="task in filteredTasks"
        :key="task.id"
        class="task-card"
        :class="{ overdue: isOverdue(task), completed: task.completed }"
      >
        <button
          class="status-circle"
          :class="{ completed: task.completed }"
          @click="taskStore.toggleTaskStatus(task.id)"
        ></button>

        <div class="task-info">
          <h2>{{ task.title }}</h2>

          <div class="badges">
            <span class="badge category">{{ task.category }}</span>
            <span class="badge priority">{{ task.priority }}</span>
            <span v-if="isOverdue(task)" class="badge overdue-text">
              прострочено до {{ formatDate(task.deadline) }}
            </span>
            <span v-else class="deadline">
              до {{ formatDate(task.deadline) }}
            </span>
          </div>
        </div>

        <div class="task-actions">
          <RouterLink :to="`/tasks/${task.id}/edit`" class="icon-btn">
            ✎
          </RouterLink>

          <RouterLink :to="`/tasks/${task.id}`" class="icon-btn">
            👁
          </RouterLink>

          <button class="icon-btn danger" @click="deleteTask(task.id)">
            ×
          </button>
        </div>
      </article>
    </div>

    <p v-else class="empty">Задачі не знайдено</p>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useTaskStore } from '../stores/taskStore'

const taskStore = useTaskStore()

const searchQuery = ref('')
const selectedCategory = ref('')
const selectedPriority = ref('')
const sortType = ref('deadline')

const priorityOrder = {
  Високий: 1,
  Середній: 2,
  Низький: 3,
}

const filteredTasks = computed(() => {
  let tasks = [...taskStore.tasks]

  if (searchQuery.value.trim()) {
    tasks = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  if (selectedCategory.value) {
    tasks = tasks.filter((task) => task.category === selectedCategory.value)
  }

  if (selectedPriority.value) {
    tasks = tasks.filter((task) => task.priority === selectedPriority.value)
  }

  if (sortType.value === 'deadline') {
    tasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
  }

  if (sortType.value === 'priority') {
    tasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])
  }

  return tasks
})

function isOverdue(task) {
  const today = new Date().toISOString().split('T')[0]

  return !task.completed && task.deadline < today
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('uk-UA')
}

function deleteTask(id) {
  if (confirm('Видалити задачу?')) {
    taskStore.deleteTask(id)
  }
}
</script>