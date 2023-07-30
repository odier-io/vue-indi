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

        <!-- ******************************************************************************************************* -->

        <li class="nav-item" role="presentation">

            <button class="nav-link active px-2 py-1" type="button" data-bs-toggle="tab" data-bs-target="#indi_home_pane" role="tab">
                <i class="bi bi-house"></i>
                Home
            </button>

        </li>

        <!-- ******************************************************************************************************* -->

        <li class="nav-item" role="presentation" v-for="(deviceName, deviceIndex) in Object.keys(devices)" :key="deviceIndex">

            <button class="nav-link xxxxxx px-2 py-1" type="button" data-bs-toggle="tab" :data-bs-target="`#indi_device_pane_${deviceIndex}`" role="tab">
                <i class="bi bi-diamond"></i>
                {{ deviceName }}
            </button>

        </li>

        <!-- ******************************************************************************************************* -->

        <li class="nav-item" role="presentation">

            <button class="nav-link xxxxxx px-2 py-1" type="button" data-bs-toggle="tab" data-bs-target="#indi_console_pane" role="tab">
                <i class="bi bi-terminal-fill"></i>
                Console
            </button>

        </li>

        <!-- ******************************************************************************************************* -->

    </ul>

    <!-- *********************************************************************************************************** -->

    <div class="tab-content mx-lg-5 mx-md-3 mx-0">

        <!-- ******************************************************************************************************* -->

        <div class="tab-pane fade show active" id="indi_home_pane" tabindex="0" role="tabpanel">

            <div class="row">
                <div class="col-md-6">

                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" role="switch" id="indi_main_switch /">
                        <label class="form-check-label" for="indi_main_switch">
                            Device switch
                        </label>
                    </div>

                </div>
                <div class="col-md-6">



                </div>
            </div>

        </div>

        <!-- ******************************************************************************************************* -->

        <div class="tab-pane fade xxxx xxxxxx" :id="`indi_device_pane_${deviceIndex}`" tabindex="0" role="tabpanel" v-for="(deviceInfo, deviceName, deviceIndex) in devices" :key="deviceName">

            <indi-device :device-name="deviceName" :device-info="deviceInfo" :device-index="deviceIndex" />

        </div>

        <!-- ******************************************************************************************************* -->

        <div class="tab-pane fade xxxx xxxxxx" id="indi_console_pane" tabindex="0" role="tabpanel">

            <textarea class="form-control" id="indi_console" readonly="readonly"></textarea>

        </div>

        <!-- ******************************************************************************************************* -->

    </div>

    <!-- *********************************************************************************************************** -->

</template>

<style scoped>
/*--------------------------------------------------------------------------------------------------------------------*/

.form-check-input {
    width: 2em;
    height: 1em;
}

.form-check-input::before {
    width: 2em;
    height: 2em;
}

/*--------------------------------------------------------------------------------------------------------------------*/

#indi_console {
    height: calc(100vh - 8rem);
}

/*--------------------------------------------------------------------------------------------------------------------*/
</style>
