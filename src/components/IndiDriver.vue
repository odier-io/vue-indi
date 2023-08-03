<script setup>
/*--------------------------------------------------------------------------------------------------------------------*/

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
                    <tr v-for="(value, name) in indiStore.drivers" :key="name">
                        <td>${<i>{{name}}</i>}</td>
                        <td>{{value}}</td>
                    </tr>
                </tbody>
            </table>

        </div>
    </div>

    <!-- *********************************************************************************************************** -->

</template>
