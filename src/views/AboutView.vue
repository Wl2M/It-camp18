<template>
  <div>
    <div class="bak">
      <h1>IT Camp member</h1>

      <v-card style="background-color: #f7f7f7" class="pa-4 ma-15">
        <h1>Seach</h1>
        <br />
        <v-form>
          <v-container>
            <v-row>
              <v-col cols="12" sm="10">
                <v-text-field
                  color="primary"
                  v-model="nameSearch"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="2">
                <div class="box">
                  <div class="add">
                    <v-btn color="primary" @click="dialogAdd = true">
                      ADD
                    </v-btn>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card>
      <div class="text-center">
        <v-dialog v-model="dialogAdd">
          <v-card
            style="background-color: #f7f7f7"
            class="pa-2 ma-15"
            min-width="800"
          >
            <h1>เพิ่ม url รูป</h1>
            <br />

            <v-container>
              <v-col cols="12" sm="10">
                <v-text-field
                  label="url image"
                  v-model="urlInput"
                ></v-text-field>
              </v-col>
            </v-container>
            <h1>เพิ่มชื่อ</h1>
            <br />
            <v-container>
              <v-row>
                <v-col cols="12" sm="10">
                  <v-text-field
                    color="primary"
                    v-model="nameInput"
                    outlined
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <h1>เพิ่มคำคม</h1>
            <br />
            <v-container>
              <v-row>
                <v-col cols="12" sm="10">
                  <v-text-field
                    color="primary"
                    v-model="messageInput"
                    outlined
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <h1>ชื่อบ้าน</h1>
            <br />
            <v-container>
              <v-row>
                <v-col cols="12" sm="10">
                  <v-select
                    :items="items"
                    v-model="homeInput"
                    label="Standard variant"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="2">
                  <div class="addname">
                    <v-btn
                      @click="
                        addName();
                        dialogAdd = false;
                      "
                      color="blue"
                      >add</v-btn
                    >
                  </div>
                </v-col>
                <v-col cols="12" sm="2">
                  <v-btn @click="dialogAdd = false" color="error">cancel</v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-dialog>
      </div>

      <!-- ตัวเเอด -->

      <!-- ตัวเเอด -->

      <!-- ด้านล่าง -->
      <v-card style="background-color: #f7f7f7" class="pa-4 ma-15">
        <h1>Member list</h1>
        <div class="grid">
          <!-- คอลั่ม1 -->
          <v-card
            v-for="(card, index) in filteredList"
            :key="card.id"
            class="mx-auto card"
            style="width: 100%"  
          >
            <img
              class="img"
              :src="card.url"
              style="width: 100%; height: 200px; object-fit: cover"
            />
            <v-dialog v-model="dialog" persistent>
              <v-card width="700">
                <v-card-title>
                  <span class="text-h5">Edit</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-text-field
                      label="url image"
                      v-model="churl"
                    ></v-text-field>
                    <v-text-field
                      label="name"
                      required
                      v-model="chname"
                    ></v-text-field>

                    <v-text-field label="msg" v-model="chmsg"></v-text-field>

                    <v-text-field label="home" v-model="chhome"></v-text-field>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue-darken-1" text @click="dialog = false">
                    cancel
                  </v-btn>
                  <v-btn
                    color="blue-darken-1"
                    text
                    @click="
                      dialog = false;
                      saveEdit(card.id);
                    "
                  >
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <div style="position: absolute; top: 0; right: 0; color: #f7f7f7">
              <v-icon
                @click="deleteCard(card.id)"
                class="icon"
                end
                icon="mdi-cancel"
              ></v-icon>
              <v-icon
                @click="
                  editCard(index);
                  dialog = true;
                "
                class="icon"
                end
                icon="mdi-account-edit"
              ></v-icon>
            </div>

            <v-card-title>
              {{ card.name }}
            </v-card-title>

            <v-card-subtitle>
              {{ card.message }}
              <v-card-text>
                <v-chip-group
                  v-model="selection"
                  active-class="deep-purple accent-4 white--text"
                  column
                >
                  <v-chip>{{ card.home }}</v-chip>
                </v-chip-group>
              </v-card-text>
            </v-card-subtitle>
          </v-card>
          <v-card v-if="nameSearch && !filteredList.length"
            ><v-card-text>Not Found</v-card-text>
          </v-card>
        </div>
      </v-card>

      <div class="mr-16"><br /></div>

      <!-- ด้านล่าง -->

      <!-- dialog -->
    </div>
  </div>
</template>
<script>
import { firestore } from "../config/firebase";
export default {
  data() {
    return {
      names: [],
      urlInput: "",
      nameInput: "",
      homeInput: "",
      messageInput: "",
      deleteName: "",
      nameSearch: "",
      editName: "",
      dialog: false,
      dialogAdd: false,
      churl: "",
      chname: "",
      chmsg: "",
      chhome: "",
      items: ["Re", "Tire", "Drop", "Pro"],
    };
  },
  firestore: {
    names: firestore.collection("Name"),
  },
  methods: {
    addName() {
      firestore.collection("Name").add({
        url: this.urlInput,
        name: this.nameInput,
        message: this.messageInput,
        home: this.homeInput,
      });
      this.urlInput = "";
      this.nameInput = "";
      this.messageInput = "";
      this.homeInput = "";
    },
    deleteCard(id) {
      firestore.collection("Name").doc(id).delete();
    },
    editCard(index) {
      this.churl = this.names[index].url;
      this.chname = this.names[index].name;
      this.chmsg = this.names[index].message;
      this.chhome = this.names[index].home;
      

    },
    saveEdit(id) {
      firestore.collection("Name").doc(id).update({
        url: this.churl,
        name: this.chname,
        message: this.chmsg,
        home: this.chhome,
        
        
      });
      this.churl  = "";
        this.chname = "";
        this.chmsg = "";
        this.chhome  = "";
    },
  },
  computed: {
    filteredList() {
      return this.names.filter((card) => {
        return card.name.toLowerCase().includes(this.nameSearch.toLowerCase());
      });
    },
  },
};
</script>
<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
}
.icon {
  display: none;
}
.card:hover .icon {
  display: block;
}
.bak {
  background-image: url("https://img.freepik.com/free-photo/pink-yellow-plain-background_53876-98329.jpg?w=2000");
  background-size: cover;
  min-height: 100vh;
  height: 100%;
}
.bak h1 {
  padding-top: 2rem;
  padding-left: 2rem;
}
.add {
  padding-left: 2rem;
}
.search {
  padding-left: 2rem;
}
.addname {
  padding-left: 2rem;
}
.box {
  display: flex;
}
</style>
