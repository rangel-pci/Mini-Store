<script setup lang="ts">
    defineProps<{
        zIndex?: number,
        callback: Function,
        show: boolean,
    }>()

</script>

<template>
    <div 
        @click="() => callback()"
        id="bottom-offcanvas"
        :class="`flex flex-col justify-end h-full
        fixed left-0 right-0 transition-all duration-200 pt-4 pb-14 z-[${zIndex ?? 100}] ${show ? 'top-0' : 'top-full'}`"
    >
        <div class="bg-slate-800 p-4 pt-2 rounded-t-3xl overflow-y-scroll z-[100] md:w-[600px] md:mx-auto">
            <div class="w-16 h-1 rounded bg-slate-700 mx-auto mt-2"></div>
            <div class="content text-gray-300 mt-8">
                <slot></slot>
            </div>
        </div>
    </div>
</template>