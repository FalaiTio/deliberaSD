<template>
  <div class="pt-24">
    <section class="max-w-screen-2xl px-4 md:px-8 mx-auto">
      <div class="bg-white py-6 sm:py-8 lg:py-12 rounded-lg shadow-md">
        <div class="mx-auto max-w-screen-2xl px-4 md:px-8">
          <div class="mb-10 md:mb-16 text-center">
            <h2 class="mb-4 text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
              Bem-vindo à Assembleia Condominial
            </h2>
            <p class="mx-auto max-w-screen-md text-gray-500 md:text-lg">
              Informe seu CPF para participar da votação.
            </p>
          </div>

          <!-- Input de CPF com máscara -->
          <div class="mb-6 flex flex-col gap-4">
            <div class="w-full relative">
              <label for="cpf" class="block text-sm font-medium text-gray-700 mb-1">CPF</label>
              <input
                  id="cpf"
                  v-model="cpf"
                  v-mascara:cpf // Use uma diretiva de máscara (veja abaixo)
              type="text"
              placeholder="000.000.000-00"
              class="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 pr-10"
              />
              <svg class="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" fill="none"
                   stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <button
                @click="verificarCPF"
                :disabled="isLoading || !cpfValido"
                class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition duration-100"
            >
              {{ isLoading ? 'Verificando...' : 'Entrar' }}
            </button>
          </div>

          <!-- Mensagens de Erro/Sucesso -->
          <p v-if="errorMessage" class="text-center text-red-500 mb-4">{{ errorMessage }}</p>
          <p v-if="successMessage" class="text-center text-green-500 mb-4">{{ successMessage }}</p>

          <!-- Loading Spinner -->
          <div v-if="isLoading" class="flex justify-center mb-6">
            <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import {ref, computed} from 'vue';
import {useRouter} from 'vue-router';
import assembleia from '@/services/assembleia';

const router = useRouter();
const cpf = ref('');
const isLoading = ref(false);
const errorMessage = ref<string | null>(null);
const successMessage = ref<string | null>(null);

// Validação simples de CPF (pode melhorar com lib como cpf-cnpj-validator)
const cpfValido = computed(() => cpf.value.length === 14 && /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf.value));

const verificar = async () => {
  isLoading.value = true;
  const response = await assembleia.verificarCPF(cpf.value);
  isLoading.value = false;
  if (response.valido) {
    // Salve CPF ou token se necessário
    localStorage.setItem('cpf', cpf.value);
    router.push('/votacao');
  } else {
    errorMessage.value = response.mensagem;
  }
};

// Diretiva simples para máscara de CPF (adicione em main.ts ou aqui)
const vMascara = {
  mounted(el: HTMLInputElement) {
    el.addEventListener('input', (e) => {
      let val = e.target.value.replace(/\D/g, '');
      if (val.length > 11) val = val.substring(0, 11);
      val = val.replace(/(\d{3})(\d)/, '$1.$2');
      val = val.replace(/(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
      val = val.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
      e.target.value = val;
    });
  },
};
</script>

<style scoped>
/* Estilos existentes ou adicione para o spinner */
</style>