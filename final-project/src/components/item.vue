<script>
import imageslider from "../components/imageslider.vue"
export default {
    data(){
        return{
            images: [
                "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870",
                "https://images.unsplash.com/photo-1580707221190-bd94d9087b7f?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387",
                "https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870",
                "https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=876"
            ],
            slider_style: {'height': '140px', 'border-top-left-radius': '0px', 'border-top-right-radius': '0px'}
        }
    },
  components: { imageslider }
};
</script>
<template>
    <div>
        <div class="item-card">
            <imageslider :custom_style="slider_style" :images="images"></imageslider>
            <div class="item-card-body">
                <div>
                    <div>
                        <p class="ma0 mt1 text-bold">Nice super lens camera X4 2021</p>
                        <p class="ma0">AED 200/day</p>
                    </div>
                </div>
                <div class="mt2">
                    <w-button style="width: 100%;" class="btn" route="/itemdetails" color="success" sm outline>More details</w-button>
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