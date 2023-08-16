<script setup>
/*--------------------------------------------------------------------------------------------------------------------*/

import { computed } from 'vue';

import { v4 as uuidV4 } from 'uuid';

/*--------------------------------------------------------------------------------------------------------------------*/

import useIndiStore from '../stores/indi';

import typeahead from '../components/typeahead/typeahead.vue';

/*--------------------------------------------------------------------------------------------------------------------*/
/* VARIABLES                                                                                                          */
/*--------------------------------------------------------------------------------------------------------------------*/

const indiStore = useIndiStore();

/*--------------------------------------------------------------------------------------------------------------------*/
/* FUNCTIONS                                                                                                          */
/*--------------------------------------------------------------------------------------------------------------------*/

const drivers = computed(() => {

    const result = Object.values(indiStore.driverDict);

    result.sort((x, y) => x.rank - y.rank);

    return result;
});

/*--------------------------------------------------------------------------------------------------------------------*/

let rank = 0;

/*--------------------------------------------------------------------------------------------------------------------*/

const driverAppend = () => {

    const id = uuidV4();

    indiStore.driverDict[id] = {
        id: id,
        rank: rank,
        driver: '',
    };

    rank++;
};

/*--------------------------------------------------------------------------------------------------------------------*/

const driverRm = (driver) => {

    delete indiStore.driverDict[driver.id];
};

/*--------------------------------------------------------------------------------------------------------------------*/

const driverDw = (driver1) => {

    const array = drivers.value;

    const index = array.findIndex((driver2) => driver2.id === driver1.id);

    if(index > 0x0000000000)
    {
        const driver2 = array[index - 1];

        driver1.rank--;
        driver2.rank++;
    }
};

/*--------------------------------------------------------------------------------------------------------------------*/

const driverUp = (driver1) => {

    const array = drivers.value;

    const index = array.findIndex(driver2 => driver2.id === driver1.id);

    if(index < array.length)
    {
        const driver2 = array[index + 1];

        driver1.rank++;
        driver2.rank--;
    }
};

/*--------------------------------------------------------------------------------------------------------------------*/
</script>

<template>

    <!-- *********************************************************************************************************** -->

    <div class="card mx-auto mb-3">
        <div class="card-header px-3 py-2">
            <i class="bi bi-cpu"></i>
            Drivers
            [
                <button class="btn btn-xs btn-primary" type="button" @click="driverAppend()">
                    <i class="bi bi-plus-lg"></i>
                    Add driver
                </button>
            ]
        </div>
        <div class="card-body px-3 py-2">

            <div style="max-height: 450px; overflow-y: scroll;">

                <table class="table table-sm table-striped">

                    <!-- ******************************************************************************************* -->

                    <thead>
                        <tr>
                            <th class="text-center" style="width: 105px;">
                                Tools
                            </th>
                            <th class="text-center" style="width: auto;">
                                Driver
                            </th>
                        </tr>
                    </thead>

                    <!-- ******************************************************************************************* -->

                    <tbody>
                        <tr v-for="driver in drivers">
                            <td class="text-center">
                                <button class="btn btn-sm btn-link" type="button" @click="driverDw(driver)">
                                    <i class="bi bi-caret-up-fill"></i>
                                </button>
                                <button class="btn btn-sm btn-link" type="button" @click="driverUp(driver)">
                                    <i class="bi bi-caret-down-fill"></i>
                                </button>
                                <button class="btn btn-sm btn-link" type="button" @click="driverRm(driver)">
                                    <i class="bi bi-trash2 text-danger"></i>
                                </button>
                            </td>
                            <td class="text-center">
                                <typeahead class="form-control form-control-sm" mode="typeahead" :options="indiStore.driverDefs" v-model="driver.driver" />
                            </td>
                        </tr>
                    </tbody>

                    <!-- ******************************************************************************************* -->

                </table>

            </div>

        </div>
    </div>

    <!-- *********************************************************************************************************** -->

</template>
