<template>
  <div id="modelConfirm" class="fixed z-50 inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4 "
       :class="{ 'hidden': !modalActive }">
    <div class="relative top-40 mx-auto shadow-xl rounded-md bg-white max-w-md">

      <div class="flex justify-end p-2">
        <button @click="$emit('close-modal')" type="button"
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"></path>
          </svg>
        </button>
      </div>

      <div id="content" class="mb-10">
        <slot name="content"/>
      </div>

      <div class="p-6 pt-0 text-center">
        <slot name="footer"/>
      </div>

    </div>
  </div>

  <!--  <div class="fixed inset-0 flex justify-center items-center bg-black bg-opacity-30"  :class="{ 'hidden': !modalActive }">-->
  <!--    <div class="p-4 bg-white max-w-s">-->
  <!--      <slot/>-->
  <!--      <button @click="$emit('close-modal')" class="text-black mt-8 bg-gray py-2 px-6">Close</button>-->
  <!--    </div>-->
  <!--  </div>-->
</template>

<script setup>
defineEmits(["close-modal"]);
defineProps({
  modalActive: {
    type: Boolean,
    default: false,
  }
})
</script>
<style lang="css" scoped>
.modal-container {
  display: flex;
  justify-content: center; /* Centraliza horizontalmente */
  align-items: center; /* Centraliza verticalmente */
  height: 100vh; /* Define a altura para cobrir toda a tela */
}

</style>