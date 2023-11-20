<template>
    <v-container>
        <v-footer class="text-center d-flex flex-column" absolute>

            <div>
                <v-btn v-for="icon in icons" :key="icon.icon_name" class="mx-1" :icon="icon.icon_name" variant="text"
                    :href="icon.url" target="_blank"></v-btn>
        </div>
            <p style="font-size:12px;color:grey;">
                Copyright © 2023-{{ new Date().getFullYear() }} <strong >Ruitian Zhong</strong>. All Rights Reserved.
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
