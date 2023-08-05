<script setup>
/*--------------------------------------------------------------------------------------------------------------------*/

import IndiTextVector from '../controls/IndiTextVector.vue';
import IndiNumberVector from '../controls/IndiNumberVector.vue';
import IndiSwitchVector from '../controls/IndiSwitchVector.vue';
import IndiLightVector from '../controls/IndiLightVector.vue';

/*--------------------------------------------------------------------------------------------------------------------*/

defineProps({
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

        <indi-light-vector :def-light-vector="property" v-else-if="property['<>'] === 'defLightVector'" />

    </div>

    <!-- *********************************************************************************************************** -->

</template>
