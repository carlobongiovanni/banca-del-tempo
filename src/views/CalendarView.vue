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
      :events="events"
      :disable-views="['years']"
      :time-from="8*60"
      :time-to="20*60"
      @ready="calendarEventsCallback"
      @view-change="calendarEventsCallback"
      :on-event-click="onEventClick"
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
</div>

</template>

<script>
export default {
  data() {
    return {
      selectedEvent: {},
      eventDialog: {
        show: false,
        opacity: '0.5',
        persistent: true
      },
      events: [],
    }
  }, 
  methods: {
    calendarEventsCallback() {
      var calendarEvents = [
        {
          start: '2023-06-06 11:00',
          end: '2023-06-06 12:30',
          title: 'Spalare',
          content: 'Clicca per vedere',
          contentFull: 'Spalare merda. Questa attivita\' permette di migliorare la forza corporea. Guanti e pala sono provvisti gratuitamente', 
          class: 'leisure'
        },
        {
          start: '2023-06-07 15:00',
          end: '2023-06-07 17:00',
          title: 'Sistemare recinzione asini',
          content: 'Clicca per vedere',
          contentFull: 'Gli asini scappano e chi li tiene? Facciamo una bella recinzione dai, magari elettrificata con corrente a 220', 
          class: 'leisure'
        },
        {
          start: '2023-06-08 9:00',
          end: '2023-06-08 11:00',
          title: 'Annaffiare piante',
          content: 'Clicca per vedere',
          contentFull: 'Ho piantato pomodori ma non crescono. Forse hanno bisogno di acqua?', 
          class: 'leisure'
        },
        {
          start: '2023-06-13 11:00',
          end: '2023-06-13 12:30',
          title: 'Spalare',
          content: 'Clicca per vedere',
          contentFull: 'Spalare merda. Questa attivita\' permette di migliorare la forza corporea. Guanti e pala sono provvisti gratuitamente', 
          class: 'leisure'
        },
        {
          start: '2023-06-14 15:00',
          end: '2023-06-14 17:00',
          title: 'Sistemare recinzione asini',
          content: 'Clicca per vedere',
          contentFull: 'Gli asini scappano e chi li tiene? Facciamo una bella recinzione dai, magari elettrificata con corrente a 220', 
          class: 'leisure'
        },
        {
          start: '2023-06-15 9:00',
          end: '2023-06-15 11:00',
          title: 'Annaffiare piante',
          content: 'Clicca per vedere',
          contentFull: 'Ho piantato pomodori ma non crescono. Forse hanno bisogno di acqua?', 
          class: 'leisure'
        },      
      ]
      this.events = calendarEvents
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
</style>