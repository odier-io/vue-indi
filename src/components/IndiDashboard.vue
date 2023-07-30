<script setup>
/*--------------------------------------------------------------------------------------------------------------------*/

import { computed } from 'vue';

import IndiDevice from './IndiDevice.vue';

/*--------------------------------------------------------------------------------------------------------------------*/

const props = defineProps({
    defMessages: {
        type: Object,
        default: {},
    },
});

/*--------------------------------------------------------------------------------------------------------------------*/

const devices = computed(() => {

    const result = {};

    Object.values(props.defMessages).forEach((message) => {

        if(!('@group' in message) || !message['@group'])
        {
            message['@group'] = 'Main Control';
        }

        /*------------------------------------------------------------------------------------------------------------*/

        let device;

        if(message['@device'] in result) {
            device = result[message['@device']] ; //;
        }
        else {
            device = result[message['@device']] = {};
        }

        /*------------------------------------------------------------------------------------------------------------*/

        let group;

        if(message['@group'] in device) {
            group = device[message['@group']] ; //;
        }
        else {
            group = device[message['@group']] = {};
        }

        /*------------------------------------------------------------------------------------------------------------*/

        group[message['@name']] = message;

        /*------------------------------------------------------------------------------------------------------------*/
    });

    return result;
});

/*--------------------------------------------------------------------------------------------------------------------*/
</script>

<template>

    <!-- *********************************************************************************************************** -->

    <ul class="nav nav-tabs mb-3" role="tablist">

        <li class="nav-item" role="presentation" v-for="(deviceName, deviceIndex) in Object.keys(devices)" :key="deviceIndex">

            <button :class="`nav-link ${deviceIndex === 0 ? 'active' : ''} px-2 py-1`" type="button" data-bs-toggle="tab" :data-bs-target="`#device_pane_${deviceIndex}`" role="tab">
                <i class="bi bi-diamond"></i>
                {{ deviceName }}
            </button>

        </li>

        <li class="nav-item" role="presentation">

            <button class="nav-link px-2 py-1" type="button" data-bs-toggle="tab" data-bs-target="#device_pane_console" role="tab">
                <i class="bi bi-terminal-fill"></i>
                Console
            </button>

        </li>

    </ul>

    <!-- *********************************************************************************************************** -->

    <div class="tab-content mx-lg-5 mx-md-3 mx-0">

        <!-- ******************************************************************************************************* -->

        <div :class="`tab-pane fade ${deviceIndex === 0 ? 'show active' : ''}`" :id="`device_pane_${deviceIndex}`" tabindex="0" role="tabpanel" v-for="(deviceInfo, deviceName, deviceIndex) in devices" :key="deviceName">

            <indi-device :device-name="deviceName" :device-info="deviceInfo" :device-index="deviceIndex" />

        </div>

        <!-- ******************************************************************************************************* -->

        <div class="tab-pane fade" id="device_pane_console" tabindex="0" role="tabpanel">


        </div>

        <!-- ******************************************************************************************************* -->

    </div>

    <!-- *********************************************************************************************************** -->

</template>
