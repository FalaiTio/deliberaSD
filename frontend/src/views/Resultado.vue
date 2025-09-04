<template>
  <div class="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
    <h1 class="text-2xl font-bold mb-4">Resultado da Votação</h1>
    <ul>
      <li>Sim: {{ votos.sim || 0 }}</li>
      <li>Não: {{ votos.nao || 0 }}</li>
      <li>Abstenção: {{ votos.abstencao || 0 }}</li>
    </ul>
    <button @click="atualizar" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Atualizar Resultados</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const votos = ref({ sim: 0, nao: 0, abstencao: 0 });

const atualizar = () => {
  // Aqui, busque de API ou localStorage
  const dados = JSON.parse(localStorage.getItem('votos') || '{}');
  votos.value = { ...dados };
};

onMounted(atualizar);
</script>