<script lang="ts" setup>
import { computed, onMounted } from 'vue'
import { usePlayerStore } from '../../stores/player'

import {
  PhRepeatOnce, PhRepeat, PhSkipBack, PhPlay, PhPause, PhSkipForward
} from "@phosphor-icons/vue"

// initialise state stores.
const playerStore = usePlayerStore()

// When play button is clicked
const play = () => {
  // If player instance not created exit function
  if (window.wavesurfer === undefined) return
  
  // Else play
  window.wavesurfer.play()
}

// When pause button is clicked
const pause = () => {
  // If player instance not created exit function
  if (window.wavesurfer === undefined) return
  
  // Else pause
  window.wavesurfer.pause()
}


// Find the index of the currently playing track
const currentTrackIndex = computed<number>(() => {
  return playerStore.playlist.findIndex(file => file.name === playerStore.currentTrack.name)
})

// Function to handle the forward track button click event
const forward = () => {
  // If player instance not created exit function
  if (window.wavesurfer === undefined) return
  
  // Determine the index of the next track in the playlist
  const nextTrackIndex = currentTrackIndex.value + 1
  
  // Check if there is no next track (end of playlist)
  if (playerStore.playlist[nextTrackIndex] === undefined) {
    // If so, play the first track and exit the function
    playerStore.play(playerStore.playlist[0])
    return
  }
  
  // If the next track exists, play it
  playerStore.play(playerStore.playlist[nextTrackIndex])
}


// Function to handle the previous/back track button click event
const back = () => {
  // If player instance not created exit function
  if (window.wavesurfer === undefined) return
  
  // Determine the index of the previous track in the playlist
  const prevTrackIndex = currentTrackIndex.value - 1
  
  // Check if there is no track backward (start of playlist), thus in the first track
  if (prevTrackIndex < 0) {
    // If so, play the last track and exit the function
    // Determine the index of the last track
    const lastTrackIndex = playerStore.playlist.length - 1
    playerStore.play(playerStore.playlist[lastTrackIndex])
    return
  }
  
  // If there is a track backward, play it
  playerStore.play(playerStore.playlist[prevTrackIndex])
}

// Function to handle the repeat track button click event
const repeat = () => {
  // If player instance not created exit function
  if (window.wavesurfer === undefined) return
  
  // Check if the player is currently set to repeat mode
  if (playerStore.toRepeat) {
    // If it is, disable repeat mode
    playerStore.toRepeat = false
    // Enable repeat-all mode
    playerStore.toRepeatAll = true
  } else {
    // If it is not in repeat mode, enable repeat mode
    playerStore.toRepeat = true
    // Disable repeat-all mode
    playerStore.toRepeatAll = false
    // Start playing the track
    window.wavesurfer.play()
  }
}

// Function to handle the repeat-all button click event
const repeatAll = () => {
  // If player instance not created exit function
  if (window.wavesurfer === undefined) return
  
  // Check if the player is currently set to repeat-all mode
  if (playerStore.toRepeatAll) {
    // If it is, disable repeat-all mode
    playerStore.toRepeatAll = false
    // Enable repeat mode
    playerStore.toRepeat = true
  } else {
    // If it is not in repeat-all mode, enable repeat-all mode
    playerStore.toRepeatAll = true
    // Disable repeat mode
    playerStore.toRepeat = false
  }
}


onMounted(() => {
  // Add an event listener for keyboard presses
  window.addEventListener('keydown', (e) => {
    // When the space key is pressed
    if (e.key === ' ' || e.key === 'Space') {
      // If an input element is in focus, exit function (perform default ' ' function)
      if (document.activeElement?.tagName === 'INPUT') return

      // If no input element in focus, stop default behaviour
      e.preventDefault()
      // If the player is paused, play; otherwise, pause
      playerStore.isPaused ? window.wavesurfer.play() : window.wavesurfer.pause()
    }


    // When ArrowRight or ArrowDown keys are pressed, move to the next track in the playlist
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') forward()


    // When ArrowLeft or ArrowUp keys are pressed, move to the previous track in the playlist
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') back()


    // When Ctrl + o is pressed, open the file select dialog
    if (e.ctrlKey && (e.key === 'o' || e.key === 'O')) {
      e.preventDefault()
      // Trigger the click event for the file select input element
      document.getElementById('selectAudio')?.click()
    }


    // When the Ctrl key is pressed, toggle the repeat function
    if (e.ctrlKey) {
      e.preventDefault()
      repeat()
    }
  })
})
</script>

<template>
  <div class="">
    <div class="flex items-center justify-center py-2.5 m-3 mt-2 mb-4 border border-white/5 rounded-full">
      <!--repeat-->
      <button
        @click="repeat()"
        :class="{'active': playerStore.toRepeat}"
      >
        <PhRepeatOnce weight="fill" />
      </button>
      
      <!--prev-->
      <button @click="back()" id="back">
        <PhSkipBack weight="fill" />
      </button>
      
      <!--play-->
      <button
        v-if="!playerStore.isPlaying"
        @click="play()" class="big"
      >
        <PhPlay weight="fill" />
      </button>

      <!--pause-->
      <button
        v-else
        @click="pause()" class="big"
      >
        <PhPause weight="fill" />
      </button>
      
      <!--next-->
      <button @click="forward()">
        <PhSkipForward weight="fill" />
      </button>
      
      <!--repeatAll-->
      <button
        @click="repeatAll()"
        :class="{'active': playerStore.toRepeatAll}"
      >
        <PhRepeat weight="fill" />
      </button>
    </div>
  </div>
</template>

<style scoped>
button {
  @apply w-9 h-9 flex items-center justify-center bg-black/20 rounded-full mx-2 hover:bg-white/10 active:bg-black/20
}
button svg {
  @apply text-[--text-color] text-sm
}

button.big {
  @apply w-12 h-12 border-[3px] border-[--main-color]
}
button.big svg {
  @apply text-base
}

button.active {
  @apply border border-white/30
}
</style>