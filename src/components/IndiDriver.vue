<script setup>
/*--------------------------------------------------------------------------------------------------------------------*/

import vueSelect from 'vue-select';

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
                        <th class="w-50">Device</th>
                        <th class="w-50">Driver</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>CCD camera</td>
                        <td><vue-select :options="indiStore.drivers"></vue-select></td>
                    </tr>
                    <tr>
                        <td>Guiding camera</td>
                        <td><vue-select :options="indiStore.drivers"></vue-select></td>
                    </tr>
                </tbody>
            </table>

        </div>
    </div>

    <!-- *********************************************************************************************************** -->

</template>


<style>
/*--------------------------------------------------------------------------------------------------------------------*/

@import url('vue-select/dist/vue-select.css');

/*--------------------------------------------------------------------------------------------------------------------*/

.vs__selected {
    color: var(--bs-body-color);
}

.vs__clear,
.vs__open-indicator {
    fill: var(--bs-body-color);
}

.vs__dropdown-toggle {
    background-color: var(--bs-body-bg);
    border: var(--bs-border-width) solid var(--bs-border-color);
}

/*--------------------------------------------------------------------------------------------------------------------*/
</style>
