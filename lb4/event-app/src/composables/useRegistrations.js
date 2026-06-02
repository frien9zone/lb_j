import { ref } from 'vue'
import { useLocalStorage } from './useLocalStorage'

const registrations = useLocalStorage('event-registrations', [])

export function useRegistrations() {
  const isLoading = ref(false)
  const error = ref('')
  const successMessage = ref('')

  function getRegistrationsByEventId(eventId) {
    return registrations.value.filter(
      (registration) => registration.eventId == eventId
    )
  }

  async function registerUser(eventId, user) {
    error.value = ''
    successMessage.value = ''
    isLoading.value = true

    const newRegistration = {
      id: Date.now(),
      eventId: Number(eventId),
      name: user.name,
      email: user.email,
      createdAt: new Date().toISOString(),
    }

    registrations.value.push(newRegistration)

    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          const isSuccess = Math.random() > 0.15

          if (isSuccess) {
            resolve()
          } else {
            reject(new Error('Помилка реєстрації. Спробуйте ще раз.'))
          }
        }, 1000)
      })

      successMessage.value = 'Ви успішно зареєструвалися на подію!'
    } catch (err) {
      registrations.value = registrations.value.filter(
        (registration) => registration.id !== newRegistration.id
      )

      error.value = err.message
      throw err
    } finally {
      isLoading.value = false
    }
  }

  return {
    registrations,
    isLoading,
    error,
    successMessage,
    getRegistrationsByEventId,
    registerUser,
  }
}