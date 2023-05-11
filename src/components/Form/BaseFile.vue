<template>
    <section class="tw-space-y-3">
        <label class="tw-w-52 tw-text-black">
            {{ label }}
        </label>

        <div
            class="tw-relative tw-w-full tw-flex tw-flex-col tw-items-center tw-justify-center tw-transition-colors tw-rounded-md"
            :class="isImage ? 'tw-h-44' : 'tw-h-24 tw-bg-gray-300'"
        >
            <q-file
                :model-value="modelValue"
                borderless
                class="tw-w-full tw-h-44 tw-rounded-md tw-absolute tw-cursor-pointer"
                :class="{
                    'tw-pointer-events-none': ImageUrl,
                    'tw-h-44 tw-border tw-border-dashed tw-border-primary':
                        isImage,
                    'tw-h-24': !isImage,
                }"
                ref="dropZoneRef"
                @update:model-value="
                    (value) => (
                        $emit('update:modelValue', value), ChooseFile(value)
                    )
                "
            />

            <Transition name="bounce">
                <div
                    class="tw-bg-black/70 tw-w-[95%] tw-rounded-md tw-py-4 tw-px-6 tw-space-x-4 tw-flex tw-items-center"
                    v-if="ImageUrl && !isImage"
                >
                    <q-btn
                        round
                        unelevated
                        icon="close"
                        size="sm"
                        class="tw-bg-black/30 tw-text-white"
                        @click="CancelUpload"
                    />

                    <div class="tw-flex tw-flex-col tw-gap-1">
                        <span class="tw-text-white tw-font-semibold">
                            {{ ImageLabel }}
                        </span>

                        <span class="tw-text-white tw-font-semibold tw-text-xs">
                            {{ FileSize }}
                        </span>
                    </div>
                </div>
            </Transition>

            <ImageArea class="tw-w-28" v-if="!ImageUrl && isImage" />

            <div
                v-if="ImageUrl && isImage"
                class="tw-flex tw-flex-col tw-justify-center tw-items-center tw-gap-3 tw-z-10"
            >
                <div class="tw-w-36 tw-h-32 tw-overflow-hidden tw-object-cover">
                    <q-img
                        :src="ImageUrl"
                        spinner-color="primary"
                        spinner-size="82px"
                    />
                </div>
                <div class="tw-space-x-3">
                    <span>{{ ImageLabel }}</span>
                    <q-btn
                        unelevated
                        size="xs"
                        dense
                        color="negative"
                        icon="eva-close-circle"
                        label="Cancel"
                        @click="CancelUpload"
                    />
                </div>
            </div>

            <p v-if="!ImageUrl" class="tw-text-center tw-font-medium">
                Drag & Drop your files or
                <span class="tw-underline">Browse</span>
            </p>
        </div>
    </section>
</template>

<script setup>
import { useDropZone } from "@vueuse/core";
import { ref } from "vue";
import ImageArea from "../Utils/ImageArea.vue";

const props = defineProps({
    modelValue: Object,
    label: String,
    isImage: Boolean,
});

const emit = defineEmits(["update:modelValue"]);

const dropZoneRef = ref(null);
const ImageUrl = ref("");
const ImageLabel = ref("");
const FileSize = ref(0);

const onDrop = (file) => {
    console.log(file[0]);
    FileSize.value = convertFileSize(file[0].size);
    emit("update:modelValue", file[0]);
    ImageUrl.value = URL.createObjectURL(file[0]);
    file = file[0];
    File.value = file;
    ImageLabel.value = file.name;
};

const ChooseFile = (val) => {
    ImageUrl.value = URL.createObjectURL(val);
    ImageLabel.value = val?.name;
};

const CancelUpload = () => {
    [ImageLabel.value, ImageUrl.value, File.value] = ["", "", null];

    emit("update:modelValue", null);
};

const convertFileSize = (sizeInBytes) => {
    const units = ["bytes", "KB", "MB", "GB", "TB"];
    let index = 0;

    while (sizeInBytes >= 1024 && index < units.length - 1) {
        sizeInBytes /= 1024;
        index++;
    }

    return `${Math.round(sizeInBytes)} ${units[index]}`;
};

const { isOverDropZone } = useDropZone(dropZoneRef, onDrop);
</script>

<style lang="scss">
.q-field__input {
    & + div {
        display: none;
    }
}
.bounce-enter-active {
    animation: bounce-in 0.5s;
}
.bounce-leave-active {
    transition: opacity 0.1s;
    opacity: 0;
}
@keyframes bounce-in {
    0% {
        transform: scale(0);
    }
    50% {
        transform: scale(1.1);
    }
    100% {
        transform: scale(1);
    }
}
</style>
