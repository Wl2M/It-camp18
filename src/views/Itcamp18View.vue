<template>
    <v-card class="pa-4 ma-10">
    <v-text-field label ="Name" v-model="nameInput"></v-text-field>
    <v-btn color="blue" @click="addUser()">Add User</v-btn>
    </v-card>
    <v-card class="pa-4 my-4">
        <v-text-field label="name" v-model="deleteNameInput"></v-text-field>
        <v-btn color="error" @click="deleteUser()">Delete</v-btn>
    </v-card>

    <v-card class="pa-4 my-4" v-for="(user,index) in users" :key="user.name">
        <div v-if="selectEdit !== index">
            <p>{{ user.name }}</p>
            <p>{{ user.hairColor }}</p>
            <v-btn color="yellow" @click="editAttribute(index)">Edit</v-btn>
        </div>
        <div v-else>
        <v-text-field label="name" v-model="editData.name"></v-text-field>
        <v-text-field label="hair color" v-model="editData.hairColor"></v-text-field>
        <v-btn color="green" @click="saveChange">Save</v-btn>
        <v-btn @click="selectEdit=-1">cancle</v-btn>
        
        </div>
        
    </v-card>
</template>

<script>
import firestore from '../config/firebase'
export default{
    data(){
        return{
            users:[],
            nameInput:"",
            hairColorInput:"",
            deleteNameInput:"",
            selectEdit:-1,
            editData:{}

        }
    },
    firestore: {
         users: firestore.collection('users')
    },
    methods:{
        addUser(){
            firestore.collection("users").doc(this.nameInput+"-webtopia").set({
                name:this.nameInput,
                hairColor:this.hairColorInput
                })   
        },
        deleteUser(){
            firestore.collection('users').doc(this.deleteNameInput + '-webtopia').delete({})
        },
        editAttribute(index){
            this.selectEdit = index;
            this.editData = this.users[index]
        },
        saveChange(){
            firestore.collection('users').doc(this.users[this.selectEdit].name + "-webtopia").set({
                name:this.users[this.selectEdit].name,
                hairColor: this.editData.hairColor,
                });
                this.selectEdit= -1;
        }
    }
}
</script>



