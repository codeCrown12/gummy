<script>
export default {
    data(){
        return{
            tabOne: true,
            tabTwo: false
        }
    },
    methods:{
        changeTab(){
            if (this.tabOne == true) {
                this.tabTwo = true
                this.tabOne = false
            }
            else{
                this.tabOne = true
                this.tabTwo = false
            }
        }
    }
}
</script>
<template>
    <div>
        <div class="mb4">
            <h1>My Bookings</h1>
            <p class="text-light">View and manage all bookings related to your account.</p>
        </div>

        <div class="w-flex wrap justify-end mb2">
            <div>
                <input @click="changeTab" id="tabOne" checked type="radio" color="success" class="mr2" name="radio">
                <label for="tabOne"><small>My Bookings</small></label>
            </div>
            <div class="ml3">
                <input @click="changeTab" id="tabTwo" type="radio" color="success" class="mr2" name="radio">
                <label for="tabTwo"><small>Leased Out</small></label>
            </div>
        </div>

        <div class="" v-if="tabOne">
            <w-card class="req-card mb2" v-for="i in 3" :key="i">
                <div class="w-flex justify-space-between">
                    <div>
                        <p><span class="text-bold">#</span>ReqID</p>
                        <p><small class="text-light">2022-10-02</small></p>
                    </div>
                    <div>
                        <p>Yamaha piano</p>
                        <p><small><router-link class="card-link" to="/userdashboard/bookingrequests">View item</router-link></small></p>
                    </div>
                    <div>
                        <p>2022/10/12 - 2022/10/15</p>
                        <p><small class="text-light">5 days</small></p>
                    </div>
                    <div>
                        <p>AED 200</p>
                    </div>
                    <div>
                        <p>@UserID</p>
                        <p><small><router-link class="card-link" to="/userdashboard/bookingrequests">View profile</router-link></small></p>
                    </div>
                </div>
            </w-card>
        </div>

        <div class="" v-if="tabTwo">
            <w-card class="req-card mb2" v-for="i in 3" :key="i">
                <div class="w-flex justify-space-between">
                    <div>
                        <p><span class="text-bold">#</span>ReqID</p>
                        <p><small class="text-light">2022-10-02</small></p>
                    </div>
                    <div>
                        <p>Yamaha piano</p>
                        <p><small><router-link class="card-link" to="/userdashboard/bookingrequests">View item</router-link></small></p>
                    </div>
                    <div>
                        <p>2022/10/12 - 2022/10/15</p>
                        <p><small class="text-light">5 days</small></p>
                    </div>
                    <div>
                        <p><small class="text-success text-bold"><ion-icon name="checkmark-done-outline"></ion-icon> status</small></p>
                    </div>
                    <div>
                        <p>AED 200</p>
                    </div>
                    <div>
                        <p>@UserID</p>
                        <p><small><router-link class="card-link" to="/userdashboard/bookingrequests">View profile</router-link></small></p>
                    </div>
                </div>
            </w-card>
        </div>
    </div>
</template>

<style scoped>
.req-card{
    border-radius: 0px;
}
.menu-icon{
    border-radius: 50%;
    cursor: pointer;
    padding: 10px;
}
.menu-icon:hover{
    background-color: #dbdbdb;
}
.item-menu-link{
    padding: 7px;
    color: #000;
    font-size: 13px;
    cursor: pointer;
}
.item-menu-link:hover{
    background-color: #d4d4d4a4;
    border-radius: 3px;
}
.card-link{
    text-decoration: underline; 
    color: #000;
}
</style>