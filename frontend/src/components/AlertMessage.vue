<script setup lang="ts">
    defineProps<{
        show: boolean,
        message: string,
        callback: Function
    }>()

</script>
<template>
    <div v-if="show" class="h-screen z-[250] fixed top-0 left-0 right-0
        flex flex-col justify-center items-center"
        @click.stop="callback()"
    >
        <div class="shadow-md shadow-gray-900 bg-white rounded-md flex flex-col w-80">
            <p class="text-center text-slate-900 pt-8 px-4">{{ message }}</p>
            
            <button aria-label="OK" @click="callback()" class="border-t rounded-md border-gray-100 mt-8 p-4 text-blue-500
                transition-all md:hover:bg-slate-100 active:bg-slate-100"
            >OK</button>
            
        </div>
    </div>
</template>