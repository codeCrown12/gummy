<script>
   export default {
       data: () => ({
            openDrawer: false
        })
   }
</script>
<template>
    <div class="w-flex">
        <w-toolbar vertical class="sidebar">
            <div class="title2 text-bold"><router-link class="sidebar-logo" to="/">Gummy🍬</router-link></div>
            <p class="text-center mb2">USER DASHBOARD</p>
            <w-divider class="divider mb2"></w-divider>
            <router-link to="/userdashboard/myinventory" class="sidebar-link mt2"><ion-icon class="mr4 sidebar-icon" name="list-outline"></ion-icon> My inventory</router-link>
            <router-link to="/userdashboard/listitem" class="sidebar-link mt2"><ion-icon class="mr4 sidebar-icon" name="add-circle-outline"></ion-icon> List item</router-link>
            <router-link to="/userdashboard/requests" class="sidebar-link mt2"><ion-icon class="mr4 sidebar-icon" name="arrow-down-outline"></ion-icon> Booking requests</router-link>
            <router-link to="/userdashboard/requests" class="sidebar-link mt2"><ion-icon class="mr4 sidebar-icon" name="document-outline"></ion-icon> My bookings</router-link>
            <router-link to="/userdashboard/settings" class="sidebar-link mt2"><ion-icon class="mr4 sidebar-icon" name="cog"></ion-icon> Settings</router-link>
            <div class="spacer"></div>
            <router-link to="/login" class="sidebar-link mb4"><ion-icon class="mr4 sidebar-icon" name="power"></ion-icon> Logout</router-link>
        </w-toolbar>
        
        <w-drawer width="200px" left v-model="openDrawer" />
        
        <div class="md12 main-container">
            <w-toolbar class="navbar">
                <ion-icon @click="openDrawer = true" class="sidebar-toggler nav-icon mr4" name="menu-outline"></ion-icon>
                <p>Tuesday 21 May, 2022</p>
                <div class="spacer"></div>
                <div>
                    <div class="w-flex align-center">
                        <router-link style="background-color: #fff;" to="/userdashboard/listitem" class="mr3">
                            <ion-icon title="List an item" class="nav-icon" name="add-circle-outline"></ion-icon>
                        </router-link>
                        
                        <router-link to="/">
                            <ion-icon name="notifications-outline" class="nav-icon mr3"></ion-icon>
                        </router-link>
                        
                        <router-link to="/">
                            <img src="../../assets/images/undraw_male_avatar_323b.svg" alt="" class="user-img">
                        </router-link>
                    </div>
                </div>
            </w-toolbar>
            <div class="pa10">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .navbar{
            padding-top: 4px;
            padding-bottom: 2px;
        }
    .sidebar{
        width: 210px;
        height: 100vh;
    }
    .sidebar-logo{
        color: #000;
    }
    .sidebar-link{
        color: #000;
        width: 100%;
        padding: 10px;
        border-radius: 25px;
        font-size: 13.5px;
        display: flex;
        align-items: center;
    }
    .sidebar-link:hover{
        background-color: rgba(128, 128, 128, 0.151);
    }
    .router-link-active, .router-link-active:hover{
        background-color: #54b946;
        color: #fff;
    }
    .sidebar-icon{
        font-size: 18px;
    }
    .user-img{
        border: 1px solid #54b946;
        border-radius: 50%;
        height: 35px;
        width: 35px;
        padding: 1px;
    }
    .nav-icon{
        font-size: 25px;
        color: #000;
        cursor: pointer;
    }
    .sidebar-toggler{
        display: none;
    }
    .main-container{
        height: 100vh;
        overflow-y: auto;
    }
    @media screen and (max-width: 700px) {
        .sidebar{
            display: none;
        }
        .sidebar-toggler{
            display: block;
        }
    }
</style>