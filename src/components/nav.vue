<template>
  <nav class="navbar navbar-expand-lg bg-primary navbar-dark">
    <div class="container">
      <a class="navbar-brand" href="#">E-VACCINATION</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav d-flex justify-content-end w-100">
          <a class="nav-link" aria-current="page" href="#">Home</a>
          <button class="nav-link border-0 bg-transparent" @click="logout" type="button">
            Logout
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  data() {
    return {
      token: localStorage.getItem('token')
    }
  },
  methods: {
    logout() {
      this.axios
        .post('http://serverside.test/api/v1/auth/logout?token=' + this.token)
        .then((res) => {
          this.$router.push('/login')
          localStorage.removeItem('token')
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
}
</script>