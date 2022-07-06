<script>
import axios from 'axios'
axios.defaults.withCredentials = true
   export default {
       data() {
            return{
                openDrawer: false,
                showDialog: false,
                processing: true
            }
        },
        methods: {
            logOut(){
                this.showDialog = true
                axios.post('http://localhost:5000/users/logout', {
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                })
                .then(res => {
                    console.log(res.data.data.msg)
                    this.showDialog = false
                    this.$router.push('/login')
                })
                .catch(err => {
                    if (err.response){
                        console.log(err.response.data.error)
                    }
                })
            }
        }
   }
</script>
<template>
    <div class="w-flex">
        <w-toolbar vertical class="sidebar">
            <div class="title2 text-bold"><router-link class="sidebar-logo" to="/">GUMMY🍬</router-link></div>
            <p class="text-center mb2">USER DASHBOARD</p>
            <w-divider class="divider mb2"></w-divider>
            <router-link to="/userdashboard/myinventory" class="sidebar-link mt2"><ion-icon class="mr4 sidebar-icon" name="list-outline"></ion-icon> My inventory</router-link>
            <router-link to="/userdashboard/listitem" class="sidebar-link mt2"><ion-icon class="mr4 sidebar-icon" name="add-circle-outline"></ion-icon> List item</router-link>
            <router-link to="/userdashboard/bookingrequests" class="sidebar-link mt2"><ion-icon class="mr4 sidebar-icon" name="arrow-down-outline"></ion-icon> My Bookings</router-link>
            <router-link to="/userdashboard/settings" class="sidebar-link mt2"><ion-icon class="mr4 sidebar-icon" name="cog"></ion-icon> Settings</router-link>
            <div class="spacer"></div>
            <p @click="logOut" style="cursor: pointer;" class="sidebar-link mb4"><ion-icon class="mr4 sidebar-icon" name="power"></ion-icon> Logout</p>
        </w-toolbar>
        
        <w-drawer width="200px" left v-model="openDrawer" />
        
        <div class="md12 main-container">
            
            <w-dialog persistent v-model="showDialog" transition="bounce" :width="320">
                <div class="w-flex justify-center">
                    <div v-if="processing">
                        <p class="text-center"><w-spinner color="success" /></p>
                        <p class="mt2 text-center text-bold">Processing please wait...</p>
                    </div>
                </div>
            </w-dialog>

            <w-toolbar class="navbar">
                <ion-icon @click="openDrawer = true" class="sidebar-toggler nav-icon mr4" name="menu-outline"></ion-icon>
                <p>Hello Mate, 👋</p>
                <div class="spacer"></div>
                <div>
                    <div class="w-flex align-center">
                        <router-link to="/" class="mr2 mb2" style="color: #000;"><small>👋 My panel</small></router-link>  
                        <router-link to="/">
                            <img src="../../assets/images/undraw_male_avatar_323b.svg" alt="" class="user-img">
                        </router-link>
                    </div>
                </div>
            </w-toolbar>
            <div class="pa10">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .navbar{
            padding-top: 4px;
            padding-bottom: 2px;
        }
    .sidebar{
        width: 210px;
        height: 100vh;
    }
    .sidebar-logo{
        color: #000;
    }
    .sidebar-link{
        color: #000;
        width: 100%;
        padding: 10px;
        border-radius: 25px;
        font-size: 13.5px;
        display: flex;
        align-items: center;
    }
    .sidebar-link:hover{
        background-color: rgba(128, 128, 128, 0.151);
    }
    .router-link-active, .router-link-active:hover{
        background-color: #54b946;
        color: #fff;
    }
    .sidebar-icon{
        font-size: 18px;
    }
    .user-img{
        border: 1px solid #54b946;
        border-radius: 50%;
        height: 35px;
        width: 35px;
        padding: 1px;
    }
    .nav-icon{
        font-size: 25px;
        color: #000;
        cursor: pointer;
    }
    .sidebar-toggler{
        display: none;
    }
    .main-container{
        height: 100vh;
        overflow-y: auto;
    }
    @media screen and (max-width: 700px) {
        .sidebar{
            display: none;
        }
        .sidebar-toggler{
            display: block;
        }
    }
</style>