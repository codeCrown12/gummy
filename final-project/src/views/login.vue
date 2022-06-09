<template>
    <div>
        <w-flex class="main-cover" wrap justify-center align-center>
            <div class="form-cover">
                <h1 class="text-center text-bold mb1"><router-link class="text-dark" to="/">Gummy🍬</router-link></h1>
                <p class="text-center mb5"><strong>SIGN INTO ACCOUNT</strong></p>
                <div class="mb3">
                    <input type="email" class="form-control" placeholder="email address">
                </div>
                <div class="mb3">
                    <input type="password" class="form-control" placeholder="password">
                </div>
                <w-button class="login-btn mb2" style="width: 100%;" bg-color="success">Log in</w-button>
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
</style>