<script setup>
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
                        <th>Variable</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="driver in indiStore.drivers">
                        <td>${<i>{{driver.name}}</i>}</td>
                        <td>{{driver.value}}</td>
                    </tr>
                </tbody>
            </table>

        </div>
    </div>

    <!-- *********************************************************************************************************** -->

</template>
