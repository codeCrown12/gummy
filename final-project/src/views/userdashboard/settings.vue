<script>
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
                    <div class="w-flex align-center mb3">
                        <div>
                            <img class="user-img" src="../../assets/images/undraw_male_avatar_323b.svg" alt="">
                        </div>
                        <div class="ml3">
                            <div class="mb1"><w-button class="btn" sm bg-color="success">Change picture</w-button></div>
                            <div><w-button class="btn" sm bg-color="light">Remove picture</w-button></div>
                        </div>
                    </div>
                    <div class="w-flex mb3">
                        <div class="md6">
                            <label><small>First Name</small></label>
                            <input type="text" class="form-control mt1" placeholder="e.g Marc">
                        </div>
                        <div class="md6 ml2">
                            <label><small>Last Name</small></label>
                            <input type="text" class="form-control mt1" placeholder="e.g Spectar">
                        </div>
                    </div>
                    <div class="w-flex mb3">
                        <div class="md6">
                            <label><small>Email address</small></label>
                            <input type="email" class="form-control mt1" placeholder="e.g marcspectar@gmail.com">
                        </div>
                        <div class="md6 ml2">
                            <label><small>Phone number</small></label>
                            <input type="tel" class="form-control mt1" placeholder="e.g +23609017">
                        </div>
                    </div>
                    <div class="mb3">
                        <label><small>Address</small></label>
                        <input type="email" class="form-control mt1" placeholder="e.g 23rd Avenue of Asgard">
                    </div>
                    <div class="mb3">
                        <label><small>Profile bio</small></label>
                        <textarea placeholder="e.g I'm a nice guy with crazy coding skills" class="form-control mt1" rows="8"></textarea>
                    </div>
                    <w-button class="btn" bg-color="success" sm>Save Changes</w-button>
                </div>
                <div class="md6 ml4">
                    <w-card bg-color="secondary" no-border>
                        <small>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum in accusamus quam hic, facere suscipit animi odit, obcaecati asperiores tempora praesentium velit voluptatum minima omnis itaque ea enim mollitia. Vitae?</small>
                    </w-card>
                </div>
            </div>   
            <h3 class="section-header mt8">Change Security Information <ion-icon name="lock-closed-outline"></ion-icon></h3>
            <w-divider class="divider mt2"></w-divider> 
            <div class="w-flex mt4">
                <div class="md5">
                    <div class="mb3">
                        <label><small>Current password</small></label>
                        <input type="password" class="form-control mt1" placeholder="**********">
                    </div>
                    <div class="mb3">
                        <label><small>New password</small></label>
                        <input type="password" class="form-control mt1" placeholder="**********">
                    </div>
                    <div class="mb4">
                        <label><small>Confirm new password</small></label>
                        <input type="password" class="form-control mt1" placeholder="**********">
                    </div>
                    <w-button class="btn" bg-color="success" sm>Change password</w-button>
                </div>
                <div class="md7 ml4">
                    <w-card bg-color="secondary" no-border>
                        <small>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum in accusamus quam hic, facere suscipit animi odit, obcaecati asperiores tempora praesentium velit voluptatum minima omnis itaque ea enim mollitia. Vitae?</small>
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
    }
.section-header{
    font-weight: 500;
}
</style>