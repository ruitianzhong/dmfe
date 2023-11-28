<template>
    <v-dialog v-model="dialog" width="800">
        <template v-slot:activator="{ props }">
            <v-btn v-bind="props" icon="mdi-information-outline" rounded color="transparent" variant="flat"
                density="compact"></v-btn>
        </template>
        <v-card>
            <v-card-title>
                <span class="py-5 font-weight-black">车辆 {{ bus_id }} 的信息</span>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                暂时不支持该功能
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green-darken-1" variant="text" @click="dialog = false">
                    关闭
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: ['bus_id'],
    data() {
        return {
            dialog: false,
        }
    },

}
</script>
