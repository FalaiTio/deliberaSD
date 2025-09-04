<template>
  <div class="pt-24">
    <section class="max-w-screen-2xl px-4 md:px-8 mx-auto">
      <div class="bg-white py-6 sm:py-8 lg:py-12 rounded-lg shadow-md">
        <div class="mx-auto max-w-screen-2xl px-4 md:px-8">
          <div class="mb-10 md:mb-16 text-center">
            <h2 class="mb-4 text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
              Quem está entregando o Documento?
            </h2>
            <p class="mx-auto max-w-screen-md text-gray-500 md:text-lg">
              Clique no seu nome abaixo.
            </p>
          </div>

          <div class="mb-6 flex flex-col gap-4">
            <div class="w-full relative">
              <label for="filtroNomeMotoboy" class="block text-sm font-medium text-gray-700 mb-1">Filtrar por Nome</label>
              <input
                  id="filtroNomeMotoboy"
                  v-model="filtroNomeMotoboy"
                  type="text"
                  placeholder="Digite o nome do motoboy..."
                  class="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 pr-10"
              />
              <svg class="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <!-- Mensagem de Contagem ou Erro -->
          <p v-if="errorMessage" class="text-center text-red-500 mb-4">{{ errorMessage }}</p>
          <p v-else-if="motoboysFiltrados.length > 0" class="text-center text-gray-600 mb-4">Exibindo {{ motoboysFiltrados.length }} motoboy(s)</p>
          <p v-else class="text-center text-gray-600 mb-4">Nenhum motoboy encontrado para os critérios.</p>

          <!-- Loading Spinner -->
          <div v-if="isLoading" class="flex justify-center mb-6">
            <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
          </div>

          <!-- Lista de Motoboys -->
          <div class="flex flex-col gap-6">
            <div
                v-for="motoboy in motoboysFiltrados"
                :key="motoboy.id_fun"
                @click="selecionarMotoboy(motoboy)"
                class="w-full flex items-center justify-between rounded-lg bg-gray-50 p-4 sm:p-6 shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer"
            >
              <div class="flex items-center">
                <!-- Ícone de Usuário -->
                <svg class="h-6 w-6 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <h3 class="text-lg font-semibold text-gray-800">
                  {{ motoboy.nome_fun }}
                </h3>
              </div>
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import motoboy from "@/services/motoboy";

export default class HomeView extends Vue {
  motoboys: IMotoboy[] = [];
  filtroNomeMotoboy: string = "";
  isLoading: boolean = false;
  errorMessage: string | null = null;
  debounceTimer: number | null = null;

  mounted(): void {
    this.carregarMotoboys();
    motoboy.saveSignOffline();
    motoboy.saveFailOffline();
  }

  async carregarMotoboys(): Promise<void> {
    this.isLoading = true;
    this.errorMessage = null;
    try {
      const res = await motoboy.listBoys(navigator.onLine);
      if (Array.isArray(res)) {
        this.motoboys = res;
      } else {
        this.errorMessage = 'Erro ao carregar motoboys. Tente novamente.';
      }
    } catch (e: any) {
      console.error(e);
      this.errorMessage = 'Erro ao carregar motoboys: ' + (e.message || 'Tente novamente.');
    } finally {
      this.isLoading = false;
    }
  }

  selecionarMotoboy(motoboy: IMotoboy): void {
    this.$router.push({ name: 'Entregas', params: { id: motoboy.id_fun.toString() } });
  }

  get motoboysFiltrados(): IMotoboy[] {
    if (!this.filtroNomeMotoboy) {
      return this.motoboys;
    }
    const filtroLower = this.filtroNomeMotoboy.toLowerCase();
    return this.motoboys.filter(m =>
        m.nome_fun?.toLowerCase().includes(filtroLower)
    );
  }

  updated() {
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
    }, 300);
  }
}
</script>

<style scoped>
/* Adicione estilos personalizados se necessário, ex: para o spinner */
</style>