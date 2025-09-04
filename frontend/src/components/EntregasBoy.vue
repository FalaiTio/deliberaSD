<template>
    <div class="bg-white py-6 sm:py-8 lg:py-12 mt-14">
        <div class="mx-auto max-w-screen-xl px-4 md:px-8">
            <!-- text - start -->
            <div class="mb-10 md:mb-16">
                <h2 class="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">Entregas do dia</h2>

                <p class="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">Entregas que estão pendentes de coleta de assinatura</p>
            </div>
            <!-- text - end -->

            <div class="grid gap-8 sm:grid-cols-2 sm:gap-12 lg:grid-cols-2 xl:grid-cols-2 xl:gap-16">
                <!-- article - start -->
                <div class="flex flex-col items-center gap-4 md:flex-row lg:gap-6 text-left">
                    <div class="flex flex-col gap-2">
                        <span class="text-sm text-gray-400">July 19, 2021</span>

                        <h2 class="text-xl font-bold text-gray-800">
                            <a href="#" class="transition duration-100 hover:text-indigo-500 active:text-indigo-600">New
                                trends in Tech</a>
                        </h2>

                        <p class="text-gray-500">This is a section of some simple filler text, also known as placeholder
                            text.</p>

                        <div>
                            <a href="#"
                                class="font-semibold text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700">Read
                                more</a>
                        </div>
                    </div>
                </div>
                <!-- article - end -->

                <!-- article - start -->
                <div class="flex flex-col items-center gap-4 md:flex-row lg:gap-6 text-left">
                    <div class="flex flex-col gap-2 ">
                        <span class="text-sm text-gray-400">April 07, 2021</span>

                        <h2 class="text-xl font-bold text-gray-800">
                            <a href="#" class="transition duration-100 hover:text-indigo-500 active:text-indigo-600">
                            Working with legacy stacks
                            </a>
                        </h2>

                        <p class="text-gray-500">This is a section of some simple filler text, also known as placeholder
                            text.</p>

                        <div>
                            <a href="#"
                                class="font-semibold text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700">Read
                                more</a>
                        </div>
                    </div>
                </div>
                <!-- article - end -->

                <!-- article - start -->
                <div class="flex flex-col items-center gap-4 md:flex-row lg:gap-6 text-left">
                    <div class="flex flex-col gap-2">
                        <span class="text-sm text-gray-400">March 15, 2021</span>

                        <h2 class="text-xl font-bold text-gray-800">
                            <a href="#" class="transition duration-100 hover:text-indigo-500 active:text-indigo-600">10 best
                                smartphones for devs</a>
                        </h2>

                        <p class="text-gray-500">This is a section of some simple filler text, also known as placeholder
                            text.</p>

                        <div>
                            <a href="#"
                                class="font-semibold text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700">Read
                                more</a>
                        </div>
                    </div>
                </div>
                <!-- article - end -->

                <!-- article - start -->
                <div class="flex flex-col items-center gap-4 md:flex-row lg:gap-6 text-left">
                    <div class="flex flex-col gap-2">
                        <span class="text-sm text-gray-400">January 27, 2021</span>

                        <h2 class="text-xl font-bold text-gray-800">
                            <a href="#" class="transition duration-100 hover:text-indigo-500 active:text-indigo-600">8 High
                                performance Notebooks</a>
                        </h2>

                    <p class="text-gray-500">This is a section of some simple filler text, also known as placeholder
                        text.</p>

                    <div>
                        <a href="#"
                            class="font-semibold text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700">Read
                            more</a>
                    </div>
                </div>
            </div>
            <!-- article - end -->
        </div>
    </div>
</div></template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
    props: {
        msg: String
    }
})
export default class EntregasBoy extends Vue {
    msg!: string
}
</script>
