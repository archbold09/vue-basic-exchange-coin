<template>
  <header class="shadow w-screen">
    <nav>
      <nav class="flex items-center justify-between flex-wrap bg-green-400 p-6">
        <div class="flex items-center flex-shrink-0 text-white mr-6">
          <router-link :to="{ name: 'home' }">
            <Icon class="mr-2" />
          </router-link>
          <router-link :to="{ name: 'home' }">
            <span class="font-semibold text-xl tracking-tight">
              Exchange
            </span>
          </router-link>
        </div>
        <div
          class="hidden sm:block w-full block flex-grow lg:flex lg:items-center lg:w-auto"
        >
          <div class="text-sm lg:flex-grow">
            <router-link
              v-for="(item, index) in links"
              :key="index"
              :to="item.to"
              class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
              >{{ item.title }}</router-link
            >
          </div>
        </div>
      </nav>
    </nav>
  </header>
</template>

<script>
import Icon from "@/components/Icon.vue";
export default {
  name: "Header",
  components: { Icon },
  props: {
    links: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
