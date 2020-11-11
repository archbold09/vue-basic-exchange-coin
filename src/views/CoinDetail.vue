<template>
  <div class="flex-col">
    <bounce-loader :loading="isLoading" :color="'#68d391'" :size="100" />
    <template v-if="asset.id">
      <div class="flex flex-col sm:flex-row justify-around items-center">
        <div class="flex flex-col items-center">
          <img
            :src="
              `https://static.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`
            "
            :alt="asset.name"
            class="w-20 h-20 mr-5"
          />
          <h1 class="text-5xl">
            {{ asset.name }}
            <small class="sm:mr-2 text-gray-500">{{ asset.symbol }}</small>
          </h1>
        </div>

        <div class="my-10 flex flex-col">
          <ul>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Ranking</b>
              <span>#{{ asset.rank }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio actual</b>
              <span>{{ asset.priceUsd | dollar }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio más bajo</b>
              <span>{{ min | dollar }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio más alto</b>
              <span>{{ max | dollar }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio Promedio</b>
              <span>{{ avg | dollar }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Variación 24hs</b>
              <span>{{ asset.changePercent24Hr | percent }}</span>
            </li>
          </ul>
        </div>

        <div class="my-10 sm:mt-0 flex flex-col justify-center text-center">
          <button
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            @click="toggleConverter"
          >
            {{ fromUsd ? `USD a ${asset.symbol}` : `${asset.symbol} a USD` }}
          </button>

          <div class="flex flex-row my-5">
            <label class="w-full" for="convertValue">
              <input
                v-model="convertValue"
                id="convertValue"
                type="number"
                class="text-center bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
              />
            </label>
          </div>

          <span class="text-xl"
            >{{ convertResult }} {{ fromUsd ? `USD` : `BTC` }}</span
          >
        </div>
      </div>

      <line-chart
        class="my-10"
        :color="['orange']"
        :min="min"
        :max="max"
        :data="
          history.map((item) => [
            item.date,
            parseFloat(item.priceUsd).toFixed(2),
          ])
        "
      ></line-chart>

      <h3 class="text-xl my-10">Mejores Ofertas de Cambio</h3>
      <table>
        <tr v-for="(item, index) in markets" :key="index" class="border-b">
          <td>
            <b>{{ item.exchangeId }}</b>
          </td>
          <td>{{ item.priceUsd | dollar }}</td>
          <td>{{ item.baseSymbol }} / {{ item.quoteSymbol }}</td>
          <td>
            <Button
              :is-loading="item.isLoading || false"
              v-if="!item.url"
              @click="getWebSite(item)"
            >
              Obtener Link
            </Button>
            <a v-else class="hover:underline text-green-600" target="_blank">{{
              item.url
            }}</a>
          </td>
        </tr>
      </table>
    </template>
  </div>
</template>

<script>
import API from "@/api";
import Button from "@/components/Button";
export default {
  name: "CoinDetail",
  components: { Button },
  data() {
    return {
      isLoading: false,
      asset: {},
      history: [],
      markets: [],
      fromUsd: true,
      convertValue: null,
    };
  },
  created() {
    this.getCoin();
  },
  computed: {
    convertResult() {
      if (!this.convertValue) {
        return 0;
      }
      const result = this.fromUsd
        ? this.convertValue / this.asset.priceUsd
        : this.convertValue * this.asset.priceUsd;

      return result.toFixed(4);
    },
    min() {
      return Math.min(
        ...this.history.map((history) =>
          parseFloat(history.priceUsd).toFixed(2)
        )
      );
    },
    max() {
      return Math.max(
        ...this.history.map((history) =>
          parseFloat(history.priceUsd).toFixed(2)
        )
      );
    },
    avg() {
      return Math.abs(
        ...this.history.map((history) =>
          parseFloat(history.priceUsd).toFixed(2)
        )
      );
    },
  },
  watch: {
    $route() {
      this.getCoin();
    },
  },
  methods: {
    toggleConverter() {
      this.fromUsd = !this.fromUsd;
    },
    getCoin() {
      this.isLoading = true;
      const id = this.$route.params.id;
      Promise.all([
        API.getAsset(id),
        API.getAssetHistory(id),
        API.getMarkets(id),
      ])
        .then(([asset, history, markets]) => {
          this.asset = asset;
          this.history = history;
          this.markets = markets;
        })
        .finally(() => (this.isLoading = false));
    },
    getWebSite(exchange) {
      this.$set(exchange, "isLoading", true);
      return API.getExchange(exchange.exchangeId)
        .then((res) => {
          this.$set(exchange, "url", res.exchangeUrl);
        })
        .finally(() => this.$set(exchange, "isLoading", false));
    },
  },
};
</script>

<style scoped>
td {
  padding: 10px;
  text-align: center;
}
</style>
