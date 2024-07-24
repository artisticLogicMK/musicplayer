<script setup lang="ts">
// modules
import { ref, onMounted } from 'vue'

// components
import { PhDownload } from "@phosphor-icons/vue"

// Indicates wether install should show/hide
const showPopup = ref<boolean>(true)

// Store PWA install prompt event here
const installPrompt = ref<any>(null)

onMounted(() => {
    // Listen for PWA beforeintall event
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault()
        // Save the event
        installPrompt.value = e
    })
})

const install = () => {
    // When install button is clicked, trigger beforeintall event to open install prompt
    installPrompt.value.prompt()

    // Handle user choice here: Install or Cancel?
    installPrompt.value.userChoice.then((choiceresult: any) => {
        // If install was clicked
        if (choiceresult.outcome === 'accepted') {
            // Hide install popup
            showPopup.value = false
        }
    })
}
</script>

<template>
    <div
        v-if="installPrompt && showPopup"
        class="absolute z-10 bottom-3 right-3 max-w-[90%] xs:max-w-sm rounded-lg bg-[--bg-color2] md:bg-[--bg-color1] border border-white/5 text-[--text-color] shadow-md p-4 select-none"
    >
        <div class="flex items-center justify-between">
            <p class="font-semibold text-sm">Install App</p>
            <PhDownload class="text-lg text-white/50" />
        </div>

        <p class="text-sm py-3">This app can be installed on your device for offline usage.</p>

        <div class="flex justify-end">
            <button
                @click="showPopup = false"
                class="pwa-btns border border-white/5 text-white/50 mr-3"
            >Cancel</button>
            <button @click="install" class="pwa-btns bg-[--main-color]">Install</button>
        </div>
    </div>
</template>

<style>
.pwa-btns {
    @apply text-sm rounded-md px-2 py-1
}
</style>