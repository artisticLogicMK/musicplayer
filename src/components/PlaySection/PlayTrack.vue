<script setup lang="ts">
// modules
import { usePlayerStore } from '../../stores/player'

// Components
import TrackCover from './TrackCover.vue'
import WaveForm from './WaveForm.vue'
import SeekSlider from './SeekSlider.vue'
import PlayerTime from './PlayerTime.vue'

// Initialize the player store to manage the state related to the audio player
const playerStore = usePlayerStore()
</script>

<template>
  <TrackCover />

  <!--track-->
  <div class="mb-4 w-[95%] mx-auto">
    
    <WaveForm />
    
    <SeekSlider />
    
    <PlayerTime />
    
  </div>
</template>