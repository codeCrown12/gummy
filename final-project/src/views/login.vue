<script>
import navbar from '../components/navbar.vue';
export default {
    components: { navbar },
}
</script>

<template>
    <div>
        <!-- <navbar></navbar> -->
        <w-flex class="login-container" wrap justify-center align-center>
            <div class="form-container">
                <h1 class="text-center text-bold mb3"><router-link class="text-dark" to="/">Gummy🍬</router-link></h1>
                <div class="mb3">
                    <input type="text" class="form-control" placeholder="username or email">
                </div>
                <div class="mb3">
                    <input type="password" class="form-control" placeholder="password">
                </div>
                <w-button class="login-btn mb2 text-bold" style="width: 100%;" bg-color="success">Log in</w-button>
                <p class="text-center mb1 mt2"><router-link to="/login" class="text-underline">Forgot password ?</router-link></p>
                <p class="text-center">Don't have an account? <router-link to="/login" class="text-underline">Create one</router-link></p>
            </div>
        </w-flex>
    </div>
</template>

<style scoped>
.login-container{
    height: 100vh;
}
.form-container{
    width: 25%;
}
.form-control{
    padding: 11px;
    font-size: 15px;
}
.login-btn{
    padding: 20px;
    border-radius: 8px;
    font-size: 17px !important;
}
</style>