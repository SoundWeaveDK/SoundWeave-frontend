
import { SideBar } from '#build/components';
<template>
    <div class="flex h-screen overflow-hidden">
        <div class="w-1/5">
            <SideBar />
        </div>
        <div>
            <Header />
            <slot />
        </div>
    </div>
</template>