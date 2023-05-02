<script setup lang="ts">
    import { ArrowLeft24Filled } from '@vicons/fluent'
    import { Icon } from '@vicons/utils'
    import { toRefs, watch } from 'vue';
    
    const props = defineProps<{
        show: boolean,
        onReturn: Function,
        title?: string,
        id: string,
    }>()

    const { show, id } = toRefs(props)

    watch(show, (newValue) => {
        newValue ? document.getElementById(id.value)?.scrollTo(0,0) : false
    })
</script>

<template>
    <div :id="id" :class="`md:w-[600px] md:mx-auto overflow-x-hidden overflow-y-scroll flex flex-col min-h-full
        bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500
        fixed bottom-0 left-0 right-0 z-[200] pt-16 transition-all duration-500 ${show ? 'top-0' : 'top-full'}`"
    >
        <div :class="`md:w-[500px] md:mx-auto bg-slate-800 -z-20 bg-opacity-50 fixed transition-all duration-700 mt-14 left-0 right-0 bottom-0
            w-10/12 mx-auto h-10 rounded-t-3xl ${show ? '-top-2' : 'top-full'}`"></div>
        <div :class="`md:w-[550px] md:mx-auto bg-slate-800  -z-10 fixed transition-all duration-[600ms] mt-14 left-0 right-0 bottom-0
            w-11/12 mx-auto h-10 rounded-t-3xl ${show ? 'top-0' : 'top-full'}`"></div>

        <p :class="`text-center block py-4 absolute top-0 text-white transition-all duration-300 ${show ? 'left-0 right-0' : 'left-full'}`">
            {{ title }}
        </p>
        <button  aria-label="return" @click="onReturn()" :class="`z-[201] px-4 py-4 fixed top-0 text-white active:text-slate-400 transition-all duration-300 cursor-pointer ${show ? 'left-0 md:left-1/3' : 'left-full'}`">
            <Icon size="30">
                <ArrowLeft24Filled/>
            </Icon>
        </button>

        <div class="flex-1 bg-slate-900 pt-8 rounded-t-3xl flex flex-col justify-between">
            <div>
                <slot name="content"></slot>
            </div>

            <div class="bg-slate-800 pb-4 p-4 pt-2 mt-4 rounded-t-3xl">
                <div class="w-16 h-1 rounded bg-slate-700 mx-auto mb-8 mt-2"></div>
                <div>
                    <slot name="footer"></slot>
                </div>
            </div>
        </div>
    </div>
</template>