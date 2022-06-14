<script>
export default {
    data(){
        return {
            processing: true,
            showDialog1: false,
            showErrMsg: false,
            errmsg: '',
            loginDetails: {
                email: '',
                password: ''
            }
        }
    },
    computed:{
        validateFields(){
            if (this.loginDetails.email == '' || this.loginDetails.password == '') {
                this.errmsg = 'All fields are required'
                return false
            }
            return true
        }
    },
    methods: {
        loginUser(){
            if (this.validateFields) {
                this.showDialog1 = true
                fetch('https://gummy-backend.herokuapp.com/users/login', {
                    method: 'POST',
                    credentials: 'same-origin',
                    body: JSON.stringify(this.loginDetails),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                })
                .then(response => response.json().then(res => ({
                    status: response.status,
                    data: res
                })))
                .then(res => {
                    if (res.status == 200) {
                        this.processing = false
                        console.log(res.data)
                    }
                    else{
                        this.showDialog1 = false
                        this.errmsg = res.data.error
                        this.showErrMsg = true
                    }
                })
                .catch(err => console.log(err)) 
            }
            else{
                this.showErrMsg = true
            }
        }
    },
}
</script>
<template>
    <div>
        <w-flex class="main-cover" wrap justify-center align-center>
            <div class="form-cover">
                <h1 class="text-center text-bold mb1"><router-link class="text-dark" to="/">Gummy🍬</router-link></h1>
                <p class="text-center mb5"><strong>SIGN INTO ACCOUNT</strong></p>

                <!-- Status and error dialogs -->
                <w-dialog persistent v-model="showDialog1" transition="bounce" :width="320">
                    <div class="w-flex justify-center">
                        <div v-if="processing">
                            <p class="text-center"><w-spinner color="success" /></p>
                            <p class="mt2 text-center text-bold">Processing please wait...</p>
                        </div>
                        <div v-else>
                            <p class="text-center"><img src="../assets/images/check.png"/></p>
                            <p class="text-center text-bold">Login successful!</p>
                            <p class="text-center mt2"><w-button style="width: 100%;" class="btn" sm bg-color="success" route="/">Continue to items</w-button></p>   
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
                    <input type="email" v-model="loginDetails.email" class="form-control" placeholder="email address">
                </div>
                <div class="mb3">
                    <input type="password" v-model="loginDetails.password" class="form-control" placeholder="password">
                </div>
                <w-button @click="loginUser" class="login-btn mb2" style="width: 100%;" bg-color="success">Log in</w-button>
                <p class="text-center mb1 mt1"><router-link to="/login" class="text-underline">Forgot password ?</router-link></p>
                <p class="text-center">Don't have an account? <router-link to="/signup" class="text-underline">Create one</router-link></p>
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