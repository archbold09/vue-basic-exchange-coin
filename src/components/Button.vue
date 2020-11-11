<template>
  <button
    @click="handlerClick"
    class="bg-transparent hover:gb-green-500 text-green-700 font-semibold hover:text-white py-2 px-2 border border-green-500 hover:border-transparent rounded"
  >
    <beat-loader :loading="isLoading" :color="'#68d391'" :size="8" />
    <p v-show="!isLoading">
      <slot></slot>
    </p>
  </button>
</template>
<script>
export default {
  name: "Button",
  methods: {
    handlerClick() {
      this.$emit("click");
    },
  },
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
