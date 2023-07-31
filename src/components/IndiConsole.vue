<script setup>
/*--------------------------------------------------------------------------------------------------------------------*/

import { ref, onMounted, watchEffect } from 'vue';

import { Terminal } from 'xterm';

import 'xterm/css/xterm.css';

/*--------------------------------------------------------------------------------------------------------------------*/

import useMessageStore from '../stores/messages';

/*--------------------------------------------------------------------------------------------------------------------*/

const messageStore = useMessageStore();

/*--------------------------------------------------------------------------------------------------------------------*/

const props = defineProps({
    deviceName: {
        type: String,
        default: '',
    },
});

/*--------------------------------------------------------------------------------------------------------------------*/

const terminalDiv = ref(null);

/*--------------------------------------------------------------------------------------------------------------------*/

let terminal = null;


alert('Hello');
/*--------------------------------------------------------------------------------------------------------------------*/

onMounted(() => {

    if(terminal == null)
    {
        terminal = new Terminal({convertEol: true, fontFamily: 'Ubuntu Mono, courier-new, courier, monospace'});

        terminal.open(terminalDiv.value);
    }
});

/*--------------------------------------------------------------------------------------------------------------------*/

watchEffect(() => {

    if(terminal != null)
    {
        terminal.clear();

        terminal.write(messageStore.getMessagesForDevice(props.deviceName));

        console.log(messageStore.getMessagesForDevice(props.deviceName));
    }
});

/*--------------------------------------------------------------------------------------------------------------------*/
</script>

<template>

    <!-- *********************************************************************************************************** -->

    <button class="btn btn-xs btn-secondary" type="button" data-bs-toggle="modal" data-bs-target="#indi_console">
        <i class="bi bi-card-text"></i>
        logs
    </button>

    <!-- *********************************************************************************************************** -->

    <teleport to="body">

        <div class="modal" tabindex="-1" id="indi_console">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">

                    <div class="modal-header px-3 py-2">
                        <h5 class="modal-title">
                            <i class="bi bi-card-text"></i>
                            {{ deviceName }}
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>

                    <div class="modal-body rounded-bottom bg-black px-3 py-2" ref="terminalDiv"></div>

                </div>
            </div>
        </div>

    </teleport>

    <!-- *********************************************************************************************************** -->

</template>
