<template>
  <q-page class="q-pa-md column items-center "> 
  <router-link  to="/"> <q-btn outline rounded color="primary" label="На главную" /></router-link>
     <div class="q-pa-md flex flex-center wrap q-gutter-md">
    <q-card class="my-card2 q-mt-md" flat bordered>
     <q-img :src="lib.data.general.image.url"  :alt="lib.data.general.image.title" width="250" height="150"/> 
      <q-card-section>
        <div class="text-overline text-orange-9"><q-icon size="m" name="schedule"/>  {{lib.data.general.workingSchedule[1].from.slice(0, -3)}}-{{lib.data.general.workingSchedule[1].to.slice(0,-3)}}</div>
        <div class="text-h5 q-mt-sm q-mb-xs">{{lib.data.general.name}}</div>
        <div class="text-caption text-grey" v-html="lib.data.general.description">
        </div>
       <span v-for="(tag,index) in lib.data.general.tags" :key="index"># {{tag.name}} </span>
       <p></p>
      </q-card-section>
      <q-card-actions>
       <div class="text-subtitle2"><q-icon name="location_on" /> {{lib.data.general.locale.name}}, {{lib.data.general.address.street}}</div>
        <q-space />
        <q-btn
          color="grey"
          flat
          dense
          :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
          @click="expanded = !expanded"
          label="Контакты"
        />
      </q-card-actions>

      <q-slide-transition>
        <div v-show="expanded">
          <q-separator />
          <q-card-section class="text-subitle2 column q-gutter-md">
             <a v-show="lib.data.general.contacts.email" :href="'mailto:' +lib.data.general.contacts.email">  <q-icon name="email" />   {{lib.data.general.contacts.email}} </a>
   <a v-show="lib.data.general.contacts.website" :href="lib.data.general.contacts.website"> <q-icon  name="link"/> {{lib.data.general.contacts.website}} </a>
   <a :href="'tel:' + lib.data.general.contacts.phones[0].value"> <q-icon name="phone" /> {{lib.data.general.contacts.phones[0].value}} </a>
          </q-card-section>
        </div>
      </q-slide-transition>
    </q-card>
  </div>
  </q-page>
</template>

<script>
export default {
  name: 'Library',
  props: ['date'],
  data () {
    return {
      lib: this.date,
        expanded: false,
    }
  },
 computed: {
    getTags() {
        return  lib.data.general.tags.find((el) => el.name)
    },

  }
}
</script>


<style lang="scss"> 
a {
  text-decoration: none;
  color: black;
  font-size: 16px;
  line-height: 20px;
  cursor: pointer;

  &:hover {
    opacity: 0.6
  }
}
.my-card2 {
  max-width: 700px;
}
</style>