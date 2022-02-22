<template>
  <div id="p-rooms">
    <div v-if="rooms.length == 0" class="inside-content box-properties py-20">
      <p class="info text-center">No hay salas creadas.</p>

      <div class="align-center-center mt-20">
        <router-link to="/create-room" class="bold">Crear sala</router-link>
      </div>
    </div>

    <div v-else>
      <div 
        v-for="(room, index) in rooms" :key="index"
        class="align-between-center inside-content box-properties p-10" 
        :class="index < rooms.length - 1 ? 'mb-10' : 'mb-0'"
      >
        <p class="info bold text-left">🎥 {{ room.name }}</p>

        <div class="room-actions align-around-center">
          <p class="small-info pointer mr-10" @click="$router.push({name: 'Room', params: {roomName: room.slug}})">Editar</p>
          <p class="small-info pointer" @click="$router.push({name: 'Reservation', params: {roomName: room.slug}})">Reservar</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from 'vue'

export default defineComponent({
  setup() {
    let rooms = ref([])

    const checkRooms = onBeforeMount(() => {
      let savedRooms: string | null = window.localStorage.getItem('localRooms')

      if (savedRooms) {
        rooms.value = JSON.parse(savedRooms)
      } else {
        rooms.value = []
      }
    })

    return {
      checkRooms,
      rooms
    }
  },
})
</script>
