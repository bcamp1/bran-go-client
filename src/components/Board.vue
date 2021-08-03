<template>
  <div id="board" :style="cellGridStyle">
    <div class="cell" v-for="i in gridSizeArray" :key="i"></div>
    <div id="spot-board" :style="spotGridStyle">
      <PieceSpot v-for="(piece, index) in pieces" 
      :key="index.toString()" 
      @click.native="spotClicked(index)"
      @mouseover.native="spotHovered(index)"
      @mouseleave.native="spotLeave"
      :hover="isHover(index)"
      :piece="piece"></PieceSpot>
    </div>
  </div>
</template>

<script lang="ts">
import PieceSpot from './PieceSpot.vue'
export default {
  name: 'Board',
  props: ['size', 'width', 'editor', 'brushPiece', 'pieces', 'showHover'],
  data: function() {
    return {
      hoverIndex: -1,
    }
  },
  created: function() {
    let hovers = []
      for (let i = 0; i < this.pieces.length; i++) {
        hovers.push('')
      }
      this.hovers = hovers;
    },
  methods: {
    isHover(index) {
      if (index == this.hoverIndex) {
        return this.brushPiece
      }
      return ''
    },
    enemyPiece(piece) {
      if (piece == 'b') return 'w'
      if (piece == 'w') return 'b'
      return ''
    },
    spotClicked(index) {
      if (this.pieces[index] == '') {
        this.$emit('stone-request', {index: index, color: this.brushPiece})
      }
    },
    spotHovered(index) {
      if (this.pieces[index] == '') {
        if (this.showHover) {
          this.hoverIndex = index;
        }
      }
    },
    spotLeave() {
      this.hoverIndex = -1
    },
  },
  computed: {
    
    gridSizeArray: function() {
      let arr = []
      for (let i = 0; i < (this.size-1)*(this.size-1); i++) {
        arr.push(i)
      }
      return arr
    },
    spotSizeArray: function() {
      let arr = []
      for (let i = 0; i < this.size*this.size; i++) {
        arr.push(i)
      }
      return arr
    },
    cellGridStyle: function() {
      return {
        gridTemplateColumns: `repeat(${this.size-1}, 1fr)`,
        gridTemplateRows: `repeat(${this.size-1}, 1fr)`,
        width: this.width + 'px',
        height: this.width + 'px',
      }
    },
    spotGridStyle: function() {
      let size = (this.size / (this.size - 1)) * this.width
      let cellSize = this.width / (this.size-1);
      return {
        gridTemplateColumns: `repeat(${this.size}, 1fr)`,
        gridTemplateRows: `repeat(${this.size}, 1fr)`,
        width: size + 'px',
        height: size + 'px',
        top: -cellSize / 2 + 'px',
        left: -cellSize / 2 + 'px',
      }
    },
  },
  components: {PieceSpot},
  watch: {
    pieces: function() {
      let hovers = []
      for (let i = 0; i < this.pieces.length; i++) {
        hovers.push('')
      }
      this.hovers = hovers;
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #board {
    
    background: #555;
    display: grid;
    gap: 1px;
    border: 1px solid #555;
    position: relative;
  }

  #board-wrapper {
    padding: 0.4%;
    background: #555;
  }

  .cell {
    background: #333;
  }

  #spot-board {
    width: 900px;
    height: 900px;
    position: absolute;

    display: grid;
  }

  #editor {
    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    width: 400px;
    margin-bottom: 60px;
  }

  #editor > * {
    transition: transform 0.2s ease;
  }

  #editor > *:hover {
    cursor: pointer;
  }

  #trashIcon {
    width: 40px;
  }

  #editorWhite {
    width: 40px;
    height: 40px;
    background: #eee;
    border-radius: 50%;
  }

  #editorBlack {
    width: 40px;
    height: 40px;
    background: #222;
    border-radius: 50%;
  }

  .editor-selected {
    transform: scale(1.5);
  }
</style>
