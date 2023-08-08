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

            <div class="table-responsive" style="max-height: 450px; overflow-y: scroll;">

                <table class="table table-sm table-striped">
                    <thead>
                        <tr>
                            <th class="text-start" style="width: 80px;">
                                Order
                            </th>
                            <th class="text-start" style="width: calc(50% - 100px);">
                                Device
                            </th>
                            <th class="text-start" style="width: calc(50% - 100px);">
                                Driver
                            </th>
                            <th class="text-center" style="width: 120px;">
                                <button class="btn btn-xs btn-primary" type="button" @click="">
                                    <i class="bi bi-plus-lg"></i> Add device
                                </button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(label, name) in indiStore.deviceCategories" :key="name">
                            <td>
                                <button class="btn btn-sm btn-link" type="button" @click="">
                                    <i class="bi bi-caret-up-fill"></i>
                                </button>
                                <button class="btn btn-sm btn-link" type="button" @click="">
                                    <i class="bi bi-caret-down-fill"></i>
                                </button>
                            </td>
                            <td>
                                {{label}}
                            </td>
                            <td>
                                <typeahead class="form-control form-control-sm" :options="indiStore.drivers" v-model="indiStore.devices[name]"></typeahead>
                            </td>
                            <td>
                                <button class="btn btn-sm btn-danger" type="button" @click="">
                                    <i class="bi bi-trash2"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>

        </div>
    </div>

    {{ indiStore.devices }}

    <!-- *********************************************************************************************************** -->

</template>
