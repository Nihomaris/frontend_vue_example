<template>
    <div class="close-button">
        <i class="material-icons close-button__button" @click="$emit('close')">close</i>
    </div>
</template>

<style lang="scss" scoped>
.close-button {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    
    &__button {
        color: #4E4E4E;
        cursor: pointer;
    }
}
</style>