<script setup>
/*--------------------------------------------------------------------------------------------------------------------*/

import { ref, onMounted } from 'vue';

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

const terminal = new Terminal({ convertEol: true, fontFamily: 'Ubuntu Mono, courier-new, courier, monospace' });

/*--------------------------------------------------------------------------------------------------------------------*/

onMounted(() => {

    terminal.open(terminalDiv.value);
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
                            Console
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>

                    <div class="modal-body bg-black px-3 py-2">

                        <div class="rounded" ref="terminalDiv"></div>

                    </div>

                </div>
            </div>
        </div>

    </teleport>

    <!-- *********************************************************************************************************** -->

</template>
