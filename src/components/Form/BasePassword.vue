<template>
    <div class="tw-flex tw-flex-col tw-items-baseline tw-gap-x-3">
        <label class="tw-w-52"
            >{{ label }} <span v-if="required" class="text-red">*</span></label
        >
        <div class="tw-w-full">
            <q-input
                outlined
                color="primary"
                :type="isPwd ? 'text' : 'password'"
                :class="required ? '' : 'tw-mb-6'"
                :model-value="modelValue"
                :rules="[
                    required ? (val) => !!val || `${label} is required` : null,
                    isRegex
                        ? (val) =>
                              validatePassword(val) ||
                              `${label} harus mengandung huruf besar, angka, dan simbol!`
                        : null,
                ]"
                @update:model-value="
                    (value) => $emit('update:modelValue', value)
                "
            >
                <template v-slot:append>
                    <q-icon
                        :name="
                            isPwd ? 'eva-eye-off-outline' : 'eva-eye-outline'
                        "
                        @click="isPwd = !isPwd"
                    />
                </template>
            </q-input>
        </div>
    </div>
</template>

<script setup>
defineProps({
    isPwd: Boolean,
    label: String,
    modelValue: String,
    required: Boolean,
    isRegex: Boolean,
});
defineEmits(["update:modelValue"]);
const validatePassword = (password) => {
    const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
};
</script>
