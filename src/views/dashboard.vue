<template>
  <div class="py-5 bg-light">
    <div class="container">
      <h1>Dashboard</h1>
    </div>
  </div>
  <div class="container mt-4">
    <h5>My Consultations</h5>
    <div class="col-3">
      <div class="card">
        <div class="card-header">
          <h5>Consultation</h5>
        </div>
        <div class="card-body p-0 m-0" :class="{ 'p-0': consultations }">
          <router-link
            to="consultation"
            class="border-0 bg-transparent text-decoration-none text-primary"
            v-if="!consultations"
          >
            + Request Consultation</router-link
          >
          <ul class="list-group list-group-flush" v-else>
            <li class="list-group-item">
              <div class="d-flex align-items-center">
                <h6 class="p-0 m-0 w-50">Status</h6>
                <div
                  class="badge"
                  :class="{
                    'bg-info': consultations.status == 'pending',
                    'bg-success': consultations.status == 'accepted',
                    'bg-danger': consultations.status == 'declined'
                  }"
                >
                  {{ consultations.status }}
                </div>
              </div>
            </li>
            <li class="list-group-item">
              <div class="d-flex align-items-center">
                <h6 class="p-0 m-0 w-50">Disease History</h6>
                <span>{{ consultations.disease_history ?? '-' }}</span>
              </div>
            </li>
            <li class="list-group-item">
              <div class="d-flex align-items-center">
                <h6 class="p-0 m-0 w-50">Current Symptoms</h6>
                <span>{{ consultations.current_symptoms ?? '-' }}</span>
              </div>
            </li>
            <li class="list-group-item">
              <div class="d-flex align-items-center">
                <h6 class="p-0 m-0 w-50">Doctor Name</h6>
                <span v-if="consultations.doctor">{{ consultations.doctor.name ?? '-' }}</span>
                <span v-else>-</span>
              </div>
            </li>
            <li class="list-group-item">
              <div class="d-flex align-items-center">
                <h6 class="p-0 m-0 w-50">Doctor Name</h6>
                <span v-if="consultations.doctor">{{ consultations.doctor_notes ?? '-' }}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <h5 class="mt-4">My Vaccinations</h5>
    <div class="row" v-if="consultationStatus">
      <div class="col-3 mb-4">
        <div class="card">
          <div class="card-header">
            <h5>First Vaccination</h5>
          </div>
          <div class="card-body m-0" :class="{ 'p-0': firstVaccination }">
            <router-link
              to="spots"
              class="border-0 bg-transparent text-decoration-none text-primary"
              v-if="!firstVaccination"
            >
              + Register Vaccination</router-link
            >
            <ul class="list-group list-group-flush" v-else>
              <li class="list-group-item">
                <div class="d-flex align-items-center">
                  <h6 class="p-0 m-0 w-50">Status</h6>
                  <div
                    class="badge"
                    :class="{
                      'bg-info': firstVaccination.status == 'pending',
                      'bg-success': firstVaccination.status == 'done',
                      'bg-danger': firstVaccination.status == 'declined'
                    }"
                  >
                    {{ firstVaccination.status }}
                  </div>
                </div>
              </li>
              <li class="list-group-item">
                <div class="d-flex align-items-center">
                  <h6 class="p-0 m-0 w-50">Date</h6>
                  <span>{{ firstVaccination.vaccination_date ?? '-' }}</span>
                </div>
              </li>
              <li class="list-group-item">
                <div class="d-flex align-items-center">
                  <h6 class="p-0 m-0 w-50">Spots</h6>
                  <span>{{ firstVaccination.spot.name ?? '-' }}</span>
                </div>
              </li>
              <li class="list-group-item">
                <div class="d-flex align-items-center">
                  <h6 class="p-0 m-0 w-50">Vaccine</h6>
                  <span v-if="firstVaccination.vaccine">{{
                    firstVaccination.vaccine.name ?? '-'
                  }}</span>
                  <span v-else>-</span>
                </div>
              </li>
              <li class="list-group-item">
                <div class="d-flex align-items-center">
                  <h6 class="p-0 m-0 w-50">Doctor Name</h6>
                  <span v-if="firstVaccination.vaccinator">{{
                    firstVaccination.vaccinator.name ?? '-'
                  }}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-3 mb-4" v-if="firstVaccinationStatus">
        <div class="card">
          <div class="card-header">
            <h5>Second Vaccination</h5>
          </div>
          <div class="card-body m-0" :class="{ 'p-0': secondVaccination }">
            <router-link
              to="spots"
              class="border-0 bg-transparent text-decoration-none text-primary"
              v-if="!secondVaccination"
            >
              + Register Vaccination</router-link
            >
            <ul class="list-group list-group-flush" v-else>
              <li class="list-group-item">
                <div class="d-flex align-items-center">
                  <h6 class="p-0 m-0 w-50">Status</h6>
                  <div
                    class="badge"
                    :class="{
                      'bg-info': secondVaccination.status == 'pending',
                      'bg-success': secondVaccination.status == 'done',
                      'bg-danger': secondVaccination.status == 'declined'
                    }"
                  >
                    {{ secondVaccination.status }}
                  </div>
                </div>
              </li>
              <li class="list-group-item">
                <div class="d-flex align-items-center">
                  <h6 class="p-0 m-0 w-50">Date</h6>
                  <span>{{ secondVaccination.vaccination_date ?? '-' }}</span>
                </div>
              </li>
              <li class="list-group-item">
                <div class="d-flex align-items-center">
                  <h6 class="p-0 m-0 w-50">Spots</h6>
                  <span>{{ secondVaccination.spot.name ?? '-' }}</span>
                </div>
              </li>
              <li class="list-group-item">
                <div class="d-flex align-items-center">
                  <h6 class="p-0 m-0 w-50">Vaccine</h6>
                  <span v-if="secondVaccination.vaccine">{{
                    secondVaccination.vaccine.name ?? '-'
                  }}</span>
                  <span v-else>-</span>
                </div>
              </li>
              <li class="list-group-item">
                <div class="d-flex align-items-center">
                  <h6 class="p-0 m-0 w-50">Doctor Name</h6>
                  <span v-if="secondVaccination.vaccinator">{{
                    secondVaccination.vaccinator.name ?? '-'
                  }}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="alert alert-warning" v-else>
      Your consultation must be approved by doctor to get the vaccine.
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      token: localStorage.getItem('token'),
      consultations: null,
      consultationStatus: false,
      firstVaccination: null,
      firstVaccinationStatus: false,
      secondVaccination: null
    }
  },
  mounted() {
    this.axios
      .get('http://serverside.test/api/v1/consultations?token=' + this.token)
      .then((res) => {
        if (res.data.consultation.length > 0) {
          this.consultations = res.data.consultation[0]
          if (res.data.consultation[0].status === 'accepted') {
            this.consultationStatus = true
          }
          if (this.consultations.status === 'accepted') {
            this.axios
              .get('http://serverside.test/api/v1/vaccinations?token=' + this.token)
              .then((res) => {
                this.firstVaccination = res.data.vaccinations.first
                this.secondVaccination = res.data.vaccinations.second
                if (res.data.vaccinations.first.status === 'done') {
                  this.firstVaccinationStatus = true
                }
              })
              .catch((err) => {
                console.log(err)
                this.vaccinations = null
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