<template>
  <div>
    <h1 class="text-4xl text-center">Azure Storage Example</h1>
    <div class="flex justify-center">
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="uploadFile">
        Upload File
      </button>
    </div>
  </div>
</template>

<script>

export default {
  methods: {
    async uploadFile() {
      const input = document.createElement('input');
      input.type = 'file';
      input.onchange = e => {
        // getting a hold of the file reference
        var file = e.target.files[0];
        // read as buffer to get the raw bytes and log to console
        var reader = new FileReader();
        reader.readAsArrayBuffer(file);

        reader.onloadend = async function (evt) {
          UploadImage(evt.target.result, file.name);
        }
      }
      input.click();
    }
  }
}
</script>

<style scoped>
* {
  color: white;
}
</style>
