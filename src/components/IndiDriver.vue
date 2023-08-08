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
        <div class="card-header d-flex px-3 py-2">
            <i class="bi bi-cpu"></i>
            Drivers
            <button class="btn btn-xs btn-primary ms-auto" type="button" @click="">
                <i class="bi bi-plus-lg"></i> Add device
            </button>
        </div>
        <div class="card-body px-3 py-2">

            <div class="table-responsive" style="max-height: 450px; overflow-y: scroll;">

                <table class="table table-sm table-striped">

                    <!-- ******************************************************************************************* -->

                    <thead>
                        <tr>
                            <th class="text-start" style="width: 100px;">
                                Order
                            </th>
                            <th class="text-start" style="width: calc(50% - 50px);">
                                Device
                            </th>
                            <th class="text-start" style="width: calc(50% - 50px);">
                                Driver
                            </th>
                        </tr>
                    </thead>

                    <!-- ******************************************************************************************* -->

                    <tbody>
                        <tr v-for="(label, name) in indiStore.deviceCategories" :key="name">
                            <td class="text-center">
                                <button class="btn btn-sm btn-link" type="button" @click="">
                                    <i class="bi bi-caret-up-fill"></i>
                                </button>
                                <button class="btn btn-sm btn-link" type="button" @click="">
                                    <i class="bi bi-caret-down-fill"></i>
                                </button>
                                <button class="btn btn-sm btn-danger" type="button" @click="">
                                    <i class="bi bi-trash2"></i>
                                </button>
                            </td>
                            <td class="text-center">
                                <select class="form-select form-select-sm">

                                </select>
                            </td>
                            <td class="text-center">
                                <typeahead class="form-control form-control-sm" :options="indiStore.drivers" v-model="indiStore.devices[name]"></typeahead>
                            </td>
                        </tr>
                    </tbody>

                    <!-- ******************************************************************************************* -->

                </table>

            </div>

        </div>
    </div>

    {{ indiStore.devices }}

    <!-- *********************************************************************************************************** -->

</template>
