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
        default: ''
    },
    options: {
        type: Array,
        default: [],
    },
});

/*--------------------------------------------------------------------------------------------------------------------*/

const localModelValue = ref(props.modelValue);

watch(() => props.modelValue, (value) => {

    localModelValue.value = value;
});

/*--------------------------------------------------------------------------------------------------------------------*/

const filteredOptions = computed(() => props.options.filter((option) => !localModelValue.value || option.includes(localModelValue.value)).sort());

/*--------------------------------------------------------------------------------------------------------------------*/

const updateValue = (value) => {

    localModelValue.value = value;

    emit('update:modelValue', value);
};

/*--------------------------------------------------------------------------------------------------------------------*/
</script>

<template>

    <!-- *********************************************************************************************************** -->

    <div className="dropdown" v-bind="$attrs">

        <input type="text" :value="localModelValue" @input="updateValue($event.target.value)" data-bs-toggle="dropdown" />

        <ul className="dropdown-menu">
            <li v-for="option in filteredOptions">
                <a className="dropdown-item" href="#" @click.prevent="updateValue(option)">
                    {{option}}
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
</style>
