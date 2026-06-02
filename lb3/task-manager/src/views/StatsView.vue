<template>
  <section>
    <h1>Статистика</h1>

    <div class="stats-grid">
      <div class="stat-card">
        <strong>{{ taskStore.totalTasks }}</strong>
        <span>Всього задач</span>
      </div>

      <div class="stat-card green">
        <strong>{{ taskStore.activeTasks.length }}</strong>
        <span>Активних</span>
      </div>

      <div class="stat-card blue">
        <strong>{{ taskStore.completedTasks.length }}</strong>
        <span>Виконано</span>
      </div>

      <div class="stat-card red">
        <strong>{{ taskStore.overdueTasks.length }}</strong>
        <span>Прострочено</span>
      </div>
    </div>

    <div class="progress-section">
      <div class="progress-top">
        <span>Прогрес виконання</span>
        <strong>{{ taskStore.progressPercent }}%</strong>
      </div>

      <div class="progress-bar">
        <div
          class="progress-fill"
          :style="{ width: taskStore.progressPercent + '%' }"
        ></div>
      </div>
    </div>

    <div class="stats-block">
      <h2>Найближчі дедлайни (наступні 3 дні)</h2>

      <div
        v-if="taskStore.nearestDeadlines.length"
        class="deadline-list"
      >
        <div
          v-for="task in taskStore.nearestDeadlines"
          :key="task.id"
          class="deadline-item"
        >
          <span>{{ task.title }}</span>

          <div class="deadline-right">
            <span class="badge category">
              {{ task.category }}
            </span>

            <strong>
              {{ formatDate(task.deadline) }}
            </strong>
          </div>
        </div>
      </div>

      <p v-else class="empty">
        Немає найближчих дедлайнів
      </p>
    </div>

    <div class="stats-block">
      <h2>Кількість задач за категоріями</h2>

      <div
        v-for="(count, category) in taskStore.tasksByCategory"
        :key="category"
        class="category-row"
      >
        <span>{{ category }}</span>
        <strong>{{ count }}</strong>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useTaskStore } from '../stores/taskStore'

const taskStore = useTaskStore()

function formatDate(date) {
  return new Date(date).toLocaleDateString('uk-UA')
}
</script>