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
        <w-flex wrap>
            <div class="md2 border-right h-100">
                <div class="pa3 pl5 pr5">
                    <p class="text-bold">Filters</p>
                </div>
                <w-divider/>
                <div class="pa3 pl5 pr5">
                    <input class="form-control" placeholder="Search items" type="text">
                </div>
                <w-divider/>
                <div class="pa3 pl5 pr5">
                    <p class="text-bold">Categories</p>
                    <w-checkbox color="success" class="mt4 filter-checkbox"><span class="pr1 filter-checkbox-text">Gaming equipment</span></w-checkbox>
                    <w-checkbox color="success" class="mt4 filter-checkbox"><span class="pr1 filter-checkbox-text">Cooking utensils</span></w-checkbox>
                    <w-checkbox color="success" class="mt4 filter-checkbox"><span class="pr1 filter-checkbox-text">Books</span></w-checkbox><br>
                    <w-checkbox color="success" class="mt4 filter-checkbox"><span class="pr1 filter-checkbox-text">Clothings</span></w-checkbox>
                    <w-checkbox color="success" class="mt4 filter-checkbox"><span class="pr1 filter-checkbox-text">Media equipment</span></w-checkbox>
                    <w-checkbox color="success" class="mt4 filter-checkbox"><span class="pr1 filter-checkbox-text">Musical instruments</span></w-checkbox>
                </div>
                <w-divider class="mt4"/>
                <div class="pa3 pl5 pr5 mt3">
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
            </div>
            <div class="md10">
              <div wrap class="pa8">
                <h2 class="pl2">Hello, Gummite 👋</h2>   
                <w-flex class="mt3" wrap>
                    <div class="md3 pa2" v-for="i in 8" :key="i">
                        <item></item>
                    </div>
                </w-flex>
              </div>
            </div>
        </w-flex>
        <footerVue></footerVue>
    </div>
</template>

<style scoped>
    .border-right {
        border-right: 1px solid rgba(0,0,0,.15);
    }
    .filter-checkbox-text{
        font-size: 13px;
        color: black;
    }
</style>