<script setup>
/*--------------------------------------------------------------------------------------------------------------------*/

import { ref, computed } from 'vue';

/*--------------------------------------------------------------------------------------------------------------------*/

import useIndiStore from '../stores/indi';

/*--------------------------------------------------------------------------------------------------------------------*/
/* VARIABLES                                                                                                          */
/*--------------------------------------------------------------------------------------------------------------------*/

const indiStore = useIndiStore();

/*--------------------------------------------------------------------------------------------------------------------*/

const filter = ref('');

/*--------------------------------------------------------------------------------------------------------------------*/
/* FUNCTIONS                                                                                                          */
/*--------------------------------------------------------------------------------------------------------------------*/

const filteredVariables = computed(() => {

    return Object.fromEntries(Object.entries(indiStore.variables)
        .sort(([name1], [name2]) => name1.localeCompare(name2))
        .filter(([name]) => !filter.value || name.toLowerCase().includes(filter.value.toLowerCase())
    ));
});

/*--------------------------------------------------------------------------------------------------------------------*/
</script>

<template>

    <!-- *********************************************************************************************************** -->

    <div class="card mx-auto mb-3">
        <div class="card-header px-3 py-2">
            <i class="bi bi-braces"></i>
            Variables
        </div>
        <div class="card-body px-3 py-2">

            <!-- *************************************************************************************************** -->

            <div class="input-group mb-2">
                <span class="input-group-text">
                    <i class="bi bi-funnel"></i>
                    Filter
                </span>
                <input class="form-control" type="text" v-model="filter" />
            </div>

            <!-- *************************************************************************************************** -->

            <div class="table-responsive" style="max-height: 425px; overflow-y: scroll;">

                <table class="table table-sm table-striped">
                    <thead>
                        <tr>
                            <th style="width: 66.66%;">Variable</th>
                            <th style="width: 33.33%;">Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(value, name) in filteredVariables" :key="name">
                            <td>${<i>{{name}}</i>}</td>
                            <td>{{value['$']}}</td>
                        </tr>
                    </tbody>
                </table>

            </div>

            <!-- *************************************************************************************************** -->

        </div>
    </div>

    <!-- *********************************************************************************************************** -->

</template>
