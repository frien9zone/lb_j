<template>
  <div class="app">
    <header class="header">
      <RouterLink to="/" class="logo">
        EventApp
      </RouterLink>
    </header>

    <RouterView v-slot="{ Component }">
      <KeepAlive>
        <component :is="Component" />
      </KeepAlive>
    </RouterView>
  </div>
</template>