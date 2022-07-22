<script>
import axios from 'axios'
axios.defaults.withCredentials = true
export default {
    data(){
        return{
            showDialog: true,
            processing: true,
        }
    },
    computed: {
        checkStatus(){
            if (this.$route.params.data == 'error') {
                return false
            }
            return true
        }
    },
    methods: {
        confirmPayment(){
            if(this.checkStatus){
                 axios.post(`https://gummy-backend.herokuapp.com/items/confirmpayment?bookingId=${this.$route.params.data}`, {
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                })
                .then(res => {
                    this.showDialog = false
                    console.log(res.data.data.msg)
                })
                .catch(err => {
                    if (err.response){
                        console.log(err.response.data.error)
                    }
                }) 
            }
            else this.showDialog = false
        }
    },
    mounted(){
        this.confirmPayment()
    }
}
</script>

<template>
    <div class="w-flex justify-center align-center">
        <w-dialog persistent v-model="showDialog" transition="bounce" :width="320">
            <div class="w-flex justify-center">
                <div v-if="processing">
                    <p class="text-center"><w-spinner color="success" /></p>
                    <p class="mt2 text-center text-bold">Processing please wait...</p>
                </div>
            </div>
        </w-dialog>
        <div v-if="!checkStatus">
            <p class="text-center"><img src="https://img.icons8.com/external-flaticons-flat-flat-icons/114/000000/external-error-security-flaticons-flat-flat-icons.png"/></p>
            <h3 class="text-center">An error occurred during the process!</h3> 
            <p class="text-center mt2"><w-button route="/" class="btn pa4" bg-color="success" sm>Go back to shop</w-button></p>
        </div>
        <div v-else>
            <p class="text-center"><img src="/src/assets/images/check.png"/></p>
            <h3 class="text-center">Order placed successfully!</h3> 
            <p class="text-center mt2"><w-button route="/" class="btn pa4" bg-color="success" sm>Go back to shop</w-button></p>
        </div>
    </div>
</template>