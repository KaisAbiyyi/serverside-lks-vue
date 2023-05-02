<template>
  <div class="py-5 bg-light">
    <div class="container d-flex justify-content-between align-items-center">
      <div class="col">
        <h1>{{ spot.name }}</h1>
        <h6 class="text-secondary">{{ spot.address }}</h6>
      </div>
      <button class="btn btn-primary rounded-0" @click="postVaccination">
        Register Vaccination
      </button>
    </div>
  </div>
  <div class="container mt-4">
    <label for="date">Select vaccination date</label>
    <input type="date" id="date" v-model="date" class="form-control mb-3 w-25" @change="byDate" />
    <div class="row">
      <div class="col bg-white card m-3 p-3" v-for="(item, index) in dividedData" :key="index">
        <div class="d-flex justify-content-between align-items-">
          <h5>Session {{ index + 1 }}</h5>
          <h6 class="text-secondary">{{ item.time }}</h6>
        </div>
        <div class="row mt-3">
          <div
            class="col-5 text-center p-3 m-3"
            v-for="(subitem, subindex) in item.data"
            :key="subindex"
            :class="{
              'bg-primary text-white': subitem.first === true,
              'border border-2 border-success': subitem.status === true
            }"
          >
            #{{ subitem.no }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      token: localStorage.getItem('token'),
      data: {},
      spot: {},
      date: new Date().toLocaleDateString('sv')
    }
  },
  mounted() {
    this.axios
      .get(
        'http://serverside.test/api/v1/spots/' +
          this.$route.params.id +
          '?token=' +
          this.token +
          '&date=' +
          this.date
      )
      .then((res) => {
        this.spot = res.data.spot
        this.data = res.data
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
  },
  computed: {
    dividedData() {
      const chunkSize = Math.ceil(this.spot.capacity / 3)
      const data = []
      let counter = 0
      while (counter < this.spot.capacity) {
        const chunk = {}
        if (counter === 0) {
          chunk.time = '09:00 - 11:00'
        } else if (counter === 1) {
          chunk.time = '13:00 - 15:00'
        } else {
          chunk.time = '15:00 - 17:00'
        }
        chunk.data = []
        for (let i = 0; i < chunkSize && counter < this.spot.capacity; i++) {
          chunk.data.push({
            no: counter + 1,
            status: false,
            first: false
          })
          counter++
        }
        data.push(chunk)
        if (this.data.vaccinations_count !== 0) {
          const resultObject = data.find((item) =>
            item.data.find((d) => d.no === this.data.vaccinations_count + 1)
          )
          const resultValue = resultObject
            ? resultObject.data.find((d) => d.no === this.data.vaccinations_count + 1)
            : null
          if (resultValue) {
            resultValue.first = true
            data.forEach((e) => {
              e.data.forEach((e) => {
                if (e.no - 1 < this.data.vaccinations_count) {
                  e.status = true
                }
              })
            })
          }
        } else {
          data[0].data[0].first = true
        }
      }
      return data
    }
  },
  methods: {
    byDate() {
      this.axios
        .get(
          'http://serverside.test/api/v1/spots/' +
            this.$route.params.id +
            '?token=' +
            this.token +
            '&date=' +
            this.date
        )
        .then((res) => {
          this.spot = res.data.spot
          this.data = res.data
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
    },
    postVaccination() {
      this.axios
        .post('http://serverside.test/api/v1/vaccinations?token=' + this.token, {
          spot_id: this.$route.params.id,
          date: this.date
        })
        .then((res) => {
          alert(res.data.message)
          setTimeout(() => {
            this.axios
              .get(
                'http://serverside.test/api/v1/spots/' +
                  this.$route.params.id +
                  '?token=' +
                  this.token +
                  '&date=' +
                  this.date
              )
              .then((res) => {
                this.spot = res.data.spot
                this.data = res.data
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
          }, 1000)
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