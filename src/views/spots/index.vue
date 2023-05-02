<template>
  <div class="py-5 bg-light">
    <div class="container">
      <h1>First Vaccination</h1>
    </div>
  </div>
  <div class="container mt-4">
    <h4 class="mb-3">List Vaccination Spots in {{ district }}</h4>
    <div class="mb-4 bg-light border-0 p-3 row position-relative" v-for="s in spots" :key="s.id">
      <router-link
        :to="{ name: 'spotsDetail', params: { id: s.id } }"
        class="stretched-link"
      ></router-link>
      <div class="col-4">
        <h5 class="text-primary">{{ s.name }}</h5>
        <h6 class="text-secondary">{{ s.address }}</h6>
      </div>
      <div class="col-4">
        <h5>Available Vaccines</h5>
        <span class="col" v-for="(value, key) in s.available_vaccines" :key="key">
          <h6 class="col text-secondary m-0 p-0 d-inline" v-if="value === true">
            {{ key + ', ' }}
          </h6>
        </span>
      </div>
      <div class="col-4">
        <h5>Serve</h5>
        <h6 class="text-secondary" v-if="s.serve === 3">Both vaccination</h6>
        <h6 class="text-secondary" v-else-if="s.serve === 2">Only second vaccination</h6>
        <h6 class="text-secondary" v-else>Only first vaccination</h6>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      token: localStorage.getItem('token'),
      district: localStorage.getItem('district'),
      spots: []
    }
  },
  mounted() {
    this.axios
      .get('http://serverside.test/api/v1/spots?token=' + this.token)
      .then((res) => {
        this.spots = res.data.spots
      })
      .catch((err) => {
        if (err.response.status !== 200) {
          this.$swal({
            title: err.response.status,
            text: err.response.data.message,
            icon: 'error',
            confirmButtonText: 'Close'
          })
        }
      })
  }
}
</script>