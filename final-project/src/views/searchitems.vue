<script>
    import navbar from '../components/navbar.vue';
    import item from '../components/item.vue'
    import footerVue from '../components/footer.vue';
    export default {
        components: { navbar, item, footerVue },
    }
</script>

<template>
    <div>
        <navbar/>
        <w-flex>
            <w-toolbar class="pa0 filter-sidebar" vertical>
                <div class="pa5">
                    <input class="form-control" placeholder="Search items" type="text">
                </div>
                <w-divider/>
                <div class="pa5">
                    <p class="text-bold">Categories</p>
                    <w-checkbox color="success" class="mt4 filter-checkbox"><span class="pr1 filter-checkbox-text">Gaming equipment</span></w-checkbox>
                    <w-checkbox color="success" class="mt4 filter-checkbox"><span class="pr1 filter-checkbox-text">Books & stationery</span></w-checkbox>
                    <w-checkbox color="success" class="mt4 filter-checkbox"><span class="pr1 filter-checkbox-text">Media equipment</span></w-checkbox>
                    <w-checkbox color="success" class="mt4 filter-checkbox"><span class="pr1 filter-checkbox-text">Musical instruments</span></w-checkbox>
                </div>
                <w-divider/>
                <div class="pa5">
                    <p class="text-bold">Price range</p>
                    <w-flex wrap class="mt3">
                        <div class="md6 pr1">
                            <input class="form-control" placeholder="Min" type="number">
                        </div>
                        <div class="md6">
                            <input class="form-control" placeholder="Max" type="number">
                        </div>
                    </w-flex>
                    <w-button class="btn mt2" style="width: 100%;" bg-color="success" sm>Set price range</w-button>
                </div>
            </w-toolbar>
            <div class="w-flex">
                <div class="md12">
                    <div wrap class="pa7">
                        <h2 class="pl2 mb2">Explore items 😎</h2>   
                        <w-flex wrap>
                            <div class="md3 pa2" v-for="i in 12" :key="i">
                                <item></item>
                            </div>
                        </w-flex>
                    </div>
                </div>
            </div>
        </w-flex>
    </div>
</template>

<style scoped>
    .filter-sidebar{
        width: 230px;
    }
    .filter-checkbox-text{
        font-size: 13px;
        color: black;
        width: 100%;
    }
</style>