<script setup>
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
</script>

<template>
  <div class="about">
    <h1>La Banca del Tempo</h1>
    <h3>Questo portale permette agli utenti registrati di partecipare alle attivita' del club. </h3>
    <h3>Qui sotto trovi il calendario attuale con le attivita' disponibili. Se vuoi prendere parte ad una di queste, ti preghiamo di effettuare il login e di selezionare quello che ti interessa.</h3>
    <h3>Una volta che il lavoro è stato eseguito poi la direzione ti accredita il tempo nella sua banca. Come premi direi di mettere 6 uova ogni 2 ore di lavoro, dopo 30 ore tesserino 5 lezioni, dopo 50 ore tesserino 10 lezioni.</h3>
    <vue-cal 
      style="height: 500px"
      :events="bdtevents"
      :disable-views="['year', 'day']"
      :time-from="8*60"
      :time-to="20*60"
      @ready="fetchEvents"
      @view-change="fetchEvents"
      :snap-to-time="15"
      hide-weekends
      editable-events
      :on-event-create="onEventCreate"
      :on-event-click="onEventClick"
      @event-drag-create="showEventCreationDialog = true"
      class="vuecal--full-height-delete"
    />

    <w-dialog
      v-model="eventDialog.show"
      :width="500"
      :persistent="eventDialog.persistent"
      :overlay-opacity="eventDialog.opacity"
      >
        <template #title>
          <w-icon class="mr2">mdi mdi-tune</w-icon>
          Dati dell'evento selezionato
        </template>
        <div>
          <strong>Dettagli dell'evento:</strong>
          <br/>
          <span>{{ selectedEvent.title }}</span>
          <ul>
            <li>Inizia: {{ selectedEvent.start && selectedEvent.start.formatTime() }}</li>
            <li>Termina: {{ selectedEvent.end && selectedEvent.end.formatTime() }}</li>
          </ul>
          <span>{{ selectedEvent.contentFull }}</span>
        </div>
        <template #actions>
          <div class="spacer" />
        <w-button @click="eventDialog.show = false">Close</w-button>
      </template>
    </w-dialog>

    <w-dialog
      v-model="showEventCreationDialog"
      :width="500"
      :persistent="eventDialog.persistent"
      :overlay-opacity="eventDialog.opacity"
      >
        <template #title>
          <w-icon class="mr2">mdi mdi-tune</w-icon>
          <w-input
            class="mb4"
            label="Title"
            v-model="selectedEvent.title">
            {{ selectedEvent.title }}
          </w-input>
        </template>
        <div>
          <strong>Dettagli dell'evento:</strong>
          <ul>
            <li>Inizia: {{ selectedEvent.start && selectedEvent.start.formatTime() }}</li>
            <li>Termina: {{ selectedEvent.end && selectedEvent.end.formatTime() }}</li>
          </ul>
          <span>
            <w-input
            class="mb4"
            label="contentFull"
            v-model="selectedEvent.contentFull">
            {{ selectedEvent.contentFull }}
          </w-input>
          </span>
        </div>
        <template #actions>
          <div class="spacer" />
          <w-button @click="cancelEventCreation()">Cancel</w-button>
          <w-button @click="saveEvent(selectedEvent)">Save</w-button>
      </template>
    </w-dialog>
</div>

</template>

<script>
import { fetchWrapper, functionToGenerateErrorEvent } from '@/helpers';
var baseUrl = "https://eu-central-1.aws.data.mongodb-api.com/app/bancadeltempo-iwvgr/endpoint/events"

export default {
  data() {
    return {
      selectedEvent: {},
      showEventCreationDialog: false,
      eventDialog: {
        show: false,
        opacity: '0.5',
        persistent: true
      },
      bdtevents: [],
      backendEvents: [],
      calendarEvents: [],
      events: []
    }
  }, 
  methods: {
    onEventCreate (event, deleteEventFunction) {
      this.selectedEvent = event
      this.deleteEventFunction = deleteEventFunction

      // should I push into bdtevents instead?
      event.id=this.events.length+1
      this.events.push(event)

      return event
    },
    cancelEventCreation () {
      this.closeCreationDialog()
      this.deleteEventFunction()
    },
    getEventHours(m) {
      var hours = (m / 60);
      var rhours = Math.floor(hours);
      return rhours
    },
    getEventMinutes(m) {
      var hours = (m / 60);
      var rhours = Math.floor(hours);
      var minutes = (hours - rhours) * 60;
      var rminutes = Math.round(minutes);
      return rminutes
    },
    saveEvent (selectedEvent) {
      console.log('Storing event', { selectedEvent })

      // compute week as we need it for fetching events
      selectedEvent.week = selectedEvent.start.getWeek()
      // fix dates
      selectedEvent.guessStart = selectedEvent.start.format("YYYY-MM-DD") 
        + " " 
        + this.getEventHours(selectedEvent.startTimeMinutes) 
        + ":" 
        + this.getEventMinutes(selectedEvent.startTimeMinutes)
      selectedEvent.guessEnd = selectedEvent.end.format("YYYY-MM-DD")
        + " " 
        + this.getEventHours(selectedEvent.endTimeMinutes) 
        + ":" 
        + this.getEventMinutes(selectedEvent.endTimeMinutes)

      this.storeEventIntoBackend(selectedEvent)
        .then(response => {
          console.log(response)
          this.events.pop(1)
        }
      )

      this.closeCreationDialog()
    },
    closeCreationDialog () {
      this.showEventCreationDialog = false
      this.selectedEvent = {}
    },
    async storeEventIntoBackend(selectedEvent) {
      const stored = await fetchWrapper.post(`${baseUrl}/create`, { selectedEvent })
      return stored
    },
    fetchEvents({ view, startDate, endDate, week }) {
      console.log('Fetching events', { view, startDate, endDate, week })

      this.getEventsFromBackend(week)
        .then(response => this.bdtevents = response)
        .catch(error => {
            console.log(error)
            this.bdtevents = [functionToGenerateErrorEvent(startDate, endDate)]
          } 
        )
    },
    async getEventsFromBackend(week) {
      const calendarEvents = await fetchWrapper.post(`${baseUrl}`, { week });
      return calendarEvents
    },
    onEventClick (event, e) {
      this.selectedEvent = event
      this.eventDialog.show = true

      e.stopPropagation()
    }
  }
}
</script>

<style>
.vuecal__event {cursor: pointer;}

.vuecal__event-title {
  font-size: 0.9em;
  font-weight: bold;
  margin: 1px 0 2px;
}

.vuecal__event-time {
  display: inline-block;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}

.vuecal__event-content {
  font-style: italic;
}

.vuecal__event.backendError {
  background: repeating-linear-gradient(45deg, transparent, transparent 10px, #f2f2f2 10px, #f2f2f2 20px);/* IE 10+ */
  color: #999;
  align-items: center;
}
</style>