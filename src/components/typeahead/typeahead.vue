<script setup>
/*--------------------------------------------------------------------------------------------------------------------*/

import { ref, watch, computed, defineProps, defineEmits } from 'vue';

import 'bootstrap/js/src/dropdown';

/*--------------------------------------------------------------------------------------------------------------------*/

const emit = defineEmits([
    'update:modelValue'
]);

/*--------------------------------------------------------------------------------------------------------------------*/

const props = defineProps({
    modelValue: {
        type: String,
        default: '',
    },
    options: {
        type: Array,
        default: () => [],
        validator: (options) => options.every(option => option.hasOwnProperty('value') && option.hasOwnProperty('label'))
    },
});

/*--------------------------------------------------------------------------------------------------------------------*/

const localModelValue = ref(props.modelValue);

watch(() => props.modelValue, (value) => {

    localModelValue.value = value;
});

/*--------------------------------------------------------------------------------------------------------------------*/

const filteredOptions = computed(() => props.options.filter((option) => !localModelValue.value || option.label.includes(localModelValue.value)).sort((x, y) => x.label.toLowerCase().localeCompare(y.label.toLowerCase())));

/*--------------------------------------------------------------------------------------------------------------------*/

const updateValue = (value) => {

    localModelValue.value = value;

    emit('update:modelValue', value);
};

/*--------------------------------------------------------------------------------------------------------------------*/
</script>

<template>

    <!-- *********************************************************************************************************** -->

    <div class="dropdown" v-bind="$attrs">

        <input type="text" :value="localModelValue" @input="updateValue($event.target.value)" data-bs-toggle="dropdown" />

        <ul class="dropdown-menu">
            <li v-for="option in filteredOptions">
                <a class="dropdown-item" href="#" @click.prevent="updateValue(option.value)">
                    {{option.label}}
                </a>
            </li>
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

.dropdown-menu {
    z-index: 1000;
}

/*--------------------------------------------------------------------------------------------------------------------*/
</style>
