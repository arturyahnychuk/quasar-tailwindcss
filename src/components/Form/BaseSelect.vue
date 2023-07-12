<template>
    <div
        :class="[
            align != 'top' ? 'md:tw-flex' : null,
            'tw-items-baseline tw-gap-x-3',
        ]"
    >
        <label class="tw-w-52"
            >{{ label }}
            <span v-if="required && !mark" class="text-red">*</span></label
        >
        <div class="tw-w-full">
            <q-select
                filled
                :use-input="search"
                :dense="dense"
                color="primary"
                :model-value="modelValue"
                :disable="disabled"
                :options="valOptions"
                :inputDebounce="0"
                :class="!required ?? 'tw-mb-6'"
                :rules="
                    required ? [(val) => !!val || `${label} is required`] : null
                "
                @update:model-value="
                    (value) => $emit('update:modelValue', value)
                "
                @filter="filterFn"
                :map-options="mapOptions"
                :emit-value="emitValue"
                :multiple="multiple"
                :clearable="clearable"
                :display-value="displayValue"
                :option-value="optionValue"
                :options-cover="optionsCover"
            >
                <template v-if="search" v-slot:no-option>
                    <q-item>
                        <q-item-section class="text-grey">
                            No results
                        </q-item-section>
                    </q-item>
                </template>
            </q-select>
        </div>
    </div>
</template>
<script>
import { ref } from "vue";

export default {
    props: [
        "label",
        "search",
        "options",
        "modelValue",
        "disabled",
        "required",
        "align",
        "dense",
        "mark",
        "mapOptions",
        "emitValue",
        "multiple",
        "clearable",
        "displayValue",
        "optionValue",
        "optionsCover",
    ],
    emits: ["update:modelValue"],
    data() {
        const valOptions = ref(this.options);

        return {
            valOptions,
        };
    },
    methods: {
        filterFn(val, update) {
            if (val === "") {
                update(() => {
                    this.valOptions = this.options;
                });
                return;
            }

            update(() => {
                const needle = val.toLowerCase();
                this.valOptions = this.options.filter(
                    (v) => v.label.toLowerCase().indexOf(needle) > -1
                );
            });
        },
    },
};
</script>
