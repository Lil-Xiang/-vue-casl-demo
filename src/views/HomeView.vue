<script setup>
import { useRouter } from 'vue-router';
import { roles, setAbilityForRole } from '../services/ability';
import { firstTextUPPerCase } from '../utils/textChange'

const router = useRouter();

const navigateToSchedule = (role) => {
  setAbilityForRole(role);
  let queryStr = ''
  if (role === 'owner') {
    queryStr = 'User: Owner. Can Read & Edit & Add & Delete.'
  }
  if (role === 'firstPick') {
    queryStr = 'User: FirstPick. Can Read & Edit.'
  }
  if (role === 'secondPick') {
    queryStr = 'User: SecondPick. Can Read.'
  }
  router.push({
    path: '/schedule',
    query: { role: queryStr }
  });
};
</script>

<template>
  <div class="home-outside">
    <h2>Choose Your Identity.</h2>
    <div class="button-container">
      <button v-for="(role, index) in roles" :key="index" @click="navigateToSchedule(role)">
        {{ firstTextUPPerCase(role) }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.home-outside {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  gap: 30px;
}

.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
</style>
