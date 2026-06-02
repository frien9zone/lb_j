import { defineStore } from 'pinia'

const STORAGE_KEY = 'task-manager-tasks'

function loadTasks() {
  const savedTasks = localStorage.getItem(STORAGE_KEY)

  if (savedTasks) {
    return JSON.parse(savedTasks)
  }

  return [
    {
      id: 1,
      title: 'Підготувати лабораторну роботу',
      description: 'Оформити звіт та перевірити роботу менеджера задач.',
      category: 'Навчання',
      priority: 'Високий',
      deadline: '2026-05-30',
      completed: false,
      createdAt: '2026-05-26',
    },
    {
      id: 2,
      title: 'Прочитати документацію Vue Router',
      description: 'Ознайомитися з маршрутизацією у Vue 3.',
      category: 'Навчання',
      priority: 'Середній',
      deadline: '2026-06-02',
      completed: true,
      createdAt: '2026-05-26',
    },
    {
      id: 3,
      title: 'Купити продукти',
      description: 'Купити продукти на тиждень.',
      category: 'Особисте',
      priority: 'Низький',
      deadline: '2026-05-28',
      completed: false,
      createdAt: '2026-05-26',
    },
  ]
}

function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: loadTasks(),
  }),

  getters: {
    totalTasks: (state) => state.tasks.length,

    activeTasks: (state) => state.tasks.filter((task) => !task.completed),

    completedTasks: (state) => state.tasks.filter((task) => task.completed),

    overdueTasks: (state) => {
      const today = new Date().toISOString().split('T')[0]

      return state.tasks.filter(
        (task) => !task.completed && task.deadline < today
      )
    },

    nearestDeadlines: (state) => {
      const today = new Date()
      const threeDaysLater = new Date()
      threeDaysLater.setDate(today.getDate() + 3)

      return state.tasks
        .filter((task) => {
          const deadline = new Date(task.deadline)

          return (
            !task.completed &&
            deadline >= today &&
            deadline <= threeDaysLater
          )
        })
        .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    },

    tasksByCategory: (state) => {
      return state.tasks.reduce((result, task) => {
        result[task.category] = (result[task.category] || 0) + 1
        return result
      }, {})
    },

    progressPercent: (state) => {
      if (state.tasks.length === 0) {
        return 0
      }

      const completedCount = state.tasks.filter((task) => task.completed).length

      return Math.round((completedCount / state.tasks.length) * 100)
    },
  },

  actions: {
    addTask(taskData) {
      const newTask = {
        id: Date.now(),
        ...taskData,
        completed: false,
        createdAt: new Date().toISOString().split('T')[0],
      }

      this.tasks.push(newTask)
      saveTasks(this.tasks)
    },

    updateTask(id, taskData) {
      const taskIndex = this.tasks.findIndex((task) => task.id === Number(id))

      if (taskIndex !== -1) {
        this.tasks[taskIndex] = {
          ...this.tasks[taskIndex],
          ...taskData,
        }

        saveTasks(this.tasks)
      }
    },

    deleteTask(id) {
      this.tasks = this.tasks.filter((task) => task.id !== Number(id))
      saveTasks(this.tasks)
    },

    toggleTaskStatus(id) {
      const task = this.tasks.find((task) => task.id === Number(id))

      if (task) {
        task.completed = !task.completed
        saveTasks(this.tasks)
      }
    },
  },
})