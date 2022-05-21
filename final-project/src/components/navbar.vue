<script>
export default {
    data(){
        return{
            showUserToolbar: false
        }
    }
}
</script>
<template>
    <div>
        <div class="navbar">
            <div class="navbar-content">
                <div class="title2 text-bold"><router-link class="navbar-logo" to="/">Gummy🍬</router-link></div>
                <div class="action-buttons">
                    <w-button class="btn" route="/login" color="light" sm outline>Login</w-button>
                    <w-button class="btn ml2" route="/" bg-color="success" sm>Create an account</w-button>
                </div>
                <div v-if="showUserToolbar" class="user-access">
                    <router-link to="/" class="mr5">
                        <ion-icon title="List an item" v-on="on" class="nav-icon" name="add-circle-outline"></ion-icon>
                    </router-link>
                    
                    <router-link to="/" class="mr5">
                        <ion-icon title="My favorites" class="nav-icon" name="heart-outline"></ion-icon>
                    </router-link>
                    
                    <router-link to="/">
                        <img src="../assets/images/undraw_male_avatar_323b.svg" alt="" class="user-img">
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .navbar{
        border-bottom: 1px solid rgba(0,0,0,.15);
        background-color: #2c2c2c;
    }
    .navbar-logo{
        color: #fff;
        /* color: #000; */
    }
    .navbar-content{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-top: 6px;
        padding-bottom: 6px;
        padding-left: 15px;
        padding-right: 40px;
    }
    .user-access{
        display: flex;
        align-items: center;
    }
    .nav-icon{
        font-size: 30px;
        color: #fff;
        /* color: #000; */
    }
    .user-img{
        border: 1px solid #54b946;
        border-radius: 50%;
        height: 35px;
        width: 35px;
        padding: 1px;
    }
</style>