<script setup>
/*--------------------------------------------------------------------------------------------------------------------*/

import useIndiStore from '../stores/indi';

import typeahead from '../components/typeahead/typeahead.vue';

/*--------------------------------------------------------------------------------------------------------------------*/

const indiStore = useIndiStore();

/*--------------------------------------------------------------------------------------------------------------------*/

const categories = [
    'Mount',
    'Main Camera',
    'Guiding camera',
    'Focuser',
    'Filter',
    'Dome',
    'Weather',
    'Aux 1',
    'Aux 2',
    'Aux 3',
    'Aux 4',
    'Aux 5',
    'Aux 6',
    'Aux 7',
    'Aux 8',
];

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
                    <tr v-for="category in categories">
                        <td>{{category}}</td>
                        <td><typeahead class="form-control form-control-sm" :options="indiStore.drivers"></typeahead></td>
                    </tr>
                </tbody>
            </table>

        </div>
    </div>

    <!-- *********************************************************************************************************** -->

</template>
