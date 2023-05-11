<template>
    <q-page class="tw-p-10">
        <h1 class="tw-text-lg tw-font-semibold">
            Quasar + Tailwindcss + Vueuse
        </h1>

        <BaseFile v-model="File" />
    </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useMeta } from "quasar";

export default defineComponent({
    name: "IndexPage",
    setup() {
        useMeta({
            title: "Quasar Starter Tailwind",
        });

        return {
            File: ref(null),
        };
    },
});
</script>
