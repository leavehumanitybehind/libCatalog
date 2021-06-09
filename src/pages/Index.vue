<template>
  <div class="q-pa-md">
    <q-input
      :dense="dense"
      v-model="search"
      class="form-control"
      placeholder="Поиск библиотеки"
    />
    <q-infinite-scroll
      @load="loadMore"
      :offset="250"
      class="flex wrap justify-between items-stretch  q-pa-md"
    >
      <div
        class="q-pa-md row q-gutter-lg"
        v-for="(lib, index) in filteredList"
        :key="index"
      >
        <q-card class="my-card">
          <img
            :src="lib.data.general.image.url"
            :alt="lib.data.general.image.title"
            width="250"
            height="250"
          />

          <q-card-section>
            <div class="text-h6 q-mb-md">{{ lib.nativeName }}</div>
            <div class="text-subtitle3 address">
              {{ lib.data.general.address.fullAddress.replaceAll(",", ", ") }}
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none link">
            <router-link
              :to="{ name: 'library', params: { id: lib._id, date: lib } }"
            >
              <q-btn
                outline
                class="items-end"
                style="color: goldenrod;"
                label="Подробнее"
              />
            </router-link>
          </q-card-section>
        </q-card>
      </div>
      <template v-slot:loading>
        <div class="spinner">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
    </q-infinite-scroll>
  </div>
</template>
<script>
import axios from "axios";
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  name: "PageIndex",
  data() {
    return {
      search: "",
      dense: false
    };
  },
  async created() {
    this.$store.dispatch("GET_DATA");
  },
  mounted() {},
  computed: {
    ...mapState(["libraries", "initialLibraries"]),
    filteredList: function() {
      let comp = this.search;
      return this.initialLibraries.filter(function(elem) {
        return (
          elem.nativeName.indexOf(comp) > -1 ||
          elem.data.general.address.fullAddress.indexOf(comp) > -1
        );
      });
    }
  },
  methods: {
    loadMore(index, done) {
      setTimeout(() => {
        this.$store.commit("ADD_LIBRARIES");
        done();
      }, 2000);
    }
  }
};
</script>
<style>
.form-control {
  margin: 0 auto;
}

.my-card {
  max-width: 500px;
}

a {
  text-decoration: none;
}

.address {
  min-height: 80px;
}

.spinner {
  position: fixed;
  left: 50%;
  right: 50%;
  top: 50%;
  bottom: 0;
}
</style>
