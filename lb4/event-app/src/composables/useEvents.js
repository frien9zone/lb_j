import { ref } from 'vue'

const eventList = ref([
  {
    id: 1,
    title: 'Vue Meetup',
    type: 'Мітап',
    date: '2026-06-01',
    shortDescription: 'Зустріч Vue розробників',
    description:
      'Подія для frontend-розробників, присвячена Vue 3 та сучасному JavaScript.',
  },
  {
    id: 2,
    title: 'Frontend Conf',
    type: 'Конференція',
    date: '2026-06-10',
    shortDescription: 'Конференція frontend технологій',
    description:
      'Конференція про сучасний frontend, Vue, React та UX/UI.',
  },
  {
    id: 3,
    title: 'Hackathon',
    type: 'Хакатон',
    date: '2026-06-20',
    shortDescription: 'Командне змагання програмістів',
    description:
      '48-годинний хакатон для створення власних web-застосунків.',
  },
])

function getEventById(id) {
  return eventList.value.find((event) => event.id == id)
}

export function useEvents() {
  return {
    eventList,
    getEventById,
  }
}