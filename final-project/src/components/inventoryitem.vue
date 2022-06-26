<script>
import galleryimage from '../components/galleryimage.vue'
import axios from 'axios'
axios.defaults.withCredentials = true
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
            return year+'/' + month + '/'+dt+' '+hours+':'+minutes
        },
        validateFields(){
            if (this.itemDetails.name == "" || this.itemDetails.category == "" || this.itemDetails.pricing.priceOne == ""
            || this.itemDetails.pricing.priceTwo == "" || this.itemDetails.pricing.priceThree == "") {
                this.errmsg = 'All fields are required'
                return false
            }
            return true
        },
        photosAddedForUpload(){
            if (this.imgFiles.length < 1) {
                return false
            }
            return true
        },
        photosAddedForDelete(){
            if (this.imgSelectedForDelete.length < 1) {
                return false
            }
            return true
        },
        checkNumOfImagesToBeSaved(){
            let totNumOfImgs = this.imgFiles.length + this.itemDetails.images.length
            if (totNumOfImgs > 6) {
                this.errmsg = 'You can only have a maximum of six images'
                return false
            }
            else if(totNumOfImgs < 1){
                this.errmsg = 'You must add at least one image'
                return false
            }
            return true
        }
    },
    data(){
        return{
            dialog1: {show: false},
            dialog2: {show: false},
            dialog3: {show: false},
            dialog4: {show: false},
            showErrMsg: false,
            errmsg: "",
            processing: true,
            imgSelectedForDelete: [],
            imageSources: [],
            imgFiles: [],
        }
    },
    methods: {
        async previewImg(e){
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
            this.previewImg({dataTransfer:src})
        },
        removeNewlyAddedImage(img){
            let item_index = this.imageSources.indexOf(img)
            this.imageSources.splice(item_index, 1)
            this.imgFiles.splice(item_index, 1)
        },
        removeExistingImage(img){
            let imgIndex = this.itemDetails.images.indexOf(img)
            this.itemDetails.images.splice(imgIndex, 1)
            this.imgSelectedForDelete.push(img)
        },
        deleteSelectedImgs(){
            if (this.photosAddedForDelete) {
               axios({
                    method:'delete',
                    url:'http://localhost:5000/remove_files',
                    data: this.imgSelectedForDelete
                })
                .then(res => {
                    console.log(res.data)
                    this.uploadNewImgs()
                })
                .catch(err => {
                    console.log(err.response.data.error)
                    this.errmsg = err.response.data.error
                });
            }
            else this.uploadNewImgs()
        },
        uploadNewImgs(){
            if(this.photosAddedForUpload){
                let formData = new FormData();
                this.imgFiles.forEach((file, index) => {
                    formData.append('item_image', file)
                })
                axios({
                    method:'post',
                    url:'http://localhost:5000/items/uploadimages',
                    data: formData
                })
                .then(res => {
                    let imgsarr = res.data.concat(this.itemDetails.images)
                    this.itemDetails.images = imgsarr
                    this.updateItemDetailsInDb()
                })
                .catch(err => {
                    console.log(err.response.data.error)
                    this.errmsg = err.response.data.error
                });  
            }
            else this.updateItemDetailsInDb()
        },
        updateItemDetailsInDb(){
            let dbItemDetails = {
                name: this.itemDetails.name,
                itemId: this.itemDetails.itemId,
                category: this.itemDetails.category,
                pricing: {
                    priceOne: this.itemDetails.pricing.priceOne,
                    priceTwo: this.itemDetails.pricing.priceTwo,
                    priceThree: this.itemDetails.pricing.priceThree
                },
                images: this.itemDetails.images,
                description: this.itemDetails.description
            }
            axios({
                method: 'put',
                url:'http://localhost:5000/items/updateitemdetails',
                data: dbItemDetails,
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then(res => {
                this.finishProcess()
            })
            .catch(err => {
                console.log(err.response.data.error)
            })
        },
        finishProcess(){ 
            this.imageSources = []
            this.imgFiles = []
            this.imgSelectedForDelete = []
            this.processing = false
        },
        closeProcessModals(){
            this.dialog4.show = false
        },
        saveChanges(){
            if (this.validateFields && this.checkNumOfImagesToBeSaved) {
                this.dialog3.show = false
                this.dialog4.show = true
                this.deleteSelectedImgs()
            }
            else{
                this.dialog3.show = false
                this.showErrMsg = true
            }
        },
        deleteItem(){
            let itemDetails = {itemId: this.itemDetails.itemId, images: this.itemDetails.images}
            this.$emit('deleteItem', itemDetails)
            this.dialog1.show = false
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
                <p><small>Status: </small><small class="text-bold">{{itemDetails.status}}</small></p>
            </div>
            <div>
                <p>{{itemDetails.category}}</p>
            </div>
            <div>
                <p><small>AED <span class="text-bold">{{itemDetails.pricing.priceOne}}</span> Daily</small></p>
                <p><small>AED <span class="text-bold">{{itemDetails.pricing.priceTwo}}</span> 7+ Days</small></p>
                <p><small>AED <span class="text-bold">{{itemDetails.pricing.priceThree}}</span> 30+ Days</small></p>
            </div>
            <div>
                <w-menu arrow content-class="pa1" left>
                    <template #activator="{ on }">
                        <ion-icon class="menu-icon" v-on="on" name="ellipsis-horizontal"></ion-icon>
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
                <w-button class="mr2 btn" @click="deleteItem" color="error" sm outline>
                    Yes remove
                </w-button>
                <w-button class="btn" @click="dialog1.show = false" bg-color="success" sm>
                    Cancel
                </w-button>
            </template>
        </w-dialog>

        <!-- Edit item details  dialog-->
        <w-dialog v-model="dialog2.show" transition="bounce" title="Edit item Details" :width="800">
            
            <w-dialog v-model="dialog3.show" title="Confirm action !" overlay-opacity="0.4" transition="bounce" :width="340">
                <p style="font-size: 14px;">Are you sure you want to save the changes made ?</p>
                <p class="mt1"><small><strong>Note:</strong> If you're not sure, refresh this page and try again</small></p>
                <template #actions>
                    <div class="spacer" />
                    <w-button class="mr2 btn" @click="saveChanges" bg-color="success" sm>
                        Yes save changes
                    </w-button>
                    <w-button class="btn" @click="dialog3.show = false" color="error" sm outline>
                        Cancel
                    </w-button>
                </template>
            </w-dialog>

            <w-dialog persistent v-model="dialog4.show" transition="bounce" :width="320">
                <div class="w-flex justify-center">
                    <div v-if="processing">
                        <p class="text-center"><w-spinner color="success" /></p>
                        <p class="mt2 text-center text-bold">Processing please wait...</p>
                    </div>
                    <div v-else>
                        <p class="text-center"><img src="../assets/images/check.png"/></p>
                        <p class="text-center text-bold">Item details updated successfully!</p>
                        <p class="text-center mt2"><w-button style="width: 100%;" class="btn" sm bg-color="success" @click="closeProcessModals">Complete process</w-button></p>   
                    </div>
                </div>
            </w-dialog>
            
            <div class="w-flex wrap">
                <div class="md6 pa2" style="max-height: 400px;overflow-y: auto;">
                    <div class="mb1">
                        <label class="w-button success--bg size--sm btn ml1" for="manualFileSelect">Add new image(s)</label>
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
                                        <ion-icon @click="removeNewlyAddedImage(image)" class="del-icon" name="close-outline"></ion-icon>
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
                                    <ion-icon @click="removeExistingImage(image)" class="del-icon" name="close-outline"></ion-icon>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--  -->

                </div>
                <div class="md6 pa2">
                    <w-alert v-if="showErrMsg" error icon-outside>
                        <div class="w-flex justify-space-between align-center">
                            <p>{{errmsg}}!</p>
                            <div><ion-icon class="del-icon" @click="this.showErrMsg = false" name="close-outline"></ion-icon></div>
                        </div>
                    </w-alert>
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
                    <w-button @click="dialog3.show = true" class="mt1 btn" bg-color="success">Save changes</w-button>
                </div>
            </div>
        </w-dialog>

    </w-card>
</template>

<style scoped>
.item-card{
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
.img-prev-card{
    border: 1px solid rgba(0,0,0,.15);
    padding-left: 5px;
    padding-top: 4px;
    padding-right: 4px;
    border-radius: 5px;
    width: 100%;
}
.prev-img{
    width: 75px;
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