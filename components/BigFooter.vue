<template>
  <div class="grid grid-cols-2 gap-4 p-8 h-full">
    <div class="h-full w-full">
      <div>
        <h1 class="text-4xl font-bold text-black dark:text-white p-4 w-fit mx-auto">

          {{ podcast.title }}
        </h1>
        <img :src="podcast.imageSrc" alt="Podcast Image" class="w-96 h-96 m-auto" />
      </div>
      <div class="flex">
        <div class="flex justify-between">
          <div>
            <!-- like and dislike -->
          </div>
          <div>
            <!-- listens -->
            <p class="text-black dark:text-white text-2xl font-bold">
              <Icon name="fluent:headphones-sound-wave-20-filled" class="mr-2" />
              {{ podcast.listens }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div>
      <!-- comment box -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isPlaying: false,
      currentTime: "0:00",
      duration: "0:00",
      progress: 0,
      volume: 1,
      podcast: {
        title: "Crown",
        artist: "Kendrick Lamar",
        audioSrc: "/audio/crown.mp3",
        imageSrc: "/images/crown.jpg",
        listens: 4600000,
        comments: [
          {
            id: 1,
            name: "John Doe",
            comment: "This is a comment",
          },
          {
            id: 2,
            name: "Jane Doe",
            comment: "This is another comment",
          },
        ],
      },
    };
  },
};
</script>
