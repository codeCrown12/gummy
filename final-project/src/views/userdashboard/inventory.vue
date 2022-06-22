<script>
import inventoryItem from '../../components/inventoryitem.vue'
import axios from 'axios'
axios.defaults.withCredentials = true
export default {
    components: { inventoryItem },
    data(){
        return{
            items: [],
            dialog4: {show: false},
            processing: true
        }
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
        },
        removeItemImgs(item){
            axios({
                    method:'delete',
                    url:'http://localhost:5000/remove_files',
                    data: item.images
                })
                .then(res => {
                    console.log(res.data)
                    this.deleteItemFromDb(item)
                })
                .catch(err => {
                    console.log(err.response.data.error)
                });
        },
        deleteItemFromDb(item){
            axios({
                    method:'delete',
                    url:'http://localhost:5000/items/deleteitem',
                    data: {itemId: item.itemId}
                })
                .then(res => {
                    console.log(res.data)
                    for (let i = 0; i < this.items.length; i++) {
                        if (this.items[i].itemId == item.itemId) {
                            this.items.splice(i, 1)
                        }
                    }
                    this.processing = false
                })
                .catch(err => {
                    console.log(err.response.data.error)
                });
        },
        deleteItem(item){
            this.dialog4.show = true
            this.removeItemImgs(item)
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

        <w-dialog persistent v-model="dialog4.show" transition="bounce" :width="320">
            <div class="w-flex justify-center">
                <div v-if="processing">
                    <p class="text-center"><w-spinner color="success" /></p>
                    <p class="mt2 text-center text-bold">Processing please wait...</p>
                </div>
                <div v-else>
                    <p class="text-center"><img src="/src/assets/images/check.png"/></p>
                    <p class="text-center text-bold">Item deleted successfully</p>
                    <p class="text-center mt2"><w-button style="width: 100%;" class="btn" sm bg-color="success" @click="dialog4.show = false">Complete process</w-button></p>   
                </div>
            </div>
        </w-dialog>

        <div v-if="items < 1">
            <div class="w-flex wrap justify-center">
                <img class="warning-img" src="/src/assets/images/no_items.svg" alt="">
            </div>
            <h3 class="text-center" style="font-weight: 100;">No items here!</h3>
            <div class="w-flex justify-center mt1">
                <w-button class="btn pa4" route="/userdashboard/listitem" sm bg-color="success">Add item to inventory</w-button>
            </div>
        </div>
        <div class="mt5">
            <inventoryItem @deleteItem="deleteItem($event)" :itemDetails="item" v-for="item in items" :key="item"></inventoryItem>
        </div>
    </div>
</template>

<style scoped>
.warning-img{
    width: 300px;
}
</style>