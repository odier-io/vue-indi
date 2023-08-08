<script setup>
/*--------------------------------------------------------------------------------------------------------------------*/

import useIndiStore from '../stores/indi';

import typeahead from '../components/typeahead/typeahead.vue';

/*--------------------------------------------------------------------------------------------------------------------*/

const indiStore = useIndiStore();

/*--------------------------------------------------------------------------------------------------------------------*/

const categories = {
    'dome': 'Dome',
    'mount': 'Mount',
    'camera1': 'Main camera',
    'camera2': 'Guiding camera',
    'focuser': 'Focuser',
    'filters': 'Filters',
    'weather': 'Weather',
    'aux1': 'Aux 1',
    'aux2': 'Aux 2',
    'aux3': 'Aux 3',
    'aux4': 'Aux 4',
    'aux5': 'Aux 5',
    'aux6': 'Aux 6',
    'aux7': 'Aux 7',
    'aux8': 'Aux 8',
};

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

                <div class="table-responsive" style="max-height: 450px; overflow-y: scroll;">

                <table class="table table-sm table-striped">
                    <thead>
                        <tr>
                            <th class="w-50">Device</th>
                            <th class="w-50">Driver</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(label, name) in categories" :key="name">
                            <td>{{label}}</td>
                            <td><typeahead class="form-control form-control-sm" :options="indiStore.drivers" v-model="indiStore.devices[name]"></typeahead></td>
                        </tr>
                    </tbody>
                </table>

            </div>

        </div>
    </div>

    {{ indiStore.devices }}

    <!-- *********************************************************************************************************** -->

</template>
