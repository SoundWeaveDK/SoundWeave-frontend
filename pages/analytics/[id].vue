<template>
    <h1 class="text-4xl font-bold text-center text-black dark:text-white py-4">{{ podcastData.podcast_name }}</h1>
    <div v-if="podcastData && countryData" class="grid grid-cols-4 gap-4 p-12 pt-0 h-full">
        <div class="col-span-2 bg-white p-4 rounded-lg shadow-lg">
            <!-- Views -->
            <!-- centered text -->
            <div class="text-center">
                <h2 class="text-2xl font-bold text-gray-800">{{ $t('listens') }}</h2>
                <p class="text-gray-700 text-3xl font-bold">{{ podcastData.views }}</p>
            </div>
        </div>

        <div class="col-span-1 bg-white p-4 rounded-lg shadow-lg">
            <div class="text-center">
                <!-- Money -->
                <h2 class="text-2xl font-bold text-gray-800">{{ $t('income') }}</h2>
                <p class="text-gray-700 text-3xl font-bold">{{ podcastData.views / 2 }}kr</p>
            </div>
        </div>

        <div class="col-span-1 bg-white p-4 rounded-lg shadow-lg">
            <div class="text-center">
                <!-- Likes -->
                <h2 class="text-2xl font-bold text-gray-800">{{ $t('likes') }}</h2>
                <p class="text-gray-700 text-3xl font-bold">{{ podcastData.likes }}</p>
            </div>
        </div>


        <div class="col-span-2 bg-white p-4 rounded-lg shadow-lg ">
            <Line v-if="lineData.labels.length > 0" :data="lineData" :options="lineOptions" />
        </div>

        <div class="col-span-2 bg-white p-4 rounded-lg shadow-lg">
            <Pie v-if="pieData.labels.length > 0" :options="pieOptions" :data="pieData" />
        </div>

        <div class="col-span-4 bg-white p-4 rounded-lg shadow-lg">
            <!-- show top 3 contries -->
            <h2 class="text-2xl font-bold text-gray-800 p-4">{{ $t('top3') }}</h2>
            <div class="grid grid-cols-3 gap-4">
                <div v-for="(country, index) in countryData.slice(0, 3)" :key="index"
                    class="bg-gray-100 p-4 rounded-lg shadow-lg flex">
                    <p class="text-gray-700 text-3xl font-bold">{{ country.country_name }}: &nbsp; </p>
                    <p class="text-gray-700 text-3xl font-bold">{{ country.amount }}</p>
                </div>
            </div>
        </div>
    </div>
    <div v-else class="flex justify-center items-center h-screen">
        <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
    </div>
</template>

<script setup>

definePageMeta({
    middleware: ["auth"]
})
</script>

<script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js'
import { Pie } from 'vue-chartjs'
import { Line } from 'vue-chartjs'
import axios from '@/utils/axiosInstance.ts'
import { useUserStore } from "../stores/login"
import { mapStores } from "pinia";

ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend)


export default {
    components: { Pie, Line },
    computed: {
        ...mapStores(useUserStore)
    },
    created() {
        this.getPodcast()
        this.getPie()
        this.getLine()
        this.getCountryData()
    },

    data() {
        return {
            podcastData: [],
            countryData: [],
            pieData: {
                labels: [],
                datasets: [
                    {
                        backgroundColor: [],
                        data: []
                    }
                ]
            },
            pieOptions: {
                responsive: true,
                maintainAspectRatio: false
            },
            lineData: {
                labels: [],
                datasets: [
                    {
                        // translate the labels to the users language with i18n
                        label: this.$t('listens'),
                        backgroundColor: '#f87979',
                        data: []
                    }
                ]
            },
            lineOptions: {
                responsive: true,
                maintainAspectRatio: false
            },
        }
    },
    methods: {
        async getPodcast() {
            await axios.get('/api/podcast/read-single-podcast/' + this.$route.params.id, {
                headers: {
                    Authorization: `Bearer ${this.userStore.getAccessToken}`,
                }
            }).then((response) => {
                if (response.status === 200) {
                    this.podcastData = response.data
                }
            }).catch((error) => {
                if (error) {
                    console.log(error);
                }
            });
        },
        async getPie() {
            await axios.get('/api/podcastanalytics/read-podcast-analytics/' + this.$route.params.id, {
                headers: {
                    Authorization: `Bearer ${this.userStore.getAccessToken}`,
                }
            }).then((response) => {
                if (response.status === 200) {
                    //{
                    //     "fk_podcast_id": {
                    //         "views": 1,
                    //         "likes": 0
                    //     },
                    //     "fk_user_id": {
                    //         "fk_country_id": {
                    //             "country_name": "Deutschland"
                    //         },
                    //         "fk_gender_id": {
                    //             "gender_name": "Male"
                    //         }
                    //     }
                    // }

                    // labels are the gender_name. backgroundColor is random. data is the amount users of that gender
                    let labels = []
                    let backgroundColor = []
                    let data = []
                    for (const value of Object.entries(response.data)) {
                        // add the gender name to the labels array but only if it is not already in there
                        if (!labels.includes(value[1].fk_user_id.fk_gender_id.gender_name)) {
                            labels.push(value[1].fk_user_id.fk_gender_id.gender_name)
                        }
                        let genderIndex = labels.indexOf(value[1].fk_user_id.fk_gender_id.gender_name)
                        // if the country is not in the data array yet, add it
                        if (data[genderIndex] === undefined) {
                            data[genderIndex] = 1
                        } else {
                            // if the country is already in the data array, add 1 to the amount
                            data[genderIndex] += 1
                        }
                        // add a random color to the backgroundColor array for every data entry in the data array
                        for (let i = 0; i < data.length; i++) {
                            backgroundColor[i] = '#' + Math.floor(Math.random() * 16777215).toString(16)
                        }
                    }
                    this.pieData.labels = labels
                    this.pieData.datasets[0].backgroundColor = backgroundColor
                    this.pieData.datasets[0].data = data
                }
            }).catch((error) => {
                if (error) {
                    console.log(error);
                }
            });
        },
        async getLine() {
            await axios.get('/api/podcastanalytics/read-podcast-analytics/' + this.$route.params.id, {
                headers: {
                    Authorization: `Bearer ${this.userStore.getAccessToken}`,
                }
            }).then((response) => {
                if (response.status === 200) {
                    //                     {
                    //     "createdAt": "2023-10-21T23:55:34.807Z",
                    //     "fk_podcast_id": {
                    //         "views": 2,
                    //         "likes": 0
                    //     },
                    //     "fk_user_id": {
                    //         "fk_country_id": {
                    //             "country_name": "Deutschland"
                    //         },
                    //         "fk_gender_id": {
                    //             "gender_name": "Male"
                    //         }
                    //     }
                    // }
                    let labels = []
                    let data = []
                    // labels are the timestamps without seconds per hour. data is the amount of listeners per hour
                    // make time format to YYYY-MM-DD HH:00 rounded to the hour
                    // add 0 to the hour if it is only one digit
                    for (const value of Object.entries(response.data)) {
                        let date = new Date(value[1].createdAt)
                        let hour = date.getHours()
                        if (hour < 10) {
                            hour = '0' + hour
                        }
                        let time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + hour + ':00'
                        // add the time to the labels array but only if it is not already in there
                        if (!labels.includes(time)) {
                            labels.push(time)
                        }
                        let timeIndex = labels.indexOf(time)
                        // if the time is not in the data array yet, add it
                        if (data[timeIndex] === undefined) {
                            data[timeIndex] = 1
                        } else {
                            // if the time is already in the data array, add 1 to the amount
                            data[timeIndex] += 1
                        }
                    }
                    this.lineData.labels = labels
                    this.lineData.datasets[0].data = data


                }
            }).catch((error) => {
                if (error) {
                    console.log(error);
                }
            });

        },
        async getCountryData() {
            await axios.get('/api/podcastanalytics/read-podcast-analytics/' + this.$route.params.id, {
                headers: {
                    Authorization: `Bearer ${this.userStore.getAccessToken}`,
                }
            }).then((response) => {
                if (response.status === 200) {
                    // get the country name and the amount of listeners from that country
                    // add the country name and the amount of listeners to the countryData array
                    // if the country is not in the countryData array yet, add it
                    // if the country is already in the countryData array, add 1 to the amount
                    for (const value of Object.entries(response.data)) {
                        let country = value[1].fk_user_id.fk_country_id.country_name
                        let countryIndex = this.countryData.findIndex(x => x.country_name === country)
                        if (countryIndex === -1) {
                            this.countryData.push({
                                country_name: country,
                                amount: 1
                            })
                        } else {
                            this.countryData[countryIndex].amount += 1
                        }
                    }
                    // sort the countryData array by the amount of listeners
                    this.countryData.sort((a, b) => (a.amount < b.amount) ? 1 : -1)
                }
            }).catch((error) => {
                if (error) {
                    console.log(error);
                }
            });

        }
    }
}
</script>