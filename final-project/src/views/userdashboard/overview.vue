<script>
import imageslider from '../../components/imageslider.vue'
export default {
    components: { imageslider },
    data(){
        return{
            images: [
                "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870",
                "https://images.unsplash.com/photo-1580707221190-bd94d9087b7f?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387",
                "https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870",
                "https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=876"
            ],
            slider_style: {'height': '150px', 'border-radius': '13px'}
        }
    },
}
</script>
<template>
    <div>
        <div class="flex-padding">
            <h1>Hello Marc,</h1>
            <p class="text-light">This is what we've got for you today.</p>
        </div>
        <div class="w-flex mt1 wrap">
            <div class="md3 xs12 flex-padding">
                <w-card class="overview-card">
                    <div class="w-flex align-center justify-space-between">
                        <div>
                            <h4>New requests</h4>
                            <h1>2</h1>
                        </div>
                        <img class="overview-card-icon" src="../../assets/images/undraw_investing_re_bov7.svg" alt="">
                    </div>   
                </w-card>
            </div>
            <div class="md3 xs12 flex-padding">
                <w-card class="overview-card">
                    <div class="w-flex align-center justify-space-between">
                        <div>
                            <h4>My bookings</h4>
                            <h1>10</h1>
                        </div>
                        <img class="overview-card-icon" src="../../assets/images/undraw_investing_re_bov7.svg" alt="">
                    </div>   
                </w-card>
            </div>
            <div class="md3 xs12 flex-padding">
                <w-card class="overview-card">
                    <div class="w-flex align-center justify-space-between">
                        <div>
                            <h4>Out for rent</h4>
                            <h1>15</h1>
                        </div>
                        <img class="overview-card-icon" src="../../assets/images/undraw_investing_re_bov7.svg" alt="">
                    </div>   
                </w-card>
            </div>
            <div class="md3 xs12 flex-padding">
                <w-card class="overview-card">
                <div class="w-flex align-center justify-space-between">
                    <div>
                        <h4>Inventory count</h4>
                        <h1>24</h1>
                    </div>
                    <img class="overview-card-icon" src="../../assets/images/undraw_investing_re_bov7.svg" alt="">
                </div>   
                </w-card>
            </div>
        </div>
        <div class="mt3 flex-padding">
            <div class="w-flex align-center justify-space-between">
                <h3>Revenue Overview</h3>
                <p><router-link to="/" class="link-underline">See all (10)</router-link></p>
            </div>
            <div class="w-flex wrap mt2">
                
            </div>
        </div>
    </div>
</template>

<style scoped>
.link-underline{
    color: #000;
    text-decoration: underline;
}
.overview-card{
    border-radius: 0px;
    width: 100%;
}
.overview-card-icon{
    width: 100px;
    height: 100px;
}
.flex-padding{
    padding: 6px;
}
</style>