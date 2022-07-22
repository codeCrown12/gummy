<script>
import axios from 'axios'
axios.defaults.withCredentials = true
export default {
    data(){
        return{
            showUserToolbar: false
        }
    },
    methods: {
        IsloggedIn(){
            axios.post('https://gummy-backend.herokuapp.com/users/isloggedin', {
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then(res => {
                this.showUserToolbar = true
                console.log(res.data.data.msg)
            })
            .catch(err => {
                if (err.response){
                    console.log(err.response.data.error)
                }
            }) 
        }
    },
    mounted() {
        this.IsloggedIn()
    }
}
</script>
<template>
    <div>
        <w-toolbar class="navbar">
            <div class="title2 text-bold"><router-link class="navbar-logo" to="/">GUMMY🍬</router-link></div>
                <div class="spacer"></div>
                <router-link to="/" class="ml12" style="color: #fff; font-size: 14px;">About</router-link>
                <router-link to="/" class="ml12" style="color: #fff; font-size: 14px;">How it works</router-link>
                <router-link to="/userdashboard/listitem" class="ml12" style="color: #fff; font-size: 14px;">List an item</router-link>
                <div class="spacer"></div>
                <div v-if="showUserToolbar">
                    <div class="w-flex align-center">
                        <router-link to="/userdashboard/myinventory" class="mr2 mb2" style="color: #fff;"><small>👋 My panel</small></router-link>
                        <router-link to="/userdashboard/myinventory">
                            <img src="../assets/images/undraw_male_avatar_323b.svg" alt="" class="user-img">
                        </router-link>
                    </div>
                </div>
                <div v-else class="auth-buttons mt1 mb1">
                    <w-button class="btn" route="/login" color="light" sm outline>Login</w-button>
                    <w-button class="btn ml2" route="/signup" bg-color="success" sm>Create an account</w-button>
                </div>
        </w-toolbar>
    </div>
</template>

<style scoped>
    .navbar{
        background-color: #000;
        padding-top: 4px;
        padding-bottom: 2px;
    }
    .navbar-logo{
        color: #fff;
    }
    .nav-icon{
        font-size: 25px;
        color: #fff;
    }
    .user-img{
        border: 1px solid #54b946;
        border-radius: 50%;
        height: 35px;
        width: 35px;
        padding: 1px;
    }
</style>