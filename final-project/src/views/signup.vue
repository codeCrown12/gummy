<template>
    <div>
        <w-flex class="main-cover" wrap justify-center align-center>
            <div class="form-cover">
                <h1 class="text-center text-bold mb3"><router-link class="text-dark" to="/">Gummy🍬</router-link></h1>
                <div class="mb3">
                    <input type="text" class="form-control" placeholder="First name">
                </div>
                <div class="mb3">
                    <input type="text" class="form-control" placeholder="Last name">
                </div>
                <div class="mb3">
                    <input type="email" class="form-control" placeholder="Email address">
                </div>
                <div class="mb3">
                    <input type="tel" class="form-control" placeholder="Phone number">
                </div>
                <div class="mb2">
                    <input type="password" class="form-control" placeholder="password">
                </div>
                <small class="text-center mb1 mt2">By signing up you agree to our <router-link to="/" class="text-underline">terms of use</router-link> and 
                    <router-link to="/" class="text-underline">privacy policy</router-link>
                </small>
                <w-button class="login-btn mb2 mt2 text-bold" style="width: 100%;" bg-color="success">Create account</w-button>
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
</style>