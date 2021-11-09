<template>
<div id="HOME">
  <Uploader :reloadImage="reloadImage" />
  <ImageDisplay imageID="convertedImage" />
</div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue'
import Uploader from './Home/Uploader.vue'
import ImageDisplay from './Home/ImageDisplay.vue'
import { homepage_data } from './Home/datastore'

export default defineComponent({
  components: { Uploader, ImageDisplay },
  setup() {
    const reloadImage = function(data: Blob) {
      console.log('reloaded image')
      const urlCreator = window.URL || window.webkitURL;
      let image = (document.getElementById('convertedImage') as HTMLImageElement)
      image.src = ''
      image.src = urlCreator.createObjectURL(data);
    }

    return { reloadImage }
  },
})
</script>

<style lang='scss'>
  @import '@/assets/global.scss';

  #HOME {
    display: flex;
    flex-wrap: wrap;
    max-height: 90vh;
  }
</style>