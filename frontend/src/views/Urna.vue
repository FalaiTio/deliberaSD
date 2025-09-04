<template>
  <div class="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
    <h1 class="text-2xl font-bold mb-4">Urna de Votação - DeliberaSD</h1>
    <p>Escolha uma opção e vote:</p>
    <div class="mt-4">
      <button @click="vote('sim')" class="bg-green-500 text-white px-4 py-2 rounded mr-2">Sim</button>
      <button @click="vote('nao')" class="bg-red-500 text-white px-4 py-2 rounded mr-2">Não</button>
      <button @click="vote('abstencao')" class="bg-gray-500 text-white px-4 py-2 rounded">Abstenção</button>
    </div>
    <p v-if="mensagem" class="mt-4 text-blue-600">{{ mensagem }}</p>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';

const mensagem = ref('');

const vote = (opcao: string) => {
  // Aqui, integre com API ou estado local (ex.: localStorage)
  console.log(`Voto registrado: ${opcao}`);
  mensagem.value = `Voto "${opcao}" registrado com sucesso!`;
  // Exemplo: Salvar em localStorage para mock
  const votos = JSON.parse(localStorage.getItem('votos') || '{}');
  votos[opcao] = (votos[opcao] || 0) + 1;
  localStorage.setItem('votos', JSON.stringify(votos));
};
</script>