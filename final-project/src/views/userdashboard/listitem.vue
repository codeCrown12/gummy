<script>
</script>
<template>
    <div>
        <div>
            <h1>List item</h1>
            <p class="text-light">List an item for other users to rent.</p>
        </div>
        <div class="w-flex mt6">
            <div class="md6">
                <div class="img-upload-box">
                    <h3 class="text-center" style="font-weight: 200;">Drag and drop images here</h3>
                </div>
                <div class="w-flex mb4 mt4">
                    <div class="md6">
                        <label><small>Item name</small></label>
                        <input type="text" class="form-control mt1" placeholder="e.g Nintendo DX">
                    </div>
                    <div class="md6 ml2">
                        <label><small>Category</small></label>
                        <select class="form-select mt1">
                            <option value="">-- Select category --</option>
                        </select>
                    </div>
                </div>
                <h4>ITEM PRICING</h4>
                <div class="w-flex mb3 mt3">
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
                <div class="mb3">
                    <label><small>Product description</small></label>
                    <textarea placeholder="Description goes here" class="form-control mt1" rows="8"></textarea>
                </div>
                <w-button class="mt4 pa5" round style="width: 100%;" bg-color="success">ADD ITEM TO INVENTORY</w-button>
            </div>
            <div class="md6 ml4">
                <w-card bg-color="secondary" no-border>
                    <small>Images added will be displayed here for preview. You can add and remove as many images as you want.</small>
                </w-card>
            </div>
        </div>
    </div>
</template>

<style scoped>
.img-upload-box{
    width: 100%;
    height: 100px;
    background-color: #f8f8f8;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid rgba(0,0,0,.15);
}
</style>