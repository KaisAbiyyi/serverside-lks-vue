<template>
  <Navbar></Navbar>
  <RouterView></RouterView>
</template>
<script>
import Navbar from '../src/components/nav.vue'

export default {
  components: {
    Navbar
  }
}
</script>