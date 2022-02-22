<template>
  <div id="p-home">
    <div class="inside-content box-properties p-20 text-left">
      <p class="info bold mb-10">{{ about.title }}</p>
      <p class="small-info" v-html="about.information"></p>

      <div class="mt-20">
        <p class="info bold mb-10">Consideraciones</p>
        <div v-for="(consideration, index) in about.considerations" :key="index">
          <p 
            :class="index < about.considerations.length - 1 ? 'mb-5' : 'mb-0'"
            class="small-info" 
            v-html="consideration"
          ></p>
        </div>
      </div>

      <div class="mt-20">
        <p class="info bold mb-10">Funcionalidades</p>
        <div v-for="(functionalty, index) in about.functionalities" :key="index">
          <p 
            :class="index < about.functionalities.length - 1 ? 'mb-5' : 'mb-0'"
            class="small-info" 
            v-html="functionalty"
          ></p>
        </div>
      </div>

      <div class="mt-20">
        <p class="info bold mb-10">Notas</p>
        <div v-for="(note, index) in about.notes" :key="index">
          <p 
            :class="index < about.notes.length - 1 ? 'mb-5' : 'mb-0'"
            class="small-info" 
            v-html="note"
          ></p>
        </div>
      </div>

      <div class="mt-20">
        <p class="info bold mb-10">Issues o detalles</p>
        <div v-for="(issue, index) in about.issues" :key="index">
          <p 
            :class="index < about.issues.length - 1 ? 'mb-5' : 'mb-0'"
            class="small-info" 
            v-html="issue"
          ></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

// data
import { about } from '@/public/data/about.json'

export default defineComponent({
  name: 'Home',

  setup(){
    return {
      about
    }
  },
});
</script>
