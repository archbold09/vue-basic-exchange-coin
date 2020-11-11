<template>
  <table>
    <thead>
      <tr class="bg-gray-100 border-b-2 border-gray-400">
        <th></th>
        <th :class="{ up: this.sortOrder === 1, down: this.sortOrder === -1 }">
          <span class="underline cursor-pointer" @click="changeSortOrder"
            >Ranking</span
          >
        </th>
        <th>Nombre</th>
        <th>Precio</th>
        <th>Cap. de Mercado</th>
        <th>Variación 24hs</th>
        <td class="hidden sm:block">
          <input
            class="bg-gray-100 focus:outline-none border-b border-gray-400 py-2 px-4 block w-full appearance-none leading-normal"
            id="filter"
            placeholder="Buscar..."
            type="text"
            v-model="filter"
          />
        </td>
      </tr>
    </thead>
    <tbody>
      <tr
        class="border-b border-gray-200 hover:bg-gray-100 hover:bg-orange-100"
        v-for="(item, index) in filteredAssets"
        :key="index"
      >
        <td>
          <img
            class="w-6 h-6"
            :src="
              `https://static.coincap.io/assets/icons/${item.symbol.toLowerCase()}@2x.png`
            "
            :alt="item.name"
          />
        </td>
        <td>
          <b>#{{ item.rank }}</b>
        </td>
        <td>
          <router-link
            class="hover:underline text-green-600"
            :to="{
              name: 'coin-detail',
              params: { id: item.name.toLowerCase() },
            }"
          >
            {{ item.name }}
          </router-link>
          <small class="ml-1 text-gray-500">{{ item.symbol }}</small>
        </td>
        <td>{{ item.priceUsd | dollar }}</td>
        <td>{{ item.marketCapUsd | dollar }}</td>
        <td
          :class="
            item.changePercent24Hr.includes('-')
              ? 'text-red-600'
              : 'text-green-600'
          "
        >
          {{ item.changePercent24Hr | percent }}
        </td>
        <td class="hidden sm:block">
          <Button @click="goToCoin(item.id)">
            <span>Detalle</span>
          </Button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import Button from "@/components/Button";
export default {
  name: "Table",
  components: { Button },
  data() {
    return {
      filter: "",
      sortOrder: 1,
    };
  },
  computed: {
    filteredAssets() {
      if (!this.filter) {
        return this.assets;
      }

      const altOrder = this.sortOrder === 1 ? -1 : 1;

      return this.assets
        .filter(
          (item) =>
            item.symbol.toLowerCase().includes(this.filter.toLowerCase()) ||
            item.name.toLowerCase().includes(this.filter.toLowerCase())
        )
        .sort((elementBefore, elementLater) => {
          if (parseInt(elementBefore.rank) > parseInt(elementLater.rank)) {
            return this.sortOrder;
          }
          return altOrder;
        });
    },
  },
  props: {
    assets: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    goToCoin(id) {
      this.$router.push({ name: "coin-detail", params: { id } });
    },
    changeSortOrder() {
      this.sortOrder = this.sortOrder === 1 ? -1 : 1;
    },
  },
};
</script>

<style scoped>
.up::before {
  content: "👆";
}

.down::before {
  content: "👇";
}

td {
  padding: 20px 0px;
  font-size: 0.6rem;
  text-align: center;
}

th {
  padding: 5px;
  font-size: 0.6rem;
}

@media (min-width: 640px) {
  td,
  th {
    padding: 20px;
    font-size: 1rem;
  }

  th {
    padding: 12px;
  }
}
</style>
