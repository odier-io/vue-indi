<script setup>
/*--------------------------------------------------------------------------------------------------------------------*/

import { inject } from 'vue';

/*--------------------------------------------------------------------------------------------------------------------*/
/* VARIABLES                                                                                                          */
/*--------------------------------------------------------------------------------------------------------------------*/

const indi = inject('indi');
const sock = inject('sock');

/*--------------------------------------------------------------------------------------------------------------------*/

const props = defineProps({
    defNumberVector: {
        type: Object,
        default: {},
    },
});

/*--------------------------------------------------------------------------------------------------------------------*/

const colors = {
    'Idle': 'secondary',
    'Ok': 'primary',
    'Busy': 'warning',
    'Alert': 'danger',
};

/*--------------------------------------------------------------------------------------------------------------------*/
/* FUNCTIONS                                                                                                          */
/*--------------------------------------------------------------------------------------------------------------------*/

const sendMessage = () => {

    const message = indi.buildNewNumberVectorMessage(props.defNumberVector);

    if(message)
    {
        sock.emit('indi', message);
    }
};

/*--------------------------------------------------------------------------------------------------------------------*/
</script>

<template>

    <!-- *********************************************************************************************************** -->

    <div class="row">

        <!-- ******************************************************************************************************* -->

        <label class="col-lg-2">
            <span :class="`text-${colors[defNumberVector['@state']]}`">
                <i class="bi bi-circle-fill"></i>
            </span>
            {{ defNumberVector['@label'] || defNumberVector['@name'] }}
        </label>

        <!-- ******************************************************************************************************* -->

        <div :class="{'col-lg-10': defNumberVector['@perm'] === 'ro', 'col-lg-9': defNumberVector['@perm'] !== 'ro'}">

            <template v-for="defNumber in defNumberVector['children']">

                <div class="input-group input-group-sm mb-1">

                    <span class="input-group-text" style="min-width: 175px;">
                        {{ defNumber['@label'] || defNumber['@name'] }}
                    </span>

                    <input class="form-control" type="number" :min="defNumber['@min']" :max="defNumber['@max']" :step="defNumber['@step']" :readonly="defNumberVector['@perm'] === 'ro'" v-model="defNumber['$']" />

                </div>

            </template>

        </div>

        <!-- ******************************************************************************************************* -->

        <div class="col-lg-1 pb-1" v-if="defNumberVector['@perm'] !== 'ro'">

            <button class="btn btn-xs btn-outline-primary h-100 w-100" @click="sendMessage()">
                Apply
            </button>

        </div>

        <!-- ******************************************************************************************************* -->

    </div>

    <!-- *********************************************************************************************************** -->

</template>
