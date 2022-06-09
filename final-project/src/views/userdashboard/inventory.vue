<script>
import inventoryItem from '../../components/inventoryitem.vue'
export default {
    components: { inventoryItem }
}
</script>
<template>
    <div>
        <div>
            <h1>My inventory</h1>
            <p class="text-light">View and manage all items in your inventory.</p>
        </div>
        <div class="mt5">
            <inventoryItem v-for="i in 8" :key="i"></inventoryItem>
        </div>
    </div>
</template>