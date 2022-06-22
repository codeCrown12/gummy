<script>
export default {
  props: {
    custom_style: Object,
    images: Array,
  },
  data() {
    return {
      currentIndex: 0
    };
  },

  methods: {
    next: function() {
      this.currentIndex += 1;
    },
    prev: function() {
      this.currentIndex -= 1;
    }
  },

  computed: {
    currentImg: function() {
      return this.images[Math.abs(this.currentIndex) % this.images.length];
    }
  }
};
</script>
<template>
    <div class="slider-obj">
      <transition-group name="slide" tag="div">
        <div v-for="i in [currentIndex]" :key="i">
            <img class="slider-img" :style="custom_style" :src="currentImg" alt="">
        </div>
      </transition-group>
      <div class="slider-overlay" :style="custom_style">
        <div class="slider-overlay-body">
          <w-flex v-if="images.length >= 2" class="slider-controls" justify-space-between>
            <ion-icon @click="prev" class="slider-arrow" name="chevron-back-outline"></ion-icon>
            <ion-icon @click="next" class="slider-arrow" name="chevron-forward-outline"></ion-icon>
          </w-flex>
        </div>
      </div>
    </div>
</template>

<style scoped>
    .slider-obj{
        position: relative;
        width: 100%;
        overflow: hidden;
    }
    .slider-img{
        width: 100%;
        object-fit: cover;
    }
    .slider-overlay {
        position: absolute;
        padding: 10px;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        color: white;
    }
    .slider-overlay-body{
        display: flex;
        align-items: center;
        height: 100%;
    }
    .slider-controls{
      width: 100%;
    }
    .slider-arrow{
        background-color: rgba(235, 235, 235, 0.507);
        color: black;
        border-radius: 50%;
        padding: 4px;
        cursor: pointer;
    }
    .slider-arrow:hover{
        background-color: white;
    }
    .slide-enter-active,.slide-leave-active{
      transition: all 0.5s ease;
    }
    .slide-enter-from,.slide-leave-to {
      opacity: 0;
      position: absolute;
      width: 100%;
    }

</style>