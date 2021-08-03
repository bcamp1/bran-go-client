<template>
  <div id="wrapper">
    <div id="top-bar">
      <h1>BranGos</h1>
    </div>
    <div id="main">
      <h1>Current Games</h1>
      <div class="roomListing" v-for="(value, name) in rooms" :key=name>
        <a :href="'/room/' + name">/{{ name }}</a>
        <span>{{ value }} people</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      rooms: {}
    }
  },
  methods: {
    fetchGames: async function() {
      const res = await fetch('/current-rooms')
      this.rooms = await res.json()
    }
  },

  created: function() {
    this.fetchGames()
    setInterval(this.fetchGames, 5000)
  }
}
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  color: white;
  font-family: Arial, Helvetica, sans-serif;
}

* {
  margin: 0;
  padding: 0;
}

#wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #333;
  display: grid;
  grid-template-rows: 50px 1fr;
  grid-template-columns: 1fr;
}

#top-bar {
  background: #282828;
  padding-left: 36px;
  display: flex;
  flex-direction: row;
  align-items: center;
}

#main {
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#main > h1 {
  margin-bottom: 8px;
}

.roomListing {
  padding: 4px;
  font-size: 22px;
}

.roomListing > span {
  color: #aaa;
}

.roomListing > a {
  /* border-bottom: 2px solid white; */
  font-weight: 600;
  color: white;
}

.roomListing > a:hover {
  cursor: pointer;
}
</style>
