<template>
  <div class="py-5 bg-light">
    <div class="container">
      <h1>Request Consultation</h1>
    </div>
  </div>
  <div class="container mt-4">
    <div class="col-5">
      <div class="d-flex justify-content-between">
        <h5>Do you have disease history?</h5>
        <select
          name="disease_history_check"
          id="disease_history_check"
          class="form-select w-25"
          v-model="disease_history_check"
        >
          <option value="true">Yes, I have</option>
          <option value="false">No</option>
        </select>
      </div>
      <div class="mt-3">
        <textarea
          name="disease_history"
          id=""
          v-model="disease_history"
          cols="30"
          placeholder="Describe your disease history"
          rows="10"
          class="form-control"
          v-if="disease_history_check == 'true'"
        ></textarea>
      </div>
      <div class="d-flex justify-content-between mt-4">
        <h5>Do you have disease history?</h5>
        <select
          name="symptoms_check"
          id="symptoms_check"
          class="form-select w-25"
          v-model="symptoms_check"
        >
          <option value="true">Yes, I have</option>
          <option value="false">No</option>
        </select>
      </div>
      <div class="mt-3">
        <textarea
          name="symptoms"
          v-model="symptoms"
          id=""
          placeholder="Describe your current symtoms"
          cols="30"
          rows="10"
          class="form-control"
          v-if="symptoms_check == 'true'"
        ></textarea>
      </div>
      <button type="button" class="btn btn-primary rounded-0 mt-4" @click="sendRequest">
        Send Request
      </button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      token: localStorage.getItem('token'),
      disease_history_check: 'true',
      disease_history: null,
      symptoms_check: 'true',
      symptoms: null
    }
  },
  methods: {
    sendRequest() {
      this.axios
        .post('http://serverside.test/api/v1/consultations?token=' + this.token, {
          disease_history: this.disease_history,
          current_symptoms: this.symptoms
        })
        .then((res) => {
          this.$router.push('/')
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