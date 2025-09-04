<template>
    <div v-if="shown">
        Deseja instalar o apicativo na área de trabalho?

        <button @click="installer" :style="{'display': installBtn}">
            install
        </button>
    </div>
</template>

<script>
    export default {
        data: () => ({
            shown: false,
            installBtn: "none",
            installer: undefined,
        }),

        created() {
            let installPrompt;
            window.addEventListener("beforeinstallprompt", e => {
                e.preventDefault();
                installPrompt = e;
                this.installBtn = "block";
            });
            this.installer = () => {
                this.installBtn = "none";
                installPrompt.prompt();
                installPrompt.userChoice.then(result => {
                    if (result.outcome === 'accepted') {
                        console.log("User accepted");
                    } else {
                        console.log("User denied");
                    }
                    installPrompt = null;
                })
            }
        }

        // beforeMount() {
        //     window.addEventListener('beforeinstallprompt', (e) => {
        //         e.preventDefault()
        //         this.installEvent = e
        //         this.shown = true
        //     })
        // },
        //
        // methods: {
        //     dismissPrompt() {
        //         this.shown = false
        //     },
        //
        //     installPWA() {
        //         this.installEvent.prompt()
        //         this.installEvent.userChoice.then((choice) => {
        //             this.dismissPrompt() // Hide the prompt once the user's clicked
        //             if (choice.outcome === 'accepted') {
        //                 // Do something additional if the user chose to install
        //             } else {
        //                 // Do something additional if the user declined
        //             }
        //         })
        //     },
        // }
    }
</script>