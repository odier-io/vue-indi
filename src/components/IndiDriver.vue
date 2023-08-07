<script setup>
/*--------------------------------------------------------------------------------------------------------------------*/

import useIndiStore from '../stores/indi';

import typeahead from '../components/typeahead/typeahead.vue';

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
                        <td><input class="form-select form-select-sm" type="text" /></td>
                        <td><typeahead class="form-control form-control-sm" :options="indiStore.drivers"></typeahead></td>
                    </tr>
                    <tr>
                        <td><input class="form-select" type="text" /></td>
                        <td><typeahead class="form-control" :options="indiStore.drivers"></typeahead></td>
                    </tr>
                    <tr>
                        <td><input class="form-select form-select-lg" type="text" /></td>
                        <td><typeahead class="form-control form-control-lg" :options="indiStore.drivers"></typeahead></td>
                    </tr>
                </tbody>
            </table>

        </div>
    </div>

    <!-- *********************************************************************************************************** -->

</template>
