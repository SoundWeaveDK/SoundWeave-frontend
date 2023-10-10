<template>
    <div
        class="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-slate-900 dark:border-gray-600">
        <div class="grid h-full max-w-lg grid-cols-3 mx-auto font-medium">
            <router-link to="/" exact-active-class="active"
                class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                <Icon name="material-symbols:home-outline-sharp" color="lightgrey" size="1.5em" />
                <span
                    class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">{{
                        $t('home') }}</span>
            </router-link>
            <router-link exact-active-class="active" to="/explore"
                class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                <Icon name="material-symbols:explore-outline-rounded" color="lightgrey" size="1.5em" />
                <span
                    class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">{{
                        $t('explore') }}</span>
            </router-link>
            <router-link exact-active-class="active" to="/library"
                class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                <Icon name="material-symbols:subscriptions-outline-sharp" color="lightgrey" size="1.5em" />
                <span
                    class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">{{
                        $t('library') }}</span>
            </router-link>
        </div>
    </div>
</template>

<style>
.active {
    background-color: #3e39c0;
}
</style>
