<script setup>
/*--------------------------------------------------------------------------------------------------------------------*/

import IndiTextVector from './controls/IndiTextVector.vue';
import IndiNumberVector from './controls/IndiNumberVector.vue';
import IndiSwitchVector from './controls/IndiSwitchVector.vue';

/*--------------------------------------------------------------------------------------------------------------------*/

const props = defineProps({
    groupInfo: {
        type: Object,
        default: {},
    },
});

/*--------------------------------------------------------------------------------------------------------------------*/
</script>

<template>

    <!-- *********************************************************************************************************** -->

    <div v-for="property in Object.values(groupInfo)">

        <indi-text-vector :def-text-vector="property" v-if="property['<>'] === 'defTextVector'" />

        <indi-number-vector :def-number-vector="property" v-else-if="property['<>'] === 'defNumberVector'" />

        <indi-switch-vector :def-switch-vector="property" v-else-if="property['<>'] === 'defSwitchVector'" />

    </div>

    <!-- *********************************************************************************************************** -->

</template>
