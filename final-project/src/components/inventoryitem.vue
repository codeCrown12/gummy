<script>
import galleryimage from '../components/galleryimage.vue'
   export default {
    components: { galleryimage },
    props:{
        itemDetails: Object
    },
    computed: {
        formatDate(){
            const date = new Date(this.itemDetails.date_added);
            let year = date.getFullYear()
            let month = date.getMonth()+1
            let dt = date.getDate();
            let hours = date.getHours()
            let minutes = date.getMinutes()
            if (dt < 10) {
                dt = '0' + dt;
            }
            if (month < 10) {
                month = '0' + month;
            }
            if (hours < 10){
                hours = '0' + hours;
            }
            if (minutes < 10){
                minutes = '0' + minutes;
            }
            return year+'-' + month + '-'+dt+' '+hours+':'+minutes
        }
    },
    data(){
        return{
            dialog1: { show: false },
            dialog2: {show: false},
            imageSources: [],
            imgFiles: [],
        }
    },
    methods: {
        async drop(e){
            let files = [...e.dataTransfer.files]
            let images = files.filter(file => file.type.indexOf('image/') >= 0)
            let promises = []
            images.forEach(file => {
                promises.push(this.getBase64(file))
            })
            let sources = await Promise.all(promises)
            this.imageSources = sources
            this.imgFiles = images
        },
        getBase64(file) {
            const reader = new FileReader()
            return new Promise(resolve => {
                reader.onload = ev => {
                    resolve(ev.target.result)
                }
                reader.readAsDataURL(file)
            })
        },
        selectFile(){
            var src = this.$el.querySelector('#manualFileSelect')
            this.drop({dataTransfer:src})
        },
        removeImage(img){
            let item_index = this.imageSources.indexOf(img)
            this.imageSources.splice(item_index, 1)
            this.imgFiles.splice(item_index, 1)
        }
    }
}
</script>
<template>
    <w-card class="mb2 item-card">
        <div class="w-flex justify-space-between">
            <div>
                <p><span class="text-bold">#</span>{{itemDetails.itemId}}</p>
                <p><small class="text-light">{{formatDate}}</small></p>
            </div>
            <div>
                <p>{{itemDetails.name}}</p>
            </div>
            <div>
                <p>{{itemDetails.category}}</p>
                <div class="w-flex align-center"><small class="status"><ion-icon name="paper-plane-outline"></ion-icon> out for rent</small></div>
            </div>
            <div>
                <p><small>AED <span class="text-bold">{{itemDetails.pricing.priceOne}}</span> Daily</small></p>
                <p><small>AED <span class="text-bold">{{itemDetails.pricing.priceTwo}}</span> 7+ Days</small></p>
                <p><small>AED <span class="text-bold">{{itemDetails.pricing.priceThree}}</span> 30+ Days</small></p>
            </div>
            <div>
                <w-menu arrow content-class="pa1" left>
                    <template #activator="{ on }">
                        <ion-icon class="menu-icon" v-on="on" name="ellipsis-vertical"></ion-icon>
                    </template>
                    <p class="item-menu-link" @click="dialog2.show = true"><ion-icon name="pencil-outline"></ion-icon> Edit details</p>
                    <p class="item-menu-link" style="color: red;" @click="dialog1.show = true"><ion-icon name="trash-outline"></ion-icon> Remove item</p>
                </w-menu>
            </div>
        </div>

        <!-- Delete item dialog -->
        <w-dialog v-model="dialog1.show" title="Confirm action !" overlay-opacity="0.4" transition="bounce" :width="340">
            <p style="font-size: 14px;">Do you really want to remove this item from your inventory?</p>
            <template #actions>
                <div class="spacer" />
                <w-button class="mr2 btn" @click="dialog1.show = false" color="error" sm outline>
                    Yes remove
                </w-button>
                <w-button class="btn" @click="dialog1.show = false" bg-color="success" sm>
                    Cancel
                </w-button>
            </template>
        </w-dialog>

        <!-- Edit item details  dialog-->
        <w-dialog v-model="dialog2.show" transition="bounce" title="Edit item Details" :width="740">
            <div class="w-flex wrap">
                <div class="md6 pa2">
                    <div>
                        <label class="w-button success--bg size--sm btn ml1" for="manualFileSelect">Add new image</label>
                        <input id="manualFileSelect" style="display: none;" multiple type="file" @change="selectFile">
                    </div>

                    <!-- New images to be uploaded -->
                        <div v-if="imageSources.length >= 1" class="mt3 ml1">
                            <small>Newly added images</small>
                        </div>
                        <div class="w-flex wrap">
                            <div class="md4 pa1" v-for="image in imageSources" :key="image">
                                <div class="img-prev-card w-flex justify-space-between align-center">
                                    <div class="ma0">
                                        <img :src="image" class="prev-img" alt=""/>
                                    </div>
                                    <div class="ma0">
                                        <ion-icon @click="removeImage(image)" class="del-icon" name="close-outline"></ion-icon>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <!--  -->

                    <!-- Already existing images of the item -->
                    <div v-if="imageSources.length >= 1" class="mt3 ml1">
                        <small>Previously existing images</small>
                    </div>
                    <div class="w-flex wrap">
                        <div class="md4 pa1" v-for="image in itemDetails.images" :key="image">
                            <div class="img-prev-card w-flex justify-space-between align-center">
                                <div class="ma0">
                                    <img :src="image" class="prev-img" alt=""/>
                                </div>
                                <div class="ma0">
                                    <ion-icon class="del-icon" name="close-outline"></ion-icon>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--  -->

                </div>
                <div class="md6 pa2">
                    <div class="mb3 mt2">
                        <label><small>ITEM NAME</small></label>
                        <input type="text" v-model="itemDetails.name" class="form-control mt1" placeholder="Item name goes here...">
                    </div>
                    <div class="mb3">
                        <label><small>CATEGORY</small></label>
                        <select v-model="itemDetails.category" class="form-control mt1">
                            <option>-- select category --</option>
                            <option value="media equipment">Media equipment</option>
                            <option value="musical instruments">Musical instruments</option>
                            <option value="electronic gadgets">Electronic gadgets</option>
                        </select>
                    </div>
                    <div class="mb3">
                        <div class="w-flex mt1">
                            <div class="md4">
                                <label><small>1 - 7 days</small></label>
                                <input type="number" v-model="itemDetails.pricing.priceOne" class="form-control mt1" placeholder="e.g AED 200">
                            </div>
                            <div class="md4 pl2 pr2">
                                <label><small>7+ days</small></label>
                                <input type="number" v-model="itemDetails.pricing.priceTwo" class="form-control mt1" placeholder="e.g AED 100">
                            </div>
                            <div class="md4">
                                <label><small>30+ days</small></label>
                                <input type="number" v-model="itemDetails.pricing.priceThree" class="form-control mt1" placeholder="e.g AED 50">
                            </div>
                        </div>
                    </div>
                    <div>
                        <label><small>ITEM DESCRIPTION</small></label>
                        <textarea class="form-control mt1" v-model="itemDetails.description" placeholder="Item description goes here..." rows="7"></textarea>
                    </div>
                    <w-button class="mt1 btn" bg-color="success">Save changes</w-button>
                </div>
            </div>
        </w-dialog>

    </w-card>
</template>

<style scoped>
.item-card{
    border-radius: 0px;
}
.status{
    color: #02b902;
    font-size: 11px;
    font-weight: bold;
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
.img-prev-card{
    border: 1px solid rgba(0,0,0,.15);
    padding-left: 5px;
    padding-top: 4px;
    padding-right: 4px;
    border-radius: 5px;
    width: 100%;
}
.prev-img{
    width: 70px;
    height: 40px;
    object-fit: cover;
    border-radius: 5px;
}
.del-icon{
    font-size: 20px;
}
.del-icon:hover{
    background-color: #dfdfdf;
    border-radius: 3px;
    color: red;
}
</style>