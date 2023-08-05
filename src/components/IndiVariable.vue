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
            <i class="bi bi-braces"></i>
            Variables
        </div>
        <div class="card-body px-3 py-2">

            <div class="table-responsive" style="max-height: 450px; overflow-y: scroll;">

                <table class="table table-sm table-striped">
                    <thead>
                        <tr>
                            <th>Variable</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(value, name) in indiStore.variables" :key="name">
                            <td>${<i>{{name}}</i>}</td>
                            <td>{{value}}</td>
                        </tr>
                    </tbody>
                </table>

            </div>

        </div>
    </div>

    <!-- *********************************************************************************************************** -->

</template>
