<script>
import axios from 'axios'
axios.defaults.withCredentials = true
export default {
    data(){
        return{
            processing: true,
            showDialog1: true,
            showErrMsg: false,
            errmsg: '',
            imageFile: null,
            imagePreview: '',
            filenameInDb: '',
            imageUrlForDelete: [],
            userDetails: {
                username: '',
                email: '',
                address: '',
                mobile_number: '',
                profile_image: '',
                bio: '',
            }
        }
    },
    computed:{
        validateFields(){
            if (this.userDetails.username == "" || this.userDetails.email == "" || this.userDetails.mobile_number == ""
            || this.userDetails.address == "" || this.userDetails.bio == "") {
                this.errmsg = 'All fields are required'
                return false
            }
            return true
        },
        showProfileImg(){
            if (this.userDetails.profile_image == "" && this.imagePreview == "") {
                return '/src/assets/images/undraw_male_avatar_323b.svg'
            }
            else if (this.imagePreview != ""){
                return this.imagePreview
            }
            return this.userDetails.profile_image + "?random="+Math.random()
        }
    },
    mounted(){
        this.getDetails()
    },
    methods: {
        getDetails(){
            axios({
                method: 'get',
                url: 'http://localhost:5000/users/getuserdetails',
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then(res => {
                this.userDetails = res.data.data
                if (this.userDetails.profile_image != '') {
                    this.filenameInDb = this.userDetails.profile_image.substring(37)
                }
                this.showDialog1 = false
            })
            .catch(err => {
                if (err.response) {
                    console.log(err.response.data.error)
                }
            })
        },
        selectFile(){
            this.imageUrlForDelete = []
            let input = this.$refs.fileInput
            let file = input.files
            if (file && file[0]) {
                let reader = new FileReader
                reader.onload = e => {
                    this.imagePreview = e.target.result
                }   
                reader.readAsDataURL(file[0])
                this.imageFile = file[0]
                this.$emit('input', file[0])
            }
        },
        removePhoto(){
            this.imageUrlForDelete.push(this.userDetails.profile_image)
            this.userDetails.profile_image = ""
            this.imageFile = null
            this.imagePreview = ""
        },
        deletePhoto(){
            axios({
                method:'delete',
                url:'http://localhost:5000/remove_files',
                data: this.imageUrlForDelete
            })
            .then(res => {
                this.updateDetails()
            })
            .catch(err => {
                console.log(err.response.data.error)
                this.errmsg = err.response.data.error
            });   
        },
        uploadImage(){
            let formData = new FormData();
            formData.append('user_image', this.imageFile)
            axios({
                method:'post',
                url:`http://localhost:5000/users/uploadprofileimage?filename=${this.filenameInDb}`,
                data: formData
            })
            .then(res => {
                this.userDetails.profile_image = res.data
                this.updateDetails()
            })
            .catch(err => {
                console.log(err.response.data.error)
                this.showDialog1 = false
                this.errmsg = err.response.data.error
                this.showErrMsg = true
            }); 
        },
        updateDetails(){
            axios({
                    method:'put',
                    url:`http://localhost:5000/users/updatedetails`,
                    data: this.userDetails
                })
                .then(res => {
                    this.processing = false
                })
                .catch(err => {
                    console.log(err.response.data.error)
                    this.showDialog1 = false
                    this.errmsg = err.response.data.error
                    this.showErrMsg = true
                });
        },
        saveChanges(){
            if (this.validateFields) {
                this.showDialog1 = true
                if (this.imageFile != null) {
                    this.uploadImage()
                }
                else if (this.userDetails.profile_image == ""){
                    this.deletePhoto()
                }
            }
            else{
                this.showErrMsg = true
            }
        }
    }
}
</script>
<template>
    <div>
        <div>
            <h1>Settings</h1>
            <p class="text-light">Edit account and profile settings.</p>
        </div>
        <div class="mt10">
            <h3 class="section-header">Edit Profile Information <ion-icon name="pencil-outline"></ion-icon></h3>
            <w-divider class="divider mt2 mb4"></w-divider>
            <div class="w-flex">
                <div class="md6">
                    <w-alert v-if="showErrMsg" error icon-outside>
                        <div class="w-flex justify-space-between align-center">
                            <p>{{errmsg}}!</p>
                            <div><ion-icon class="del-icon" @click="this.showErrMsg = false" name="close-outline"></ion-icon></div>
                        </div>
                    </w-alert>

                    <w-dialog persistent v-model="showDialog1" transition="bounce" :width="320">
                        <div class="w-flex justify-center">
                            <div v-if="processing">
                                <p class="text-center"><w-spinner color="success" /></p>
                                <p class="mt2 text-center text-bold">Processing please wait...</p>
                            </div>
                            <div v-else>
                                <p class="text-center"><img src="/src/assets/images/check.png"/></p>
                                <p class="text-center text-bold">Details updated successfully!</p>
                                <p class="text-center mt2"><w-button style="width: 100%;" class="btn" sm bg-color="success" @click="showDialog1 = false">Complete process</w-button></p>   
                            </div>
                        </div>
                    </w-dialog>
                    <div class="w-flex align-center mb3">
                        <div>
                            <img class="user-img" :src="showProfileImg" alt="">
                        </div>
                        <div class="ml3">
                            <div class="mb1">
                                <label class="w-button success--bg size--sm btn" for="manualFileSelect">Change picture</label>
                                <input id="manualFileSelect" style="display: none;" ref="fileInput" type="file" @input="selectFile">
                            </div>
                            <div><w-button class="btn" @click="removePhoto" sm bg-color="light">Remove picture</w-button></div>
                        </div>
                    </div>
                    <div class="mb3">
                        <label><small>Username</small></label>
                        <input type="text" v-model="userDetails.username" class="form-control mt1" placeholder="e.g moonKnight32">
                    </div>
                    <div class="w-flex mb3">
                        <div class="md6">
                            <label><small>Email address</small></label>
                            <input type="email" v-model="userDetails.email" class="form-control mt1" placeholder="e.g marcspectar@gmail.com">
                        </div>
                        <div class="md6 ml2">
                            <label><small>Phone number</small></label>
                            <input type="tel" v-model="userDetails.mobile_number" class="form-control mt1" placeholder="e.g +23609017">
                        </div>
                    </div>
                    <div class="mb3">
                        <label><small>Address</small></label>
                        <input type="text" v-model="userDetails.address" class="form-control mt1" placeholder="e.g 23rd Avenue of Asgard">
                    </div>
                    <div class="mb3">
                        <label><small>Profile bio</small></label>
                        <textarea v-model="userDetails.bio" placeholder="e.g I'm a nice guy with crazy coding skills" class="form-control mt1" rows="8"></textarea>
                    </div>
                    <w-button class="btn" bg-color="success" sm @click="saveChanges">Save Changes</w-button>
                </div>
                <div class="md6 ml4">
                    <w-card bg-color="secondary" no-border>
                        <small>Lorem ipsum dolor, quam hic asperiores tempora praesentium velit voluptatum minima omnis itaque ea enim mollitia. Vitae?</small>
                    </w-card>
                </div>
            </div>   
        </div>
    </div>
</template>

<style>
.user-img{
        border: 1px solid #54b946;
        border-radius: 50%;
        height: 100px;
        width: 100px;
        padding: 3px;
        object-fit: cover;
    }
.section-header{
    font-weight: 500;
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