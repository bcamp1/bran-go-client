<template>
  <div id="wrapper">
    <div v-if="type == 'player'">
      <SelectColor v-if="colorCountDown !== 0" :colorCountDown=colorCountDown :enemyChoice=enemyColorChoice @choice="setColorChoice"></SelectColor>
    </div>
    <Game v-if="colorCountDown === 0 || type == 'spectator'" :socket=socket :playerColor=color></Game>
  </div>
</template>



<script>
import Game from './components/Game.vue'
import SelectColor from './components/SelectColor.vue'

const namegen = require('project-name-generator')

export default {
  data: function() {
    return {
      size: 9,
      pieces: [],
      socket: null,
      name: namegen({ words: 3 }).dashed,
      room: '',
      waitingForPlayers: true,
      colorChoice: 'none',
      enemyColorChoice: '',
      type: 'spectator',
      colorCountDown: null,

      color: 'none',
    }
  },
  created: function() {
    console.log("Created")
    this.socket = io('http://localhost/', {
      transports: ['websocket']
    });

    for (let i = 0; i < this.size*this.size; i++) {
      this.pieces.push('')
    }

    // Get name from local storage
    // if ('name' in localStorage) {
    //   this.name = localStorage['name']
    // } else {
    //   localStorage['name'] = this.name
    // }

    // Get room
    const loc = window.location.pathname;
    this.room = loc.split('room/')[1].split('/')[0]

    const joinInfo = {
      room: this.room,
      name: this.name
    }

    this.socket.emit('join', joinInfo)
    this.socket.on('enemyColor', this.setEnemyColor)
    this.socket.on('type', this.setType)
    this.socket.on('color', this.setColor)
    this.socket.on('colorCountDown', this.setColorCountDown)
  },
  watch: {
    colorChoice: function() {
      this.socket.emit('colorChoice', this.colorChoice)
    }
  },
  methods: {
    setEnemyColor(color) {
      this.enemyColorChoice = color
    },
    setColorChoice(c) {
      this.colorChoice = c
    },
    setType(type) {
      this.type = type
    },
    setColor(color) {
      this.color = color
    },
    setColorCountDown(c) {
      this.colorCountDown = parseInt(c)
    }
  },
  components: {Game, SelectColor},

}
</script>

<style>
  html, body {
    margin: 0;
    padding: 0;
    color: white;
    font-family: Arial, Helvetica, sans-serif;
  }

  #wrapper {
    background: #333;
    width: 100%;
    height: 100%;
    position: absolute;
    display: grid;
    place-items: center;
  }

</style>
