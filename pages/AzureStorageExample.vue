<template>
  <div>
    <h1 class="text-4xl text-center">Azure Storage Example</h1>
    <div class="flex justify-center">
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="uploadFile">
        Upload image
      </button>
    </div>
    <h1 class="text-4xl text-center">Upload status: {{ uploadStatus }}</h1>
  </div>
</template>

<script>

export default {
  methods: {
    async uploadFile() {
      const input = document.createElement('input');
      input.type = 'file';
      input.onchange = async e => {
        var file = e.target.files[0];
        var response = await UploadImage(file.name, file)
        console.log(response)
        this.uploadStatus = response._response.status == 201 ? 'Successfully uploaded' : 'Upload failed'
      }
      input.click();
    }
  },
  data() {
    return {
      uploadStatus: 'Not started'
    }
  }
}
</script>

<style scoped>
* {
  color: white;
}
</style>
