<template>
    <div
        :class="[
            align != 'top' ? 'md:tw-flex' : null,
            'tw-items-baseline tw-gap-x-3 ',
        ]"
    >
        <label class="tw-w-52"
            >{{ label }}
            <span v-if="required && !mark" class="text-red">*</span></label
        >
        <div class="tw-w-full">
            <q-input
                :outlined="isOutlined"
                :filled="isFilled"
                :borderless="isBorderedless"
                :square="isSquare"
                ref="self"
                color="primary"
                :mask="mask"
                :dense="dense"
                :type="type"
                :prefix="prefix"
                :suffix="suffix"
                :hint="hint"
                :max="max"
                :disable="disabled"
                :readonly="readonly"
                :model-value="modelValue"
                input-class="!tw-border-4"
                :class="!required ?? 'tw-mb-6'"
                :autogrow="autogrow"
                :rules="[
                    required
                        ? (val) =>
                              (val !== null && val !== '') ||
                              `${label} is required`
                        : null,
                    max
                        ? (val) =>
                              (val > 0 && val <= max) || 'Max value of ' + max
                        : null,
                ]"
                :placeholder="placeholder"
                @update:model-value="
                    (value) => $emit('update:modelValue', value)
                "
            />
        </div>
    </div>
</template>

<script setup>
defineProps({
    // Design Input
    isFilled: Boolean,
    isOutlined: Boolean,
    isBorderedless: Boolean,
    isSquare: Boolean,
    dense: Boolean,

    // Must Have Attribute
    label: String,
    type: String,
    modelValue: String,

    // Optional Attribute
    prefix: String,
    suffix: String,
    hint: String,
    max: Number,
    placeholder: String,
    align: String,
    mark: Boolean,
    mask: String,
    autogrow: Boolean,

    // Validation Attirbute
    required: Boolean,
    disabled: Boolean,
    readonly: Boolean,
});
defineEmits(["update:modelValue"]);
</script>

<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>
