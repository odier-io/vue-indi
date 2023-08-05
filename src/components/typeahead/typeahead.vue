<script setup>
/*--------------------------------------------------------------------------------------------------------------------*/

import { defineProps, defineEmits } from 'vue';

import 'bootstrap/js/src/dropdown';

/*--------------------------------------------------------------------------------------------------------------------*/

const emit = defineEmits(['update:modelValue']);

/*--------------------------------------------------------------------------------------------------------------------*/

defineProps({
    modelValue: String,
    options: {
        type: Array,
        default: [],
    },
});

/*--------------------------------------------------------------------------------------------------------------------*/

const updateValue = (e) => {

    emit('update:modelValue', e.target.value);
};

/*--------------------------------------------------------------------------------------------------------------------*/
</script>

<template>

    <!-- *********************************************************************************************************** -->

    <div class="dropdown" v-bind="$attrs">

        <input type="text" :value="modelValue" @input="updateValue" data-bs-toggle="dropdown" />

        <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
            <li><a class="dropdown-item" href="#">Separated link</a></li>
        </ul>

    </div>

    <!-- *********************************************************************************************************** -->

</template>

<style scoped>
/*--------------------------------------------------------------------------------------------------------------------*/

input {
    border: none;
    background-color: transparent;
    margin: 0;
    padding: 0;
    outline: none;
    width: 100%;
}

/*--------------------------------------------------------------------------------------------------------------------*/
</style>
