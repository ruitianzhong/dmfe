<template>
    <v-dialog v-model="dialog" width="800">
        <template v-slot:activator="{ props }">
            <v-btn v-bind="props" icon="mdi-information-outline" rounded color="transparent" variant="flat"
                density="compact"></v-btn>
        </template>
        <v-card>
            <v-card-title>
                <span class="py-5 font-weight-black">线路 {{ line_id }} 的信息</span>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>

                <v-timeline side="end" slign="start">
                    <v-timeline-item v-for="(item, i) in stopItems" :key="i" size="" fill-dot
                        :dot-color="colors[i % stopItems.length]">
                        <div class="d-flex">
                            <div>
                                <strong>{{ item }}</strong>
                            </div>
                        </div>
                    </v-timeline-item>
                </v-timeline>
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
import { getStopsByLineId } from '@/api/api';
export default {
    props: ['line_id'],
    data() {
        return {
            dialog: false,

            colors: [
                'teal-lighten-3',
                'pink',
                'red-lighten-2',
                'purple-lighten-2',
                'green-lighten-1',
                'indigo-lighten-2',
            ],
            stopItems: [],
        }
    },
    methods: {
        async fetchLineInfo() {
            const param = "line_id=" + this.line_id;
            try {
                const { data } = await getStopsByLineId(param)
                this.stopItems = data.stop_ids;
            } catch (err) {
                console.log(err);
            }

        }
    },
    watch: {
        dialog(newValue) {
            if (newValue) {
                this.fetchLineInfo()
            }
        }

    }

}
</script>
