<template>
  <div>
    <bounce-loader :loading="isLoading" :color="'#68d391'" :size="100" />
    <Table v-if="!isLoading" :assets="assets" />
  </div>
</template>

<script>
import API from "@/api";
import Table from "@/components/Table";
export default {
  name: "Home",
  components: {
    Table,
  },
  data() {
    return {
      isLoading: false,
      assets: [],
    };
  },
  created() {
    this.isLoading = true;
    API.getAssets()
      .then((assets) => (this.assets = assets))
      .finally(() => this.isLoading = false);
  },
};
</script>
