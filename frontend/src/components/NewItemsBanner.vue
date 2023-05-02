<script setup lang="ts">
    defineProps<{
        title: String,
        subtitle: String,
    }>()
</script>

<template>
    <div id="banner-new-itens" class="relative my-8 cursor-pointer h-[180px]">
        <div class="z-30 absolute -top-5 -right-5 hover:-top-7 ease-in-out duration-300 overflow-hidden">
            <img 
                class="w-[110px] skew-x-[10deg] -skew-y-[10deg]" 
                src="@/assets/images/new_items/vuejs-4.png" 
                alt="item 1"
            >
        </div>
        <div class="z-40 absolute top-9 right-0 hover:top-7 ease-in-out duration-300 overflow-hidden">
            <img 
                class="w-[120px] " 
                src="@/assets/images/new_items/vscode.png" 
                alt="item 1"
            >
        </div>
        <div class="z-50 absolute top-16 right-10 hover:top-12 ease-in-out duration-300 overflow-hidden">
            <img 
                class="w-[170px] -skew-x-[15deg] skew-y-[15deg]" 
                src="@/assets/images/new_items/vuejs-1.png" 
                alt="item 1"
            >
        </div>

        <div class="absolute top-0 right-0 left-0 z-20 p-4 rounded-lg rounded-r-none backdrop-blur-xl">
            <p v-html="title" class="text-white text-xl md:text-3xl font-bungee-shade"></p>
        
            <div class="bg-white inline-block px-6 py-2 rounded-lg mt-10 font-bold text-slate-900">
                {{ subtitle }}
            </div>
        </div>

        <div 
            class="absolute left-0 right-20 top-0 h-[165px] w-100 z-10 rounded-lg 
            bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500"
        >
        </div>
    </div>  
</template>