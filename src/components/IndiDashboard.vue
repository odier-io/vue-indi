<script setup>
/*--------------------------------------------------------------------------------------------------------------------*/

import {computed, reactive} from 'vue';

import IndiDevice from './IndiDevice.vue';

/*--------------------------------------------------------------------------------------------------------------------*/

const props = defineProps({
    defMessages: {
        type: Object,
        default: {},
    },
});

/*--------------------------------------------------------------------------------------------------------------------*/

const state = reactive({
   onOff: 'off',
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

    <ul class="nav nav-tabs mb-4" role="tablist">

        <!-- ******************************************************************************************************* -->

        <li class="nav-item" role="presentation">

            <button class="nav-link active px-3 py-2" type="button" data-bs-toggle="tab" data-bs-target="#indi_home_pane" role="tab">
                <i class="bi bi-house"></i>
                Home
            </button>

        </li>

        <!-- ******************************************************************************************************* -->

        <li class="nav-item" role="presentation" v-for="(deviceName, deviceIndex) in Object.keys(devices)" :key="deviceIndex">

            <button class="nav-link xxxxxx px-3 py-2" type="button" data-bs-toggle="tab" :data-bs-target="`#indi_device_pane_${deviceIndex}`" role="tab">
                <i class="bi bi-diamond"></i>
                {{ deviceName }}
            </button>

        </li>

        <!-- ******************************************************************************************************* -->

        <li class="nav-item" role="presentation">

            <button class="nav-link xxxxxx px-3 py-2" type="button" data-bs-toggle="tab" data-bs-target="#indi_console_pane" role="tab">
                <i class="bi bi-file-text"></i>
                Console
            </button>

        </li>

        <!-- ******************************************************************************************************* -->

    </ul>

    <!-- *********************************************************************************************************** -->

    <div class="tab-content mx-lg-5 mx-md-3 mx-0">

        <!-- ******************************************************************************************************* -->

        <div class="tab-pane fade show active" id="indi_home_pane" tabindex="0" role="tabpanel">

            <div class="H-100">

                <div class="card m-auto" style="width: 1200px;">
                    <div class="card-header px-3 py-2">
                        <i class="bi bi-house"></i>
                        Home
                    </div>
                    <div class="card-body px-3 py-5">

                        <div class="row">
                            <div class="col-md-6 text-center align-self-center">

                                <div class="btn-group" role="group" aria-label="Basic radio toggle button group">

                                    <input type="radio" class="btn-check" name="D0129CB6" id="DE92759F" autocomplete="off" value="on" v-model="state.onOff">
                                    <label class="btn btn-outline-primary" for="DE92759F">
                                        Turn on devices
                                    </label>

                                    <input type="radio" class="btn-check" name="D0129CB6" id="D8FB7C2E" autocomplete="off" value="off" v-model="state.onOff">
                                    <label class="btn btn-outline-secondary" for="D8FB7C2E">
                                        Turn off devices
                                    </label>

                                </div>

                            </div>
                            <div class="col-md-6 text-center align-self-center">

                                <svg xmlns="http://www.w3.org/2000/svg" width="250" height="250" :fill="state.onOff === 'on' ? '#0d6efd' : '#6c757d'" viewBox="0 0 16 16">
                                    <path d="m16 15.5c0 0.27615-0.22386 0.50002-0.50002 0.50002h-3.0001c-0.66652-1.64e-4 -0.66652-1.0002 0-1h2.5001v-2.5001c4.9e-4 -0.6662 1.0005-0.6662 1 0z" /><path d="m16 0.50002c0-0.27615-0.22386-0.50002-0.50002-0.50002h-3.0001c-0.66652 1.6328e-4 -0.66652 1.0002 0 1h2.5001v2.5001c4.9e-4 0.6662 1.0005 0.6662 1 0z" /><path d="m1.7984e-7 15.5c0 0.27615 0.22386 0.50002 0.50002 0.50002h3.0001c0.66652-1.63e-4 0.66652-1.0002 0-1h-2.5001v-2.5001c-4.8972e-4 -0.6662-1.0005-0.6662-1 0z" /><path d="m1.7984e-7 0.50002c0-0.27615 0.22386-0.50002 0.50002-0.50002h3.0001c0.66652 1.6328e-4 0.66652 1.0002 0 1h-2.5001v2.5001c-4.8972e-4 0.6662-1.0005 0.6662-1 0z" /><path d="m8.0273 3c0.13476 0.0095135 0.26484 0.091406 0.31641 0.24609l0.64453 1.9375c0.28785 0.86331 0.96661 1.5407 1.8301 1.8281l1.9355 0.64453c0.33 0.11 0.33 0.57555 0 0.68555l-1.9375 0.64648c-0.86331 0.28785-1.5407 0.96465-1.8281 1.8281l-0.64453 1.9355c-0.047321 0.14419-0.16278 0.22743-0.28711 0.24609a8 5 0 0 0 7.9434-4.998 8 5 0 0 0-7.9727-5zm-0.082031 0.0019531a8 5 0 0 0-7.9453 4.998 8 5 0 0 0 7.9453 4.998c-0.12433-0.01866-0.23979-0.10191-0.28711-0.24609l-0.64648-1.9355c-0.28764-0.86309-0.96503-1.5405-1.8281-1.8281l-1.9355-0.64648c-0.33124-0.10871-0.33124-0.57684 0-0.68555l1.9355-0.64453c0.86309-0.28764 1.5405-0.96503 1.8281-1.8281l0.64648-1.9375c0.047882-0.14365 0.16304-0.22555 0.28711-0.24414zm3.3047 1.248c0.028794 0 0.057362 0.015835 0.068359 0.048828l0.12891 0.38867c0.05756 0.17263 0.19257 0.30777 0.36523 0.36523l0.38867 0.12891c0.06599 0.021996 0.06599 0.11472 0 0.13672l-0.38867 0.12891c-0.17263 0.057559-0.30777 0.19257-0.36523 0.36523l-0.12891 0.38867c-0.02174 0.066235-0.11498 0.066235-0.13672 0l-0.12891-0.38867c-0.057518-0.17259-0.19265-0.30772-0.36523-0.36523l-0.38867-0.12891c-0.06624-0.021738-0.06624-0.11498 0-0.13672l0.38867-0.12891c0.17258-0.057518 0.30772-0.19265 0.36523-0.36523l0.12891-0.38867c0.011-0.032993 0.039565-0.048828 0.068359-0.048828z" />
                                </svg>

                            </div>
                        </div>

                    </div>
                </div>

            </div>

        </div>

        <!-- ******************************************************************************************************* -->

        <div class="tab-pane fade xxxx xxxxxx" :id="`indi_device_pane_${deviceIndex}`" tabindex="0" role="tabpanel" v-for="(deviceInfo, deviceName, deviceIndex) in devices" :key="deviceName">

            <div class="H-100">

                <indi-device :device-name="deviceName" :device-info="deviceInfo" :device-index="deviceIndex" />

            </div>

        </div>

        <!-- ******************************************************************************************************* -->

        <div class="tab-pane fade xxxx xxxxxx" id="indi_console_pane" tabindex="0" role="tabpanel">

            <div class="H-100">

               <textarea class="form-control" id="indi_console" readonly="readonly"></textarea>

            </div>

        </div>

        <!-- ******************************************************************************************************* -->

    </div>

    <!-- *********************************************************************************************************** -->

</template>

<style scoped>
/*--------------------------------------------------------------------------------------------------------------------*/

.H-100 {
    display: flex;
    min-height: calc(100vh - 16rem);
}

/*--------------------------------------------------------------------------------------------------------------------*/
</style>
