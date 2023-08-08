<script setup>
/*--------------------------------------------------------------------------------------------------------------------*/

import useIndiStore from '../stores/indi';

import typeahead from '../components/typeahead/typeahead.vue';

/*--------------------------------------------------------------------------------------------------------------------*/

const indiStore = useIndiStore();

/*--------------------------------------------------------------------------------------------------------------------*/

const deviceAppend = () => {

};

/*--------------------------------------------------------------------------------------------------------------------*/

const deviceRemove = () => {

};

/*--------------------------------------------------------------------------------------------------------------------*/

const deviceDw = () => {

};

/*--------------------------------------------------------------------------------------------------------------------*/

const deviceUp = () => {

};

/*--------------------------------------------------------------------------------------------------------------------*/
</script>

<template>

    <!-- *********************************************************************************************************** -->

    <div class="card mx-auto mb-3">
        <div class="card-header d-flex px-3 py-2">
            <span>
                <i class="bi bi-cpu"></i>
                Devices
            </span>
            <button class="btn btn-xs btn-primary ms-auto" type="button" @click="deviceAppend()">
                <i class="bi bi-plus-lg"></i>
                Add device
            </button>
        </div>
        <div class="card-body px-3 py-2">

            <div class="table-responsive" style="max-height: 450px; overflow-y: scroll;">

                <table class="table table-sm table-striped">

                    <!-- ******************************************************************************************* -->

                    <thead>
                        <tr>
                            <th class="text-center">
                                Tools
                            </th>
                            <th class="text-center">
                                Device
                            </th>
                            <th class="text-center">
                                Driver
                            </th>
                        </tr>
                    </thead>

                    <!-- ******************************************************************************************* -->

                    <tbody>
                        <tr v-for="device in indiStore.devices">
                            <td class="text-center">
                                <button class="btn btn-sm btn-link" type="button" @click="deviceDw()">
                                    <i class="bi bi-caret-up-fill"></i>
                                </button>
                                <button class="btn btn-sm btn-link" type="button" @click="deviceUp()">
                                    <i class="bi bi-caret-down-fill"></i>
                                </button>
                                <button class="btn btn-sm btn-link" type="button" @click="deviceRemove()">
                                    <i class="bi bi-trash2 text-danger"></i>
                                </button>
                            </td>
                            <td class="text-center">
                                <select class="form-select form-select-sm" v-model="device.category">
                                    <option :value="value" v-for="(label, value) in indiStore.deviceCategories" :key="name">
                                        {{label}}
                                    </option>
                                </select>
                            </td>
                            <td class="text-center">
                                <typeahead class="form-control form-control-sm" :options="indiStore.drivers" v-model="device.driver" />
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
