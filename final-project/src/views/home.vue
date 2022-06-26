<script>
import navbar from '../components/navbar.vue'
export default {
    components: { navbar }
}
</script>

<template>
    <div>
        <navbar></navbar>
        <div class="w-flex justify-center align-center jumbotron">
            <div class="md8">
                <p class="caption-text">
                    <span class="text-success">Rent</span> items from your friends at <span class="text-success">school</span>
                </p>
                <div class="w-flex justify-center align-center mt2">
                    <w-button route="/searchitems" class="btn pa5" bg-color="success">Get Started Now</w-button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.jumbotron{
    /* border: 1px solid black; */
    height: 450px;
}
.caption-text{
    font-family: Catamaran,sans-serif !important;
    font-size: 4.7em;
    font-weight: bolder !important;
    text-align: center;
    line-height: 1.1em;
    text-transform: capitalize;
}
</style>