
<template>
    <div class="flex h-screen overflow-hidden">
        <div class="w-1/5">
            <SideBar />
        </div>
        <div class="w-full bg-white dark:bg-slate-900">
            <Header />
            <slot />
        </div>
    </div>
</template>