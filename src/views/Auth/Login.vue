<template>
    <div class="Login">
        <app-modal v-model="dialog" :width="'40%'">
            <div class="Login__roles">
                <p>Select your role</p>
                <select v-model="role.selected_role">
                    <option disabled selected hidden  value="">Selec your role</option>
                    <option v-for="item in role.roles" :key="item.id" :value="item">
                        {{ item }}
                    </option>                    
                </select>
                <div class="Login__roles-action">
                    <button @click="Login_With_Role">Save</button>
                </div>
            </div>
        </app-modal>
        <div class="Login__item">
            <h1>System entrance</h1>
            <Form @submit="Login">
                <label for="login">Username</label>
                <Field 
                 rules="required" name="Username" :modelValue="form.username" v-slot="{errors}" >
                <input type="text" v-model="form.username" id="login" placeholder="Username">
                <p class="login__input-error" v-if="errors && errors.length">{{ errors[0] }}</p>
                </Field>
                <label for="password">Password</label>
                <Field rules="required" name="Password" :modelValue="form.password" v-slot="{errors}">
                  <div class="login__form-input">
                    <input :type="showPassword ? 'text' :'password' " id="password" v-model="form.password" placeholder="Password">
                    <img width="20" height="16" src="../../assets/Images/eye-regular.svg" @click="ChangePassword" alt="eye" :class="showPassword ? 'Login__hide' :'Login__show' ">
                    <img width="20" height="16"  src="../../assets/Images/eye-slash-regular.svg" @click="ChangePassword" alt="hide" :class="showPassword ? 'Login__show' :'Login__hide' ">
                  </div>
                  <p class="login__input-error" v-if="errors && errors.length">{{ errors[0] }}</p>
                </Field>
                <button  type="submit">ENTER</button>
            </Form>
        </div>
    </div>
</template>

<script setup>
import { Field , Form } from 'vee-validate';
import appModal from '@/components/ui/app-modal'
import { ref } from 'vue';
import http from '../../plugins/axios';
import Notification from '@/plugins/Notification';
import { routeLocationKey } from 'vue-router';
import { useRouter } from 'vue-router';
const router = useRouter()
const form =ref({
    username :"",
    password :""
});
const showPassword  = ref(false)
const dialog = ref(false)
const role = ref({
    roles:[],
    selected_role :""
})
const ChangePassword =()=>{
    showPassword.value =!showPassword.value
}
const Login =()=>{
  http.post("/api/user/token/" ,{
    username:form.value.username,
    password:form.value.password
  }).then((res)=>{}).catch((err)=>{
    if(err.response.status===400){
         Notification({text:'Select your role !!!'} , {type:'success'})
         dialog.value = true
    }
    else{
        Notification({text:'You have a mistake !!!'} ,{type:'danger'})
    }
    role.value.roles = err.response.data.roles
    if(!err.response.data.keys){
        Notification({text:'Xatolik mavjud'})
    }
  })
};
const Login_With_Role =()=>{
    http.post("api/user/token/" ,{
        username:form.value.username,
        password:form.value.password,
        current_role:role.value.selected_role
    }).then((res)=>{
        if(res.data.access){
            sessionStorage.setItem('token' , res.data.access)
            sessionStorage.setItem('role' , res.data.current_role)
            if(res.data.current_role === "warehouseman"){
                router.push({name:'product-list'})
            }
            if(res.data.current_role === "director"){
                router.push({name:'director'})
            }
            if(res.data.current_role === "salesman"){
                router.push({name:'clients'})
            }
            if(res.data.current_role === "financier"){
                router.push({name:'financier'})
            }
        }
    })
}
</script>

<style lang="scss" scoped>
  $blue-color :#435ebe;
  $input-bg:#edf2f7;
  *{
    box-sizing: border-box;
  }
  .Login{
    width: 100%;
    background-color: #f3f7f9;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    .Login__roles{
        display: flex;
        flex-direction: column;
        align-items:center ;
        justify-content: center;
        padding: 10px;
        p{
            font-size: 30px;
            margin-bottom: 20px;
            word-spacing: 0.5px;
        }
        select{
           width: 60%;
           height: 35px;
           font-size: 16px;
           border-radius: 5px;
        }
        .Login__roles-action{
            width: 100%;
            margin-top: 25px;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            button{
                border: none;
                color: #fff;
                background-color: $blue-color;
                padding: 12px 20px;
                border-radius: 5px;
                font-size: 16px;
                cursor: pointer;
            }
        }
    }
    .Login__item{
        width: 60%;
        background-color: #fff;
        box-shadow: 0px 4px 10px rgba(0, 0,0,0.04);
        border-radius: 8px;
        display: flex;
        align-items: center;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 20px 0px;
        h1{
            font-weight: 600;
            font-size: 30px;
            color: #272a2c;
            margin: 20px auto;
        }
        Form{
            width: 60%;
            margin: 50px 0px;
            display: flex;
            flex-direction: column;
          
            .login__form-input{
                width: 100%;
                display: flex;
                align-items: center;
                border-radius: 5px;
                padding-right: 20px;
                background-color: $input-bg;
                %input_act{
                    cursor: pointer;
                    background-color: transparent;
                  
                }
                .Login__show{
                    @extend %input_act;
                    display: block;
                }
                .Login__hide{
                    @extend %input_act;
                    display: none;
                }
          
            }
            input{
                width: 100%;
                font-weight: 400;
                font-size: 14px;
                height: 45px;
                padding-left: 15px;
                color: #272a2c;
                background: $input-bg;
                border-radius: 5px;
                outline: none;
                margin-right: 5px;
                border: none;
            }
            .login__input-error{
                margin-top: 5px;
                color: red;
                font-size: 15px;
                font-weight: 500;
            }
            label{
                margin: 10px 0;
                font-weight: 500;
                font-size: 16px;
                color: #2c2728;
            }
            button{
                margin-top: 40px;
                border: none;
                padding: 10px 0px;             
                color: #fff;
                font-size: 16px;
                background-color: $blue-color;
                border-radius: 5px;
                cursor: pointer;
            }
        }
    }
    @media (max-width: 990px){
        .Login__item{
            width: 80%;
            Form{
            width:80% ;
            }
        }
    }
    @media (max-width: 576px){
        .Login__item{
            width: 90%;
            Form{
                width: 90%;
            }
        }
    }
  }
</style>