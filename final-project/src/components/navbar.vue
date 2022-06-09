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
        <w-toolbar class="navbar">
            <div class="title2 text-bold"><router-link class="navbar-logo" to="/">Gummy🍬</router-link></div>
                <div class="spacer"></div>
                <div v-if="showUserToolbar">
                    <div class="w-flex align-center">
                        <router-link to="/" class="mr3">
                            <ion-icon title="List an item" class="nav-icon" name="add-circle-outline"></ion-icon>
                        </router-link>
                        
                        <router-link to="/">
                            <ion-icon name="notifications-outline" class="nav-icon mr3"></ion-icon>
                        </router-link>
                        
                        <router-link to="/userdashboard/overview">
                            <img src="../assets/images/undraw_male_avatar_323b.svg" alt="" class="user-img">
                        </router-link>
                    </div>
                </div>
                <div v-else class="action-buttons">
                    <w-button class="btn" route="/login" color="light" sm outline>Login</w-button>
                    <w-button class="btn ml2" route="/signup" bg-color="success" sm>Create an account</w-button>
                </div>
        </w-toolbar>
    </div>
</template>

<style scoped>
    /* .navbar{
        background-color: #3d3d3d;
    } */
    .navbar-logo{
        color: #000;
    }
    .nav-icon{
        font-size: 25px;
        color: #000;
    }
    .user-img{
        border: 1px solid #54b946;
        border-radius: 50%;
        height: 35px;
        width: 35px;
        padding: 1px;
    }
</style>