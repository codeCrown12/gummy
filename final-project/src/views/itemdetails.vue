<script>
import axios from 'axios'
axios.defaults.withCredentials = true
import navbar from '../components/navbar.vue';
import imageslider from '../components/imageslider.vue'
import item from '../components/item.vue'
import footerVue from '../components/footer.vue';
export default {
    components: { navbar, imageslider, item, footerVue },
    data(){
        return{
            slider_style: {'height': '300px', 'border-radius': '5px'},
            itemDetails: {
                itemId: '',
                name: '',
                category: '',
                pricing: {
                    priceOne: '',
                    priceTwo: '',
                    priceThree: ''
                },
                images: [],
                description: ''
            },
            showDialog: false,
            processing: true
        }
    },
    methods: {
        getItemDetails(){
            this.showDialog1 = true
            axios({
                    method: 'get',
                    url: `http://localhost:5000/items/getitemdetails?itemId=${this.$route.params.id}`,
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    },
                })
                .then(res => {
                    this.itemDetails = res.data.data
                    this.showDialog1 = false
                })
                .catch(err => {
                    if (err.response) {
                        console.log(err.response.data.error)
                        this.itemDetails = {}
                    }
                })
        }
    },
    mounted(){
        this.getItemDetails()
    }
}
</script>

<template>
    <div>
        <navbar></navbar>
        <div class="container mt8 mb8">
            <w-dialog persistent v-model="showDialog" transition="bounce" :width="320">
                <div class="w-flex justify-center">
                    <div v-if="processing">
                        <p class="text-center"><w-spinner color="success" /></p>
                        <p class="mt2 text-center text-bold">Processing please wait...</p>
                    </div>
                    <div v-else>
                        <p class="text-center"><img src="/src/assets/images/check.png"/></p>
                        <p class="text-center text-bold">Order placed successfully!</p>
                        <p class="text-center mt2"><w-button style="width: 100%;" class="btn" sm bg-color="success" @click="showDialog1 = false">Complete process</w-button></p>   
                    </div>
                </div>
            </w-dialog>
            <w-flex wrap v-if="itemDetails != {}">
                <!-- Item information -->
                <div class="md7 pa3">
                    <div>
                        <imageslider :custom_style="slider_style" :images="itemDetails.images"></imageslider>
                        <div class="mt6">
                        </div>
                        <div class="mt4">
                            <h2>Description</h2>
                            <p class="mt3">
                                {{itemDetails.description}}
                            </p>
                        </div>
                    </div>
                </div>
                <!-- Checkout form -->
                <div class="md5 pa3">
                    <div>
                        <h1>{{itemDetails.name}}</h1>
                        <w-card class="mt3" bg-color="secondary" no-border>
                            <p class="text-small">Learn more about how renting works on Gummy <router-link to="/" class="text-underline">here</router-link></p>
                        </w-card>
                        <div class="mt3" no-border>
                            <w-flex wrap>
                                <div class="md4 pr2">
                                    <w-card bg-color="white" class="card-round">
                                        <p class="text-center">Daily</p>
                                        <p class="text-center text-success text-bold mt2">AED {{itemDetails.pricing.priceOne}}</p>
                                    </w-card>
                                </div>
                                <div class="md4 pr2">
                                    <w-card bg-color="white" class="card-round">
                                        <p class="text-center">7+ days</p>
                                        <p class="text-center text-success text-bold mt2">AED {{itemDetails.pricing.priceTwo}}</p>
                                    </w-card>
                                </div>
                                <div class="md4">
                                    <w-card bg-color="white" class="card-round">
                                        <p class="text-center">30+ days</p>
                                        <p class="text-center text-success text-bold mt2">AED {{itemDetails.pricing.priceThree}}</p>
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