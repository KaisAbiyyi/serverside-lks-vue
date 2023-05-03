<template>
  <div class="container">
    <div class="col-4 m-auto mt-5">
      <div class="card border-0 rounded-4 p-4 bg-light">
        <div class="mb-4 p-5 bg-primary rounded-4">
          <h3 class="text-center text-white">E-VACCINATION</h3>
        </div>
        <div class="mb-3">
          <input type="text" name="id_card_number" id="id_card_number" v-model="id_card_number"
            placeholder="Your ID Card Number here..." class="form-control" />
        </div>
        <div class="mb-3">
          <input type="password" name="password" id="password" v-model="password" placeholder="Your password here..."
            class="form-control" />
        </div>
        <button class="btn btn-primary w-100 rounded-4" @click="login">LOGIN</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id_card_number: '',
      password: ''
    }
  },
  methods: {
    login() {
      this.axios
        .post('http://serverside.test/api/v1/auth/login', {
          id_card_number: this.id_card_number,
          password: this.password
        })
        .then((res) => {
          this.$router.push('/')
          console.log(res.data.token)
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('district', res.data.regional.district)
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
  },
  mounted() {
    if (localStorage.getItem('token')) {
      this.$router.back()
    }
  }
}
</script>