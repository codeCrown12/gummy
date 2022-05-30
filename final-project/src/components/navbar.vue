<script>
export default {
    data(){
        return{
            showUserToolbar: true
        }
    }
}
</script>
<template>
    <div>
        <w-toolbar class="navbar pt1 pb1">
            <div class="title2 text-bold"><router-link class="navbar-logo" to="/">Gummy🍬</router-link></div>
                <div class="spacer"></div>
                <!-- <div class="action-buttons">
                    <w-button class="btn" route="/login" color="light" sm outline>Login</w-button>
                    <w-button class="btn ml2" route="/signup" bg-color="success" sm>Create an account</w-button>
                </div> -->
                <div v-if="showUserToolbar">
                    <div class="w-flex align-center">
                        <router-link to="/" class="mr3">
                            <ion-icon title="List an item" class="nav-icon" name="add-circle-outline"></ion-icon>
                        </router-link>
                        
                        <router-link to="/">
                            <ion-icon name="notifications-outline" class="nav-icon mr3"></ion-icon>
                        </router-link>
                        
                        <router-link to="/">
                            <img src="../assets/images/undraw_male_avatar_323b.svg" alt="" class="user-img">
                        </router-link>
                    </div>
                </div>
        </w-toolbar>
    </div>
</template>

<style scoped>
    .navbar{
        background-color: #2c2c2c;
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