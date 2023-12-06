<script lang="ts" setup>
import { ref, computed, onMounted, inject } from "vue";
import type Emoji from "@/types/Emoji";
import type Entry from "@/types/Entry";
import EmojiField from "@/components/EmojiField.vue";
import ArrowCircleRight from "@/assets/icons/arrow-circle-right.svg";
import { userInjectionKey } from "../../injectionKeys";

// Data
const body = ref("");
const emoji = ref<Emoji | null>(null);
const charCount = computed(() => body.value.length);
const maxChars = 280;
const user = inject(userInjectionKey);

// Template Refs
const textarea = ref<HTMLTextAreaElement | null>(null);

onMounted(() => textarea.value?.focus());

// Events
const emit = defineEmits<{
  (e: "@create", entry: Entry): void;
}>();

// Methods
const handleTextInput = (e: Event) => {
  const textarea = e.target as HTMLTextAreaElement;
  if (textarea.value.length <= maxChars) {
    body.value = textarea.value;
  } else {
    body.value = textarea.value = textarea.value.substring(0, maxChars);
  }
  console.log(textarea);
};

const resetValues = (e: Event) => {
  e.preventDefault;
  emit("@create", {
    body: body.value,
    emoji: emoji.value,
    createdAt: new Date(),
    userId: 1,
    id: Math.random(),
  });
  body.value = "";
  emoji.value = null;
};
</script>
<template>
  <form class="entry-form" @submit.prevent="resetValues">
    <textarea :value="body" @keyup="handleTextInput" ref="textarea"
      :placeholder="`New Journal Entry ${user?.username || 'anonymous'}`"></textarea>
    <EmojiField v-model="emoji" />
    <div class="entry-form-footer">
      <span>{{ charCount }} / {{ maxChars }}</span>
      <button>
        Remember
        <ArrowCircleRight width="20" />
      </button>
    </div>
  </form>
</template>
