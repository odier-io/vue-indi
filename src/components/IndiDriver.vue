<script setup>
/*--------------------------------------------------------------------------------------------------------------------*/

import vSelect from 'vue-select';

import 'vue-select/dist/vue-select.css';

/*--------------------------------------------------------------------------------------------------------------------*/

import useIndiStore from '../stores/indi';

/*--------------------------------------------------------------------------------------------------------------------*/

const indiStore = useIndiStore();

/*--------------------------------------------------------------------------------------------------------------------*/
</script>

<template>

    <!-- *********************************************************************************************************** -->

    <div class="card mx-auto mb-3">
        <div class="card-header px-3 py-2">
            <i class="bi bi-cpu"></i>
            Drivers
        </div>
        <div class="card-body px-3 py-2">

            <table class="table table-sm table-striped">
                <thead>
                    <tr>
                        <th>Device</th>
                        <th>Driver</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>CCD camera</td>
                        <td><v-select :options="indiStore.drivers"></v-select></td>
                    </tr>
                    <tr>
                        <td>Guiding camera</td>
                        <td><v-select :options="indiStore.drivers"></v-select></td>
                    </tr>
                </tbody>
            </table>

        </div>
    </div>

    <!-- *********************************************************************************************************** -->

</template>
