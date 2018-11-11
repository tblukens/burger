<template>
  <div class="burger">
    <div class="columns is-centered">
      <div class="column is-two-fifths is-mobile">
        <div class="column has-text-left">
          <div class="" v-for="burger in burgers" :key="'li'+burger.id" :data-id="burger.id">
            <div class="columns burgers has-background-warning">
              <div class="column is-half is-mobile">
                <p>{{ burger.burger_name}}</p>
              </div>
              <div class="column is-half is-mobile">
                <router-link to="/"><button :data-id="burger.id" data-devoured="false" @click="thisID">DEVOUR</button></router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-two-fifths is-offset-one-fifth is-mobile">
        <div class="burgers has-background-warning" v-for="eaten in devoured" :key="'li'+eaten.id" :data-id="eaten.id" @click="thisID">
          {{ eaten.burger_name}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import router from '../router'
export default {
  name: 'Burger',
  data: () => {
    return {
      burgers: [],
      devoured: []
    }
  },
  methods: {
    thisID: function (e) {
      let _vue = this;
      console.log(e.currentTarget.getAttribute('data-id'))
      let id = e.currentTarget.getAttribute('data-id');
      let notDevoured = e.currentTarget.getAttribute('data-devoured');
      let apiCall = `http://localhost:8081/api/burgers/${id}`
      axios.put(apiCall, {
        data: {
          devoured: notDevoured
        }
      }).then(() => {
        this.recallAll()
      })
    },
    recallAll: function () {
      let apiCall = `http://localhost:8081/api/all`
      this.burgers = []
      this.devoured = []
      axios.get(apiCall)
        .then(res => {
          res.data.forEach(element => {
            if (element.devoured == 1) {
              this.devoured.push(element)
            } else {
              this.burgers.push(element)
            }
          });
          console.log(this.burgers)
          console.log(this.devoured)
        })
        .catch(err => console.log(err))
    }
  },
  mounted() {
    let apiCall = `http://localhost:8081/api/all`
    axios.get(apiCall)
      .then(res => {
        res.data.forEach(element => {
          if (element.devoured == 1) {
            this.devoured.push(element)
          } else {
            this.burgers.push(element)
          }
        });
        console.log(this.burgers)
        console.log(this.devoured)
      })
      .catch(err => console.log(err))
  }
}
</script>

<style>
.burgers {
  margin: 10px auto;
}
</style>
