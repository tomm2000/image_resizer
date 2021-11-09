<template>
<div id="UPLOADER">
  <div class="container" id="fileselect">
    <span>BROWSE FILES:</span>
    <input id="fileInput" @change="onFileChanged" type="file" accept="image/*" style="display: none;"/>
    <button onclick="document.getElementById('fileInput').click()">Browse...</button>
  </div>
  <div class="container" id="fileupload">
    <span>SELECTED FILE: {{ fileName }}</span>
    <button @click="uploadFile">upload file</button>
  </div>
  <div class="container" id="fileload"  >
    <span>USER ID: {{ userID }}</span>
    <button @click="requestImage">load file</button>
  </div>
</div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, Ref } from 'vue'
import axios from 'axios'
import { homepage_data } from './datastore'

export default defineComponent({
  props: {
    reloadImage: Function
  },
  setup(props) {
    const fileName: Ref<string> = ref('')
    const file: Ref<File|null> = ref(null)
    const userID = computed(() => {
      return homepage_data.user_id
    })

    const onFileChanged = function(event: Event) {
      let target = (event.target as HTMLInputElement).files

      if(target) {
        file.value = target[0]
        fileName.value = target[0].name
      }
    }

    const uploadFile = function() {
      if(!file.value) return

      const data = new FormData()
      data.append('image', file.value, file.value.name)
      axios.post('http://localhost:3000/upload', data)
        .then((res) => {
          homepage_data.user_id = res.data
          // console.log(res.data)
        })
    }

    const requestImage = function() {
      axios.get('http://localhost:3000/getimage', { params: {user_id:  homepage_data.user_id}, responseType: 'blob' })
        .then((res) => {
          homepage_data.loaded_image = res.data

          if(props.reloadImage) props.reloadImage(res.data)

          // console.log(res)
          // const urlCreator = window.URL || window.webkitURL;
          // let image = (document.getElementById('myImage') as HTMLImageElement)
          // image.src = urlCreator.createObjectURL(res.data);
        })
    }

    return { fileName, userID, onFileChanged, uploadFile, requestImage }
  },
})
</script>

<style lang="scss">
  @import '@/assets/global.scss';

  #UPLOADER {
    background: $col_main_2;
    margin: 1em;
    padding: .5em 1em .5em 1em;

    min-width: 20em;
    // width: 60%;
    height: 8em;
    border-radius: .3em;
    
    display: flex;
    flex-direction: column;

    flex-basis: 0;
    flex-grow: 1;

    * {
      font-weight: bold;
    }

    .container {
      flex-basis: 0;
      flex-grow: 1;
      align-items: center;
      display: flex;

      span {
        flex-basis: 0;
        flex-grow: 3;
        color: white;
      }

      button {
        flex-basis: 0;
        flex-grow: 1;
        background: $col_side_2;
        border-width: 0;
        height: 80%;
        border-radius: .2em;
        color: white;
        cursor: pointer;
      }

      button:hover {
        background: lighten($color: $col_side_2, $amount: 10);
      }
    }
  }
</style>