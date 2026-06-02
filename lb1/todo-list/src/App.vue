<script setup>
import { ref, computed, watch } from 'vue'

const savedTasks = localStorage.getItem('tasks')

const tasks = ref(
  savedTasks ? JSON.parse(savedTasks) : []
)

const newTask = ref('')
const filter = ref('all')

const filteredTasks = computed(() => {
  if (filter.value === 'active') {
    return tasks.value.filter(task => !task.completed)
  }

  if (filter.value === 'completed') {
    return tasks.value.filter(task => task.completed)
  }

  return tasks.value
})

function addTask() {
  const text = newTask.value.trim()

  if (!text) {
    return
  }

  tasks.value.push({
    id: Date.now(),
    text: text,
    completed: false
  })

  newTask.value = ''
}

function deleteTask(id) {
  tasks.value = tasks.value.filter(task => task.id !== id)
}

watch(tasks, (newTasks) => {
  localStorage.setItem('tasks', JSON.stringify(newTasks))
}, { deep: true })
</script>

<template>
  <div class="app">
    <h1>Список задач TO-DO List</h1>

    <div class="input-container">
      <input
        v-model="newTask"
        @keyup.enter="addTask"
        class="task-input"
        type="text"
        placeholder="Введіть задачу..."
      />

      <button class="add-btn" @click="addTask">
        Додати
      </button>
    </div>

    <div class="filter-container">
      <button
        class="filter-btn"
        :class="{ active: filter === 'all' }"
        @click="filter = 'all'"
      >
        Все
      </button>

      <button
        class="filter-btn"
        :class="{ active: filter === 'active' }"
        @click="filter = 'active'"
      >
        Активні
      </button>

      <button
        class="filter-btn"
        :class="{ active: filter === 'completed' }"
        @click="filter = 'completed'"
      >
        Виконанні
      </button>
    </div>

    <ul class="task-list">
      <li
        v-for="task in filteredTasks"
        :key="task.id"
        class="task-item"
      >
        <label class="task-left">
          <input
            type="checkbox"
            v-model="task.completed"
          />

          <span :class="{ completed: task.completed }">
            {{ task.text }}
          </span>
        </label>

        <button class="delete-btn" @click="deleteTask(task.id)">
          Видалити
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>

</style>