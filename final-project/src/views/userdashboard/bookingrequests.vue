<script>
import leasedOut from '../../components/leasedout.vue'
import myBookings from '../../components/mybookings.vue'
export default {
    components: { leasedOut, myBookings },
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
                <label for="tabTwo"><small>Rented Out</small></label>
            </div>
        </div>

        <div class="" v-if="tabOne">
            <myBookings></myBookings>
        </div>

        <div class="" v-if="tabTwo">
            <leasedOut></leasedOut>
        </div>
    </div>
</template>