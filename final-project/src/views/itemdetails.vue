<script>
import navbar from '../components/navbar.vue';
import imageslider from '../components/imageslider.vue'
import item from '../components/item.vue'
import footerVue from '../components/footer.vue';
export default {
    components: { navbar, imageslider, item, footerVue },
    data(){
        return{
            images: [
                "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870",
                "https://images.unsplash.com/photo-1580707221190-bd94d9087b7f?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387",
                "https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870",
                "https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=876"
            ],
            slider_style: {'height': '300px', 'border-radius': '5px'}
        }
    },
}
</script>

<template>
    <div>
        <navbar></navbar>
        <div class="container mt8 mb8">
            <w-flex wrap>
                <!-- Item information -->
                <div class="md7 pa3">
                    <div>
                        <imageslider :custom_style="slider_style" :images="images"></imageslider>
                        <div class="mt6">
                        </div>
                        <div class="mt4">
                            <h2>Description</h2>
                            <p class="mt3">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum itaque, dicta adipisci laudantium repellat sit ipsam sapiente odio magnam? Earum perferendis qui ratione laboriosam minus nihil suscipit recusandae numquam magni!
                                <br><br>
                                Voluptates, aut distinctio esse quia doloribus commodi minima inventore neque sequi
                                dolores perspiciatis fugiat. Fuga, reprehenderit sequi veritatis iure magnam excepturi
                                aliquid dolore quo amet deserunt asperiores placeat maxime perferendis.
                            </p>
                        </div>
                    </div>
                </div>
                <!-- Checkout form -->
                <div class="md5 pa3">
                    <div>
                        <h1>Panasonic Lumix DMC-G5 DSLR + accessories</h1>
                        <w-card class="mt3" bg-color="secondary" no-border>
                            <p class="text-small">Learn more about how renting works on Gummy <router-link to="/" class="text-underline">here</router-link></p>
                        </w-card>
                        <div class="mt3" no-border>
                            <w-flex wrap>
                                <div class="md4 pr2">
                                    <w-card bg-color="white" class="card-round">
                                        <p class="text-center">Daily</p>
                                        <p class="text-center text-success text-bold mt2">AED 200</p>
                                    </w-card>
                                </div>
                                <div class="md4 pr2">
                                    <w-card bg-color="white" class="card-round">
                                        <p class="text-center">7+ days</p>
                                        <p class="text-center text-success text-bold mt2">AED 100</p>
                                    </w-card>
                                </div>
                                <div class="md4">
                                    <w-card bg-color="white" class="card-round">
                                        <p class="text-center">30+ days</p>
                                        <p class="text-center text-success text-bold mt2">AED 50</p>
                                    </w-card>
                                </div>
                            </w-flex>
                            <w-flex class="mt5" wrap>
                                <div class="md6 pr2">
                                    <label><small>Start date</small></label>
                                    <input type="date" class="form-control mt2">
                                </div>
                                <div class="md6">
                                    <label><small>End date</small></label>
                                    <input type="date" class="form-control mt2">
                                </div>
                            </w-flex>
                            <w-button class="mt4 pa5 btn" style="width: 100%;" bg-color="success">BOOK ITEM NOW</w-button>
                        </div>
                    </div>
                </div>
            </w-flex>
        </div>
        <!-- <footerVue></footerVue> -->
    </div>
</template>

<style scoped>
    .text-small{
        font-size: 13px;
    }
    .card-round{
        border-radius: 7px;
    }
</style>