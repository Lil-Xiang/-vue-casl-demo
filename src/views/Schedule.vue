<script setup>
import { ref, computed, onBeforeMount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { canPerform } from '../services/ability';

const route = useRoute();
const router = useRouter();

const formData = ref({
  id: '',
  time: '',
  activity: ''
})
const activities = ref([]);

const getLocalStorage = () => {
  let localActives = JSON.parse(localStorage.getItem("active"))
  if (localActives !== null) {
    activities.value = localActives
  }
}

const updateLocalStorage = () => {
  localStorage.setItem("active", JSON.stringify(activities.value));
  getLocalStorage()
};

const addActives = () => {
  activities.value.push({
    id: crypto.randomUUID(),
    time: formData.value.time,
    activity: formData.value.activity
  })
  formData.value = {
    id: '',
    time: '',
    activity: ''
  }
  updateLocalStorage();
}

const editActives = (id) => {
  const index = activities.value.findIndex((item) => item.id === id);
  if (index !== -1) {
    activities.value[index] = {
      ...activities.value[index],
      time: activities.value[index].time,
      activity: activities.value[index].activity
    };
    updateLocalStorage();
  }
}

const deleteActives = (id) => {
  activities.value = activities.value.filter((item) => item.id !== id);
  updateLocalStorage();
}

const canAdd = computed(() => {
  return canPerform('add', 'schedule');
})
const canEdit = computed(() => {
  return canPerform('update', 'schedule');
})
const canDelete = computed(() => {
  return canPerform('delete', 'schedule');
})

onBeforeMount(() => {
  getLocalStorage()
})
</script>

<template>
  <div class="schedule-container">

    <div class="head">
      <button @click="() => router.push('/')">GoBack</button>
      <h3>{{ route.query.role }}</h3>
    </div>
    <hr>
    <main class="main-container">
      <div v-if="canAdd" class="left-container">
        <form>
          <div class="form-example">
            <label for="name">Time: </label>
            <input type="time" v-model="formData.time" />
          </div>
          <div class="form-example">
            <label for="email">Activity: </label>
            <input type="text" v-model="formData.activity" />
          </div>
          <div class="form-example">
            <button @click="addActives">Add</button>
          </div>
        </form>
      </div>
      <div class="right-container">
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Activity</th>
              <th v-if="canEdit">Edit</th>
              <th v-if="canDelete">Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="activity in activities" :key="activity.id">
              <td>
                <input v-if="canEdit" v-model="activity.time" type="time">
                <span v-else>{{ activity.time }}</span>
              </td>
              <td>
                <input v-if="canEdit" v-model="activity.activity" type="text">
                <span v-else>{{ activity.activity }}</span>
              </td>
              <td v-if="canEdit">
                <button @click="editActives(activity.id)">Edit</button>
              </td>
              <td v-if="canDelete">
                <button @click="deleteActives(activity.id)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>
</template>

<style scoped>
.schedule-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  gap: 10px;
}

.head {
  display: flex;
  width: var(--width);
  align-items: center;
  gap: 20px;
}

.main-container {
  display: flex;
  gap: 50px;
  width: var(--width);
}

.left-container {
  display: flex;
  align-items: center;
}

.form-example {
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
}

table {
  border-collapse: collapse;
  border: 2px solid rgb(140 140 140);
  font-family: sans-serif;
  font-size: 0.8rem;
  letter-spacing: 1px;
}

caption {
  caption-side: bottom;
  padding: 10px;
  font-weight: bold;
}

thead,
tfoot {
  background-color: rgb(237, 237, 237);
}

th,
td {
  width: 120px;
  border: 1px solid rgb(160 160 160);
  padding: 8px 10px;
}

td:last-of-type {
  text-align: center;
}

.button-container {
  display: flex;
  gap: 10px;
}

hr {
  width: var(--width);
  border-style: inset;
  border-width: 1px;
}
</style>