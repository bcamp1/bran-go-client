<template>
  <div class="spot">
    <div class="piece" :class="classBindings"></div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'PieceSpot',
  props: ['piece', 'hover'],
  data: function() {
    return {
      emptyAnim: false,
      truePiece: this.piece,
    }
  },
  computed: {
    classBindings: function() {
      return {
        light: this.truePiece == 'w',
        dark: this.truePiece == 'b',
        empty: this.emptyAnim,
        hoverLight: this.piece == '' && this.hover == 'w',
        hoverDark: this.piece == '' && this.hover == 'b',
      }
    }
  },
  watch: {
    piece: function(newPiece) {
      if (newPiece == '') {
        this.emptyAnim = true;
        let that = this
        setTimeout(() => {
          that.truePiece = ''
          that.emptyAnim = false
        }, 500)
      } else {
        this.truePiece = newPiece
      }
    },
    truePiece: function() {
      if (this.truePiece != this.piece) {
        this.truePiece = this.piece
      }
    }
  }
}
</script>

<style scoped>
  .spot {
    /* border-radius: 30px; */
    display: grid;
    place-items: center;
  }

  .piece {
    width: 0px;
    height: 0px;
  }

  .dark {
    animation: grower 0.2s forwards;
    background: #222;
    border-radius: 50%;
  }

  .light {
    animation: grower 0.2s forwards;
    background: #eee;
    border-radius: 50%;
  }

  .empty {
    animation: shrinker 0.2s forwards;
    border-radius: 50%;
  }

  .hoverDark {
    width: 80%;
    height: 80%;
    background: #22222288;
    border-radius: 50%;
  }

  .hoverLight {
    width: 80%;
    height: 80%;
    background: #eeeeee88;
    border-radius: 50%;
  }

  @keyframes grower {
    0% {
      width: 0%;
      height: 0%;
    }
    80% {
      width: 90%;
      height: 90%;
    }
    100% {
      width: 80%;
      height: 80%;
    }
  }

  @keyframes shrinker {
    0% {
      width: 80%;
      height: 80%;
    }
    20% {
      width: 90%;
      height: 90%;
    }
    100% {
      width: 0%;
      height: 0%;
    }
  }
</style>