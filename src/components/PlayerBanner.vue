<template>
    <div class="banner" :class="{selected: selected}">
        <div class="color" :class="{white: color == 'white', black: color == 'black'}"></div>
        <p class="player">{{ name }}</p>
    </div>
</template>

<script>
export default {
    props: ['width', 'name', 'color', 'selected'],
}
</script>

<style scoped>
    .banner {
        height: 50px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        background: #2a2a2a;
        border-radius: 8px;
        width: 80%;
        border: 2px solid #282828;
        transition: border 0.2s ease;
    }

    .color {
        width: 40px;
        height: 40px;
        border-radius: 40px;
        margin-left: 5px;
        margin-right: 16px;
    }

    .white {
        background: #eee;
    }

    .black {
        background: #222;
    }

    .player {
        font-size: 22px;
        font-weight: 600;
        padding: 0;
        margin: 0;
        width: 300px;
    }

    .selected {
        border: 2px solid white;
    }

    p {
        display: inline-block;
    }
</style>
