<template>
<div class="q-pa-md">
 <q-input :dense="dense" v-model="search" class="form-control" placeholder="Поиск библиотеки" />
 <q-infinite-scroll @load="loadMore"  :offset="250" class="flex wrap justify-between items-stretch  q-pa-md">
  <div class="q-pa-md row q-gutter-lg" v-for='(lib, index) in filteredList' :key="index" >
   <q-card class="my-card">
      <img :src="lib.data.general.image.url"  :alt="lib.data.general.image.title" width="250" height="250"/> 

      <q-card-section>
        <div class="text-h6 q-mb-md">{{lib.nativeName}}</div>
        <div class="text-subtitle3 address"> {{lib.data.general.address.fullAddress.replaceAll(',', ', ')}}</div>
      </q-card-section>

      <q-card-section class="q-pt-none link">
        <router-link :to="{name: 'library',
         params: {id: lib._id, date: lib}  }"> <q-btn outline class="items-end" style="color: goldenrod;" label="Подробнее" /> </router-link>
      </q-card-section>
    </q-card>
    </div>
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
   </q-infinite-scroll>
   </div>
     </template>
<script>
import axios from 'axios'
import libs from "../libraries.json";

export default {
  name: 'PageIndex',
  data() {
    return {
      libraries:[],
      results:[],
      search: '',
      busy:false,
      limit: 10,
      dense: false
    }
  },
  methods: {
    loadMore(index, done) {
      this.busy = true;   
      const append = libs.slice(this.libraries.length,this.libraries.length + this.limit );
      this.libraries = this.libraries.concat(append);
      done();
      this.busy = false;
  }
  },
  computed: {
   filteredList: function(){
                var comp = this.search;
                return this.libraries.filter(function (elem) {
                    if(comp==='') return true;
                    else return elem.nativeName.indexOf(comp) > -1 || elem.data.general.address.fullAddress.indexOf(comp) > -1;
                })
            }
  }
}
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

</style>