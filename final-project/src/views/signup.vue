<script>
import axios from 'axios'
axios.defaults.withCredentials = true
export default {
    data(){
        return{
            processing: true,
            showDialog1: false,
            showErrMsg: false,
            errmsg: '',
            userDetails: {
                userId: '',
                username: '',
                email: '',
                mobile_number: '',
                bio: '',
                address: '',
                student_number: '',
                password: '',
                date_joined: '',
                profile_image: '',
                email_verified: false,
                notifications: true
            }
        }
    },
    computed: {
        validateFields(){
            if (this.userDetails.firstname == "" || this.userDetails.lastname == "" || this.userDetails.student_number == ""
            || this.userDetails.email == "" || this.userDetails.mobile_number == "" || this.userDetails.password == "") {
                this.errmsg = "All fields are required"
                return false
            }
            return true
        }
    },
    methods: {
        register(){
            if (this.validateFields) {
                let date = new Date()
                this.userDetails.date_joined = date
                this.showDialog1 = true
                axios({
                    method: 'post',
                    url: 'https://gummy-backend.herokuapp.com/users/register',
                    data: this.userDetails,
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                })
                .then(res => {
                    this.processing = false
                    console.log(res.data)
                })
                .catch(err => {
                    if (err.response) {
                        console.log(err.response.data.error)
                        this.showDialog1 = false
                        this.errmsg = err.response.data.error
                        this.showErrMsg = true
                    }
                })   
            }
            else{
                this.showErrMsg = true
            }
        },
    }
}
</script>
<template>
    <div>
        <w-flex class="main-cover" wrap justify-center align-center>
            <div class="form-cover">
                <h1 class="text-center text-bold mb1"><router-link class="text-dark" to="/">GUMMY🍬</router-link></h1>
                <p class="text-center mb5"><strong>CREATE AN ACCOUNT</strong></p>

                <!-- Status and error dialogs -->
                <w-dialog persistent v-model="showDialog1" transition="bounce" :width="320">
                    <div class="w-flex justify-center">
                        <div v-if="processing">
                            <p class="text-center"><w-spinner color="success" /></p>
                            <p class="mt2 text-center text-bold">Processing please wait...</p>
                        </div>
                        <div v-else>
                            <p class="text-center"><img src="../assets/images/check.png"/></p>
                            <p class="text-center text-bold">Registration successful!</p>
                            <p class="text-center mt2"><w-button style="width: 100%;" route="/login" class="btn" sm bg-color="success">Proceed to login</w-button></p>   
                        </div>
                    </div>
                </w-dialog>
                
                <w-alert v-if="showErrMsg" error icon-outside>
                    <div class="w-flex justify-space-between align-center">
                        <p>{{errmsg}}!</p>
                        <div><ion-icon class="del-icon" @click="this.showErrMsg = false" name="close-outline"></ion-icon></div>
                    </div>
                </w-alert>
                <!-- End of status and error dialogs -->

                <div class="mb3">
                    <input type="text" v-model="userDetails.username" class="form-control" placeholder="Username">
                </div>
                <div class="mb3">
                    <input type="text" v-model="userDetails.student_number" class="form-control" placeholder="Student number">
                </div>
                <div class="mb3">
                    <input type="email" v-model="userDetails.email" class="form-control" placeholder="Email address">
                </div>
                <div class="mb3">
                    <input type="tel" v-model="userDetails.mobile_number" class="form-control" placeholder="Phone number">
                </div>
                <div class="mb2">
                    <input type="password" v-model="userDetails.password" class="form-control" placeholder="password">
                </div>
                <small class="text-center mb1 mt2">By signing up you agree to our <router-link to="/" class="text-underline">terms of use</router-link> and 
                    <router-link to="/" class="text-underline">privacy policy</router-link>
                </small>
                <w-button class="login-btn mb2 mt2" @click="register" style="width: 100%;" bg-color="success">Create account</w-button>
                <p class="text-center">Already have an account? <router-link to="/login" class="text-underline">Log in</router-link></p>
            </div>
        </w-flex>
    </div>
</template>

<style scoped>
.main-cover{
    height: 100vh;
}
.form-cover{
    width: 25%;
}
.form-control{
    padding: 11px;
    font-size: 14px;
}
.login-btn{
    padding: 20px;
    border-radius: 8px;
    font-size: 17px !important;
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