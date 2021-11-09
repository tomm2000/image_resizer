<template>
<div id="IMAGEDISPLAY">
  <img :id="imageID">
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    imageID: String
  },
  setup(props) {
    
  },
})
</script>


<style lang="scss">
  @import '@/assets/global.scss';

  #IMAGEDISPLAY {
    background: $col_main_2;
    margin: 1em;
    padding: .5em 1em .5em 1em;

    height: 100%;
    border-radius: .3em;

    // height: fit-content;
    // max-height: 80vh;

    flex-basis: 0;
    flex-grow: 2;

    display: flex;
    justify-content: center;

    img {
      max-height: 90vh;
      max-width: 100%;
    }
  }
</style>>