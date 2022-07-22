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
            slider_style: {'height': '300px', 'border-radius': '15px'},
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
            processing: true,
            showErrMsg: false,
            errmsg: '',
            start_date: '',
            end_date: '' ,

        }
    },
    computed:{
        getDuration(){
            let date_one = new Date(this.start_date)
            let date_two = new Date(this.end_date)
            let time_difference = date_two.getTime() - date_one.getTime()
            let days_difference = time_difference / (1000 * 60 * 60 * 24)
            return days_difference
        },
        getPrice(){
            if (this.getDuration < 7){
                return this.itemDetails.pricing.priceOne * this.getDuration
            }
            else if (this.getDuration > 7 && this.getDuration < 30){
                return this.itemDetails.pricing.priceTwo * this.getDuration
            }
            else if (this.getDuration > 30){
                return this.itemDetails.pricing.priceThree * this.getDuration
            }
        },
        checkDates(){
            let currDate = new Date()
            let startDate = new Date(this.start_date)
            let endDate = new Date(this.end_date)
            if (startDate < currDate || endDate < currDate){
                return false
            }
            return true
        },
        validateFields(){
            if (this.getDuration < 1){
                this.errmsg = 'End date must be greater than start date'
                return false
            }
            else if(!this.checkDates){
                this.errmsg = 'Start and end dates must be greater than current date'
                return false
            }
            else if (this.start_date == '' || this.end_date == ''){
                this.errmsg = 'All fields are required'
                return false
            }
            return true
        }
    },
    methods: {
        getItemDetails(){
            this.showDialog = true
            axios({
                    method: 'get',
                    url: `https://gummy-backend.herokuapp.com/items/getitemdetails?itemId=${this.$route.params.id}`,
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    },
                })
                .then(res => {
                    this.itemDetails = res.data.data
                    this.showDialog = false
                })
                .catch(err => {
                    if (err.response) {
                        console.log(err.response.data.error)
                    }
                })
        },
        submitOrder(){
            if(this.validateFields){
                this.showDialog = true
                let reqBody = {itemId: this.$route.params.id, amount: this.getPrice, duration: this.getDuration, start_date: this.start_date, end_date: this.end_date}
                axios({
                        method: 'post',
                        url: `https://gummy-backend.herokuapp.com/items/create-checkout-session`,
                        headers: {
                            "Content-type": "application/json; charset=UTF-8"
                        },
                        data: reqBody
                    })
                    .then(res => {
                        window.location.replace(res.data)
                    })
                    .catch(err => {
                        if (err.response) {
                            this.showDialog = false
                            this.showErrMsg = true
                            this.errmsg = err.response.data.error
                            console.log(err.response.data.error)
                        }
                    })
            }
            else this.showErrMsg = true
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
                </div>
            </w-dialog>
            <w-flex class="justify-center" wrap v-if="itemDetails != {}">
                <!-- Item information -->
                <div class="md6 pa3">
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
                        <w-alert v-if="showErrMsg" error icon-outside>
                            <div class="w-flex justify-space-between align-center">
                                <p>{{errmsg}}!</p>
                                <div><ion-icon class="del-icon" @click="this.showErrMsg = false" name="close-outline"></ion-icon></div>
                            </div>
                        </w-alert>
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
                                    <input v-model="start_date" type="date" class="form-control mt2">
                                </div>
                                <div class="md6">
                                    <label><small>End date</small></label>
                                    <input v-model="end_date" type="date" class="form-control mt2">
                                </div>
                            </w-flex>
                            <w-button @click="submitOrder" class="mt4 pa5 btn" style="width: 100%;" bg-color="success">BOOK ITEM NOW</w-button>
                            
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
    .del-icon{
        font-size: 20px;
    }
    .del-icon:hover{
        background-color: #dfdfdf;
        border-radius: 3px;
        color: red;
    }
</style>