<script>
import imageslider from "../components/imageslider.vue"
export default {
    props:{
        itemDetails: Object
    },
    computed: {
        linkToDetails(){
            return "/itemdetails/"+this.itemDetails.itemId
        }
    },
    data(){
        return{
            slider_style: {'height': '120px', 'border-top-left-radius': '0px', 'border-top-right-radius': '0px'}
        }
    },
  components: { imageslider }
};
</script>
<template>
    <div>
        <div class="item-card">
            <imageslider :custom_style="slider_style" :images="itemDetails.images"></imageslider>
            <div class="item-card-body">
                <div>
                    <div>
                        <p class="ma0 text-bold">{{itemDetails.name}}</p>
                        <p class="ma0">AED {{itemDetails.pricing.priceOne}}/day</p>
                    </div>
                </div>
                <div class="mt2">
                    <w-button style="width: 100%; padding: 13px;" class="btn" :route="linkToDetails" color="success" sm outline>More details</w-button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .item-card{
        width: 100%;
        border: 1px solid rgba(0,0,0,.15);
        border-radius: 0px;
    }
    .item-card-body{
        padding: 10px;
    }
</style>