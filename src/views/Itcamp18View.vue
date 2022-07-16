<template>
    <h1 style="margin-top:20px;margin-left: 50px;margin-bottom:-50px;">IT Camp member</h1>
    <v-card style="background-color:#f7f7f7" class="pa-4 ma-15">
    <h1>ค้นหาชื่อ</h1><br>
    <v-form>
    <v-container>
      <v-row>
        <v-col cols="12" sm="10">
          <v-text-field color="primary"
            v-model="nameSearch"
            outlined
          ></v-text-field>
        </v-col>
          <v-col cols="12" sm="2">
          <v-btn  color="green">Search</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
    </v-card>
   

    <!-- ตัวเเอด -->
    <v-card style="background-color:#f7f7f7" class="pa-2 ma-15">
      <h1>เพิ่มชื่อ</h1><br>
      <v-container>
      <v-row>
        <v-col cols="12" sm="10">
          <v-text-field color="primary"
            v-model="nameInput"
            outlined
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
    <h1>เพิ่มคำคม</h1><br>
    <v-container>
      <v-row>
        <v-col cols="12" sm="10">
          <v-text-field color="primary"
            v-model="messageInput"
            outlined
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
    <h1>ชื่อบ้าน</h1><br>
    <v-container>
      <v-row>
        <v-col cols="12" sm="10">
          <v-text-field color="primary"
            v-model="homeInput"
            outlined
          ></v-text-field>
        </v-col>
          <v-col cols="12" sm="2">
          <v-btn @click="addName" color="blue">add</v-btn>
        </v-col>
      </v-row>
    </v-container>
    </v-card>
    <!-- ตัวเเอด -->



   
   
   <!-- ด้านล่าง -->
    <v-card style="background-color:#f7f7f7" class="pa-4 ma-15">
        <h1>Drop</h1>
    <div class="grid">
    <!-- คอลั่ม1 -->
    <v-card v-for="card in names" :key="card.id" class="mx-auto card">
    
    <v-img class="img"
      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
      height=""
    ></v-img>
    <v-icon class="icon" end icon="mdi-cancel" style="position:absolute; top:0; right:0;"></v-icon>
    

    <v-card-title>
      {{ card.name }}
    </v-card-title>

    <v-card-subtitle>
      {{card.message}}
      <v-card-text>
      <v-chip-group v-model="selection" active-class="deep-purple accent-4 white--text" column>
        <v-chip>{{card.home}}</v-chip>
        </v-chip-group>
      </v-card-text>
    </v-card-subtitle>
    </v-card>
    

      </div>
    </v-card>
    <!-- ด้านล่าง -->








    
</template>

<script>
import {firestore} from '../config/firebase'
export default{
    data(){
        return{
            names:[],
            nameInput:"",
            homeInput:"",
            messageInput:""
    

        }
    },
    firestore: {
         names: firestore.collection('Name')
    },
    methods:{
        addName(){
            firestore.collection("Name").doc(this.nameInput+"-profile").set({
            name:this.nameInput,
            message:this.messageInput,
            home:this.homeInput
            
            })
        },
        
    }
}
</script>




<style scoped>
    .grid{
        display:grid;
        grid-template-columns: repeat(4,1fr);
    }
    .icon{
      display:none;
    }
    .card:hover .icon{
      display:block;
    }
</style>



