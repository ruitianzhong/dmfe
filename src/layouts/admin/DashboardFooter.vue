<template>
    <v-container>
        <v-footer class="text-center d-flex flex-column" absolute>

            <p style="font-size:12px;color:grey;">
                Copyright © 2023-{{ new Date().getFullYear() }} Ruitian Zhong
            </p>
        </v-footer>
    </v-container>
</template>

<script>
export default {
    data: () => ({
        icons: [
            { icon_name: 'mdi-github', url: 'https://github.com/ruitianzhong' },
            { icon_name: 'mdi-web', url: 'https://zrt.ink' },
        ],
    })
}
</script>
