<script>
export default {
    data(){
        return{
            dialog1: { show: false }
        }
    }
}
</script>
<template>
    <div>
        <w-dialog v-model="dialog1.show" transition="bounce" title-class="" :width="300">
            <p style="font-size: 14px;">Do you really want to remove this image from the list?</p>
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
        <div class="gallery-img-obj">
            <img src="https://images.unsplash.com/photo-1495121553079-4c61bcce1894?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=381&q=80" class="gallery-img" alt="">
            <div class="gallery-img-overlay">
                <div class="w-flex justify-end align-center">
                    <button @click="dialog1.show = true" class="btn-rem-img" title="remove image"><ion-icon name="trash-outline"></ion-icon></button>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
    .gallery-img-obj{
        position: relative;
        width: 100%;
        overflow: hidden;
        height: 130px;
    }
    .gallery-img{
        width: 100%;
        object-fit: cover;
        height: 130px;
    }
    .gallery-img-overlay {
        display: none;
        position: absolute;
        padding: 10px;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        color: white;
        background-color: rgba(88, 88, 88, 0.418);
    }
    .gallery-img-obj:hover .gallery-img-overlay{
        display: block;
    }
    .btn-rem-img{
        padding: 5px;
        font-size: 20px;
        background-color: #ff2222;
        border: 0;
        color: #fff;
        border-radius: 5px;
    }
</style>