<script>
import inventoryItem from '../../components/inventoryitem.vue'
import axios from 'axios'
axios.defaults.withCredentials = true
export default {
    components: { inventoryItem },
    data(){
        return{
            items: []
        }
    },
    computed: {
        
    },
    methods: {
        fetchItems(){
            axios({
                method: 'get',
                url: 'http://localhost:5000/users/getinventory',
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then(res => {
                console.log(res.data.data)
                this.items = res.data.data
            })
            .catch(err => {
                if (err.response) {
                    console.log(err.response.data.error)
                    this.items = []
                }
            })
        }
    },
    mounted(){
        this.fetchItems()
    }
}
</script>
<template>
    <div>
        <div>
            <h1>My inventory</h1>
            <p class="text-light">View and manage all items in your inventory.</p>
        </div>
        <div v-if="items < 1">
            <div class="w-flex wrap justify-center">
                <img class="warning-img" src="../../assets/images/no_items.svg" alt="">
            </div>
            <h3 class="text-center" style="font-weight: 100;">No items here!</h3>
            <div class="w-flex justify-center mt1">
                <w-button class="btn pa4" route="/userdashboard/listitem" sm bg-color="success">Add item to inventory</w-button>
            </div>
        </div>
        <div class="mt5">
            <inventoryItem :itemDetails="item" v-for="item in items" :key="item"></inventoryItem>
        </div>
    </div>
</template>

<style scoped>
.warning-img{
    width: 300px;
}
</style>