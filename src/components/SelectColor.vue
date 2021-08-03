<template>
  <div id="select-wrapper">
    <h1 v-if="colorCountDown == null">Waiting for Players. Vote on what color you want to play as.</h1>
    <h1 v-else>Choosing colors in {{ colorCountDown }} seconds.</h1>
    <div id="options">
      <button @click="selectBlack" id="black" :class="getClasses('black')"></button>
      <button @click="selectWhite" id="white" :class="getClasses('white')"></button>
      <button @click="selectNone" id="none" :class="getClasses('none')"></button>
    </div>
  </div>
</template>

<script>

export default {
  data: function() {
    return {
      choice: 'none',
    }
  },
  props: ['enemyChoice', 'colorCountDown'],
  methods: {
    selectBlack() {
      this.choice = 'black'
      this.$emit('choice', this.choice)
    },
    selectWhite() {
      this.choice = 'white'
      this.$emit('choice', this.choice)
    },
    selectNone() {
      this.choice = 'none'
      this.$emit('choice', this.choice)
    },
    getClasses(target) {
      return {
        selected: this.choice == target,
        enemySelected: this.enemyChoice == target,
      }
    },
  }
}
</script>

<style scoped>
  #select-wrapper {
    max-width: 800px;
    margin-left: 32px;
    margin-right: 32px;
  }

  #options {
    margin-top: 16px;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }

  h1 {
    text-align: center;
  }

  button {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: none;
    transition: all 0.2s ease;
    position: relative;
  }

  #white {
    background: #eee;
  }

  #black {
    background: #222;
  }

  #none {
    background: rgb(200, 175, 133);
    /* background-image: url('../../assets/stripes.png'); */
    /* background-size: contain; */
  }

  #none::before {
    content: 'Any';
    color: white;
    font-size: 22px;
    font-weight: 60;
    position: relative;
    width: 100px;
    text-align: center;
  }

  button:hover {
    transform: translateY(-3px);
  }

  .selected {
    box-shadow: 0 0 5px 5px #ff00ff;
  }

  .enemySelected {
    /* box-shadow: 0 0 10px 5px #cc0000; */
  }

  button::after {
    content: 'Enemy Choice';
    position: absolute;
    top: 116px;
    left: 0px;
    color: red;
    font-weight: 600;
    font-size: 18px;
    border-top: 2px solid red;
    width: 100px;
    padding-top: 8px;
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  .enemySelected::after {
    opacity: 1;
  }
</style>