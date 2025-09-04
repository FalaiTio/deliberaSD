<template>
  <transition name="fade">
    <div v-if="showPWAInstall && deferredPrompt"
         class="bg-blue-500 text-white py-3 px-4 rounded-lg shadow-lg mx-4 mt-16 md:mt-20 fixed top-0 left-0 right-0 z-40 flex items-center justify-between gap-4">
      <p class="text-sm md:text-base flex-1">Instale esse aplicativo no seu celular sem ocupar espaço. Isso facilita o
        acesso.</p>
      <button @click="install"
              class="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg text-xs md:text-sm transition duration-100">
        Instalar
      </button>
      <button @click="dismiss" class="text-white hover:text-gray-300 transition duration-100"
              aria-label="Fechar notificação">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>
  </transition>

  <!-- Navbar (modernizada com Tailwind) -->
  <Disclosure as="nav" class="w-full bg-white py-2 fixed z-30 top-0 shadow-md" v-slot="{ open }">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <DisclosureButton
              class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400">
            <span class="sr-only">Abrir menu</span>
            <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true"/>
            <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true"/>
          </DisclosureButton>
        </div>
        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div class="flex flex-shrink-0 items-center">
            <img class="h-10 md:h-14" src="./assets/img/logo.jpg" alt="DeliberaJá SuportDOC"/>
          </div>
          <div class="hidden sm:ml-6 sm:block w-full">
            <div class="flex space-x-4 justify-end">
              <router-link
                  v-for="item in navigation"
                  :key="item.name"
                  :to="item.href"
                  :class="[isCurrent(item.href) ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100', 'rounded-md px-3 py-2 text-md font-medium transition duration-100']"
                  :aria-current="isCurrent(item.href) ? 'page' : undefined"
              >
                {{ item.name }}
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="space-y-1 px-2 pt-2 pb-3 bg-white">
        <router-link
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            :class="[isCurrent(item.href) ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100', 'block rounded-md px-3 py-2 text-md font-medium transition duration-100']"
            :aria-current="isCurrent(item.href) ? 'page' : undefined"
        >
          {{ item.name }}
        </router-link>
      </div>
    </DisclosurePanel>
  </Disclosure>

  <!-- Conteúdo Principal -->
  <main class="pt-20 pb-3">
    Aqui...
    <router-view/>
  </main>

  <!-- Footer com Versão (modernizado) -->
  <footer class="fixed bottom-0 left-0 right-0 bg-gray-100 text-gray-500 text-xs py-1 text-center">
    V: {{ appVersion }}
  </footer>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {Disclosure, DisclosureButton, DisclosurePanel} from '@headlessui/vue';
import {Bars3Icon, XMarkIcon} from '@heroicons/vue/24/outline';
import {useRoute} from 'vue-router';

// Interface para tipar o evento PWA
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default defineComponent({
  data() {
    return {
      deferredPrompt: null as BeforeInstallPromptEvent | null,
      appVersion: process.env.VUE_APP_VERSION || 'Desconhecida',
      showPWAInstall: true,
    };
  },
  created(): void {
    console.log('App version:', this.appVersion);

    if (localStorage.getItem('pwaInstallDismissed') === 'true') {
      this.showPWAInstall = false;
    }

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e as BeforeInstallPromptEvent;
    });

    window.addEventListener('appinstalled', () => {
      this.deferredPrompt = null;
      this.showPWAInstall = false;
    });
  },
  methods: {
    async dismiss() {
      this.showPWAInstall = false;
      localStorage.setItem('pwaInstallDismissed', 'true');
    },
    async install() {
      if (this.deferredPrompt) {
        await this.deferredPrompt.prompt();
        const {outcome} = await this.deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          console.log('PWA instalado!');
        } else {
          console.log('Instalação cancelada.');
        }
        this.deferredPrompt = null;
        this.showPWAInstall = false;
      }
    },
    isCurrent(href: string): boolean {
      const route = useRoute();
      return route.path === href;
    },
  },
});
</script>

<script setup lang="ts">
const navigation = [
  {name: 'Home', href: '/', current: false},
  {name: 'Votação', href: '/votacao', current: false},
  {name: 'Resultado', href: '/resultado', current: false},
];
</script>

<style scoped>
/* Transição para a notificação */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>