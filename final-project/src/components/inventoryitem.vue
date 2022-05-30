<script>
import galleryimage from '../components/galleryimage.vue'
   export default {
    components: { galleryimage },
    data(){
        return{
            dialog1: { show: false },
            dialog2: {show: false}
        }
    },
}
</script>
<template>
    <w-card class="mb2 item-card">
        <div class="w-flex justify-space-between">
            <div>
                <p>#15AdW21</p>
                <p><small class="text-light">02/01/2021 - 11:30 AM</small></p>
            </div>
            <div>
                <p>Panasonic camera XW234</p>
                <div class="w-flex align-center"><small class="status"><ion-icon name="paper-plane-outline"></ion-icon> out for rent</small></div>
            </div>
            <div>
                <p>Media equipment</p>
            </div>
            <div>
                <p><small>AED 200 Daily</small></p>
                <p><small>AED 100 7+ Days</small></p>
                <p><small>AED 50 30+ Days</small></p>
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
        <w-dialog v-model="dialog2.show" transition="bounce" title-class="" title="Edit item Details" :width="700">
            <div class="w-flex wrap">
                <div class="md6 pa2">
                    <button class="add-img-btn ml1">Add image</button>
                    <div class="mt1" style="max-height: 430px;overflow-y: auto;">
                        <div class="w-flex wrap">
                        <div class="md6 pa1" v-for="i in 6" :key="i">
                            <galleryimage></galleryimage>
                        </div>
                    </div>
                    </div>
                </div>
                <div class="md6 pa2">
                    <h3>ITEM INFORMATION</h3>
                    <div class="mb3 mt2">
                        <label><small>ITEM NAME</small></label>
                        <input type="text" class="form-control mt1" placeholder="Item name goes here...">
                    </div>
                    <div class="mb3">
                        <label><small>CATEGORY</small></label>
                        <select class="form-control mt1">
                            <option>-- select category --</option>
                        </select>
                    </div>
                    <div class="mb3">
                        <div class="w-flex mt1">
                            <div class="md4">
                                <label><small>1 - 7 days</small></label>
                                <input type="number" class="form-control mt1" placeholder="e.g AED 200">
                            </div>
                            <div class="md4 pl2 pr2">
                                <label><small>7+ days</small></label>
                                <input type="number" class="form-control mt1" placeholder="e.g AED 100">
                            </div>
                            <div class="md4">
                                <label><small>30+ days</small></label>
                                <input type="number" class="form-control mt1" placeholder="e.g AED 50">
                            </div>
                        </div>
                    </div>
                    <div>
                        <label><small>ITEM DESCRIPTION</small></label>
                        <textarea class="form-control mt1" id="" placeholder="Item description goes here..." rows="7"></textarea>
                    </div>
                    <w-button class="pa4 mt1" style="width: 100%;" round bg-color="success">SAVE CHANGES</w-button>
                </div>
            </div>
        </w-dialog>

    </w-card>
</template>

<style scoped>
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
.add-img-btn{
    padding: 10px;
    border-radius: 0;
    background-color: #54b946;
    border: 0;
    color: #fff;
    cursor: pointer;
}
</style>