<template>
    <div id="game-wrapper">
        <div id="main-section">
            <div id="info-bar">
                <span>Move {{ turn }}: {{ turnColor }} to move.</span>
            </div>
            <div id="board-section" ref="boardSection">
                <PlayerBanner id="topPlayer" width=100 :color=playerColors.top :selected="turnColor == playerColors.top" :name=playerNames.top></PlayerBanner>
                <Board id="board" @stone-request="stoneRequest" :size=size :pieces=pieces :width=boardWidth editor=false :brushPiece=brushPiece :showHover="playerColor == turnColor"></Board>
                <PlayerBanner id="bottomPlayer" width=100 :color=playerColors.bottom :selected="turnColor == playerColors.bottom" :name=playerNames.bottom></PlayerBanner>
            </div>
        </div>
        <div id="sidebar">

        </div>    
    </div>
</template>

<script>
import Board from './Board.vue'
import PlayerBanner from './PlayerBanner.vue'

export default {
    data: () => ({
        boardString: '',
        size: 0,
        turn: 0,
        turnColor: 'none',
        sectionWidth: 0,
        sectionHeight: 0,
    }),
    components: {Board, PlayerBanner},
    props: ['socket', 'playerColor'],
    created: function() {
        this.socket.on('board', this.onBoard)
        this.socket.emit('boardRequest', '')
        window.addEventListener("resize", this.onResize);


        this.$nextTick(this.onResize)
    },
    destroyed: function() {
        window.removeEventListener("resize", this.onResize);
    },
    computed: {

        playerColors: function() {
             if (this.playerColor == 'none') {
                return {
                    top: 'white',
                    bottom: 'black',
                }
            } else {
                const enemyColor = this.playerColor == 'white' ? 'black' : 'white'
                return {
                    top: enemyColor,
                    bottom: this.playerColor,
                }
            }
        },

        playerNames: function() {
            if (this.playerColor == 'none') {
                return {
                    top: 'Player 1',
                    bottom: 'Player 2',
                }
            } else {
                return {
                    top: 'Them',
                    bottom: 'You',
                }
            }
        },

        boardWidth: function() {
            const maxWidth = 600;
            const widthConstraint = this.sectionWidth * 0.80
            const heightConstraint = this.sectionHeight * 0.70
            return Math.min(maxWidth, widthConstraint, heightConstraint)
        },
        
        brushPiece: function() {
            if (this.playerColor == 'none') return ''
            if (this.playerColor == 'white') return 'w'
            if (this.playerColor == 'black') return 'b'
            throw 'Invalid player color ' + this.playerColor
        },
        pieces: function() {
            let rows = this.boardString.split('\n')
            rows.splice(rows.length - 1, 1)

            let pieces = []

            console.log(this.boardString)
            rows.forEach(row => {
                for (let i = 0; i < row.length; i++) {
                    let char = row.charAt(i)
                    
                    switch (char) {
                        case '-':
                            pieces.push('')
                            break
                        case 'w':
                            pieces.push('w')
                            break
                        case 'b':
                            pieces.push('b')
                            break
                        default:
                            throw 'Invalid char ' + char
                    }
                }
            })

            return pieces
        }
    },
    methods: {
        onBoard: function(data) {
            this.boardString = data['board']
            this.size = parseInt(data['size'])
            this.turn = parseInt(data['turn'])
            this.turnColor = data['turnColor']
        },

        stoneRequest: function(data) {
            console.log(data)
            this.socket.emit('stoneRequest', data.index)
        },

        getSectionWidth: function() {
            return this.$refs.boardSection.clientWidth
        },

        getSectionHeight: function() {
            return this.$refs.boardSection.clientWidth
        },

        onResize: function(e) {
            try {
                this.sectionWidth = this.getSectionWidth()
                this.sectionHeight = this.getSectionHeight()
            } catch (e) {
                console.log(e)
            }
        }
    }
}
</script>

<style scoped>
#game-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    background: #282828;
}

#main-section {
    min-width: 300px;
    flex-grow: 2;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
}

#info-bar {
    height: 80px;
    background: #282828;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
}

#info-bar > span {
    font-size: 22px;
    font-weight: 600;
    margin-left: 32px;
}

#board-section {
    background: #333;
    flex-grow: 2;
    flex-shrink: 2;
    flex-basis: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    border-top-right-radius: 16px;
    max-width: 1000px;
}

#sidebar {
    background: #282828;
    max-width: 300px;
    min-width: 100px;
    flex-grow: 1;
    flex-shrink: 1;
}

#topPlayer {
    margin-bottom: 22px;
}

#bottomPlayer {
    margin-top: 22px;
}
</style>

