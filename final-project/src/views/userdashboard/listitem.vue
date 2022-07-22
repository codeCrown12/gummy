<script>
import axios from 'axios'
axios.defaults.withCredentials = true
   export default {
    data(){
        return{
            processing: true,
            showDialog1: false,
            showErrMsg: false,
            errmsg: '',
            isDragging: false,
            imageSources: [],
            imgFiles: [],
            itemDetails: {
                itemId: "",
                name: "",
                category: "",
                userId: "",
                status: "in inventory",
                date_added: "",
                pricing: {
                    priceOne: '',
                    priceTwo: '',
                    priceThree: ''
                },
                images: [],
                description: ""
            }
        }
    },
    computed: {
        getClasses(){
            return {isDragging: this.isDragging}
        },
        validateFields(){
            if (this.itemDetails.name == "" || this.itemDetails.category == "" || this.itemDetails.pricing.priceOne == ""
            || this.itemDetails.pricing.priceTwo == "" || this.itemDetails.pricing.priceThree == "") {
                this.errmsg = 'All fields are required'
                return false
            }
            else if(this.imgFiles.length < 1){
                this.errmsg = 'You must add at least one image'
                return false
            }
            else if(this.imgFiles.length > 6){
                this.errmsg = 'Maximum of 6 images is allowed'
                return false
            }
            return true
        },
    },
    methods:{
        dragOver(){
            this.isDragging = true
        },
        dragLeave(){
            this.isDragging = false
        }, 
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
            this.isDragging = false
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
        removeImage(img){
            let item_index = this.imageSources.indexOf(img)
            this.imageSources.splice(item_index, 1)
            this.imgFiles.splice(item_index, 1)
        },
        selectFile(){
            var src = this.$el.querySelector('#manualFileSelect')
            this.drop({dataTransfer:src})
        },
        uploadImages(){
            if (this.validateFields) {
                this.showDialog1 = true
                let formData = new FormData();
                this.imgFiles.forEach((file, index) => {
                    formData.append('item_image', file)
                })
                axios({
                    method:'post',
                    url:'https://gummy-backend.herokuapp.com/items/uploadimages',
                    data: formData
                })
                .then(res => {
                    this.itemDetails.images = res.data
                    this.addItemToDb()
                })
                .catch(err => {
                    console.log(err.response.data.error)
                    this.showDialog1 = false
                    this.errmsg = err.response.data.error
                    this.showErrMsg = true
                });   
            }
            else{
                this.showErrMsg = true
            }
        },
        addItemToDb(){
            let date = new Date()
            this.itemDetails.date_added = date
            axios({
                method: 'post',
                url:'https://gummy-backend.herokuapp.com/items/additem',
                data: this.itemDetails,
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then(res => {
                this.clearFields()
            })
            .catch(err => {
                console.log(err.response.data.error)
            })
        },
        clearFields(){ 
            this.imageSources = []
            this.imgFiles = []
            this.processing = false
            this.itemDetails.name = ""
            this.itemDetails.category = ""
            this.itemDetails.description = ""
            this.itemDetails.pricing.priceOne = ""
            this.itemDetails.pricing.priceTwo = ""
            this.itemDetails.pricing.priceThree = ""
        }
        
    }
   }
</script>
<template>
    <div>
        <div>
            <h1>List item</h1>
            <p class="text-light">List an item for other users to rent.</p>
        </div>
        <div class="w-flex mt6">
            <div class="md6">
                
                <!-- Status and error dialogs -->
                <w-dialog persistent v-model="showDialog1" transition="bounce" :width="320">
                    <div class="w-flex justify-center">
                        <div v-if="processing">
                            <p class="text-center"><w-spinner color="success" /></p>
                            <p class="mt2 text-center text-bold">Processing please wait...</p>
                        </div>
                        <div v-else>
                            <p class="text-center"><img src="../../assets/images/check.png"/></p>
                            <p class="text-center text-bold">Item added successfully!</p>
                            <p class="text-center mt2"><w-button style="width: 100%;" class="btn" sm bg-color="success" @click="showDialog1 = false">Complete process</w-button></p>   
                        </div>
                    </div>
                </w-dialog>

                <w-alert v-if="showErrMsg" error icon-outside>
                    <div class="w-flex justify-space-between align-center">
                        <p>{{errmsg}}!</p>
                        <div><ion-icon class="del-icon" @click="this.showErrMsg = false" name="close-outline"></ion-icon></div>
                    </div>
                </w-alert>
                <!-- End of status and error dialogs -->

                <div class="img-upload-box"
                :class="getClasses"
                @dragover.prevent="dragOver" 
                @dragleave.prevent="dragLeave"
                @drop.prevent="drop($event)"
                >
                    <div>
                         <h3 class="text-center">Drag and drop images here</h3>
                         <h3 class="text-center mt1">or</h3>
                        <div>
                            <label class="text-center" for="manualFileSelect">Select files</label>
                            <input id="manualFileSelect" multiple type="file" @change="selectFile">
                        </div>
                    </div>
                </div>
                <div class="w-flex mb4 mt4">
                    <div class="md6">
                        <label><small>Item name</small></label>
                        <input type="text" v-model="itemDetails.name" class="form-control mt1" placeholder="e.g Nintendo DX">
                    </div>
                    <div class="md6 ml2">
                        <label><small>Category</small></label>
                        <select v-model="itemDetails.category" class="form-select mt1">
                            <option value="">-- Select category --</option>
                            <option value="media equipment">Media equipment</option>
                            <option value="musical instruments">Musical instruments</option>
                            <option value="electronic gadgets">Electronic gadgets</option>
                        </select>
                    </div>
                </div>
                <h4>ITEM PRICING</h4>
                <div class="w-flex mb3 mt3">
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
                <div class="mb3">
                    <label><small>Product description</small></label>
                    <textarea v-model="itemDetails.description" placeholder="Description goes here" class="form-control mt1" rows="8"></textarea>
                </div>
                <w-button class="btn" sm bg-color="success" @click="uploadImages">Add to inventory</w-button>
            </div>
            <div class="md6 ml4">
                <w-card bg-color="secondary" class="ma1 mt0 mb0" no-border>
                    <small>Images added will be shown below. You can add and remove up to six images.</small>
                </w-card>
                <div class="w-flex wrap mt2 border">
                    <div class="md3 pa1" v-for="img in imageSources" :key="img">
                        <div class="img-prev-card w-flex justify-space-between align-center">
                            <div class="ma0">
                                <img :src="img" class="prev-img" alt=""/>
                            </div>
                            <div class="ma0">
                                <ion-icon class="del-icon" @click="removeImage(img)" name="close-outline"></ion-icon>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.img-upload-box{
    width: 100%;
    height: 130px;
    background-color: #f8f8f8;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px dashed rgba(0,0,0,.15);
}
.isDragging{
  background-color: #cccccc;
}

.img-upload-box h3{
    font-family: Catamaran,sans-serif !important;
    font-weight: 200;
}
.img-upload-box label{
    font-family: Catamaran,sans-serif !important;
    font-weight: 200;
    text-decoration: underline;
    color: #149403;
    cursor: pointer;
    font-size: 18px;
    display: flex;
    justify-content: center;
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
#manualFileSelect{
    display: none;
}
</style>