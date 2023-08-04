<script setup>
/*--------------------------------------------------------------------------------------------------------------------*/

import SimpleTypeahead from 'vue3-simple-typeahead';

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
                        <td><simple-typeahead :items="indiStore.drivers"></simple-typeahead></td>
                    </tr>
                    <tr>
                        <td>Guiding camera</td>
                        <td><simple-typeahead :items="indiStore.drivers"></simple-typeahead></td>
                    </tr>
                </tbody>
            </table>

        </div>
    </div>

    <!-- *********************************************************************************************************** -->

</template>


<style>
/*--------------------------------------------------------------------------------------------------------------------*/

@import url('vue3-simple-typeahead/dist/vue3-simple-typeahead.css');

/*--------------------------------------------------------------------------------------------------------------------*/
</style>
