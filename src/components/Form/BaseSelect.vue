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
                outlined
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
<script setup>
import { ref } from "vue";
const props = defineProps({
    label: String,
    search: Boolean,
    options: Array,
    modelValue: String,
    disabled: Boolean,
    required: Boolean,
    align: String,
    dense: Boolean,
    mark: Boolean,
    mapOptions: Boolean,
    emitValue: Boolean,
    multiple: Boolean,
    clearable: Boolean,
    displayValue: String,
    optionValue: String,
    optionsCover: Boolean,
});
defineEmits(["update:modelValue"]);
const valOptions = ref();
const filterFn = (val, update) => {
    if (val === "") {
        update(() => {
            valOptions.value = props.options;
        });
        return;
    }
    update(() => {
        const needle = val.toLowerCase();
        valOptions.value = props.options.filter((v) => {
            return v?.label
                ? v.label.toLowerCase().indexOf(needle) > -1
                : v.toLowerCase().indexOf(needle) > -1;
        });
    });
};
</script>
