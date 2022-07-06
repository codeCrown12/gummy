<script>
import axios from 'axios'
axios.defaults.withCredentials = true
export default {
    data(){
        return{
            records: []
        }
    },
    computed: {
        
    },
    methods: {
        formatDate(date_added){
            const date = new Date(date_added);
            let year = date.getFullYear()
            let month = date.getMonth()+1
            let dt = date.getDate();
            let hours = date.getHours()
            let minutes = date.getMinutes()
            if (dt < 10) {
                dt = '0' + dt;
            }
            if (month < 10) {
                month = '0' + month;
            }
            if (hours < 10){
                hours = '0' + hours;
            }
            if (minutes < 10){
                minutes = '0' + minutes;
            }
            return year+'/' + month + '/'+dt
        },
        checkPaymentStatus(value){
            if (value == true){
                return '✔️ payment confirmed'
            }
            return '❌ payment pending'
        },
        getUrl(itemId){
            return '/itemdetails/'+itemId
        },
        getLeasedOutBookings(){
            axios({
                    method: 'get',
                    url: `http://localhost:5000/items/getleasedoutbookings`,
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    },
                })
                .then(res => {
                    this.records = res.data.data
                    this.showDialog = false
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
        this.getLeasedOutBookings()
    }
}
</script>
<template>
    <div>
        <div v-if="records.length < 1">
            <div class="w-flex wrap justify-center">
                <img class="warning-img" src="/src/assets/images/no_items.svg" alt="">
            </div>
            <h3 class="text-center" style="font-weight: 100;">No transactions here!</h3>
            <div class="w-flex justify-center mt1">
                <w-button class="btn pa4" route="/userdashboard/listitem" sm bg-color="success">List an item</w-button>
            </div>
        </div>
        <w-card class="req-card mb2" v-for="record in records" :key="record">
            <div class="w-flex justify-space-between">
                <div>
                    <p><span class="text-bold">#</span>{{record.bookingId}}</p>
                    <p><small class="text-light">{{formatDate(record.date_booked)}}</small></p>
                </div>
                <div>
                    <p><span class="text-bold">#</span>{{record.itemId}}</p>
                    <p><small><router-link class="card-link" :to="getUrl(record.itemId)">View item</router-link></small></p>
                </div>
                <div>
                    <p>{{formatDate(record.date.start_date)}} - {{formatDate(record.date.end_date)}}</p>
                    <p><small class="text-light">{{record.duration}} days</small></p>
                </div>
                <div>
                    <p><small class="text-bold">{{checkPaymentStatus(record.payment_verified)}}</small></p>
                </div>
                <div>
                    <p>AED {{record.amount}}</p>
                </div>
            </div>
        </w-card>
    </div>
</template>

<style>
.req-card{
    border-radius: 0px;
}
.card-link{
    color: #000;
    text-decoration: underline;
}
</style>