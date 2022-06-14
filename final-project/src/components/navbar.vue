<script>
export default {
    data(){
        return{
            showUserToolbar: false
        }
    },
    methods: {
        IsloggedIn(){
            fetch('http://localhost:5000/users/isloggedin', {
                method: 'POST',
                credentials: 'same-origin',
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
                    this.showUserToolbar = true
                    console.log(res.data.data.msg)
                }
                else{
                    console.log(res.data.error)
                }
            })
            .catch(err => console.log(err)) 
            console.log('testing')
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