<template>
  <v-container fluid grid-list-xl>
    <v-layout row wrap>
      <v-flex xs12 sm5 md4 lg3>
        <v-card v-if="user.name">
        <v-img
          v-if="user.picture"
          :src="user.picture.large"
        ></v-img>

        <v-card-title primary-title>
          
          <div>
            <h3 class="headline mb-0" v-text="user.name"></h3>
            <div>
              <div v-if="user.location"><v-icon>mdi-map-marker</v-icon> {{user.location}}</div>
            </div>
            <div class="margin-top">
              <v-badge
                overlap
                color="info"
              >
                <span slot="badge" v-text="user.memberships.length"></span>
                <v-btn small color="info" @click="dialog = !dialog">Memberships</v-btn>
              </v-badge>
            </div>
          </div>
        </v-card-title>

          <v-card-actions>
            <v-btn small color="primary" @click="$router.push({name: 'VenSend'})">Send Ven</v-btn>
            <v-btn small color="primary" @click="$router.push({name: 'VenRequest'})">Request Ven</v-btn>
          </v-card-actions>
        </v-card>
        <a class="v-btn primary small" :href="`https://hubculture.com/hubid/${user.url}`" target="_blank">hubculture.com/hubid/{{user.url}}</a>
      </v-flex>
      <v-flex xs12 sm7 md8 lg9>
        <v-card
          class="hide-overflow"
          dark
          v-if="user.first"
        >
          <v-toolbar
            card
            color="primary"
          >
            <v-icon>mdi-account</v-icon>
            <v-toolbar-title class="font-weight-light">Personal Profile</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
              color="primary darken-3"
              fab
              small
              @click="isEditing = !isEditing"
            >
              <v-icon v-if="isEditing">mdi-close</v-icon>
              <v-icon v-else>mdi-pencil</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <v-subheader>Main</v-subheader>
            <v-text-field
              :disabled="!isEditing"
              color="white"
              label="First name"
              v-model="form.first"
            ></v-text-field>
            <v-text-field
              :disabled="!isEditing"
              color="white"
              label="Last name"
              v-model="form.last"
            ></v-text-field>
            <v-autocomplete
              :disabled="!isEditing"
              :items="statusLevel"
              :filter="customFilter"
              color="white"
              item-text="name"
              item-value="id"
              label="Status level"
              v-model="form.eventStatus"
            ></v-autocomplete>

            <v-subheader>Personal</v-subheader>
            <v-text-field
              :disabled="!isEditing"
              color="white"
              label="Mobile number"
              v-model="form.mobile"
            ></v-text-field>
            <v-text-field
              :disabled="!isEditing"
              color="white"
              label="Location"
              v-model="form.location"
            ></v-text-field>
            <v-text-field
              :disabled="!isEditing"
              color="white"
              label="Zip/postcode"
              v-model="form.zip"
            ></v-text-field>
            <v-text-field
              :disabled="!isEditing"
              color="white"
              label="Address"
              v-model="form.address"
            ></v-text-field>
            <v-text-field
              :disabled="!isEditing"
              color="white"
              label="About Me"
              v-model="form.about"
            ></v-text-field>
            <v-text-field
              :disabled="!isEditing"
              color="white"
              label="Outward Links"
              v-model="form.outward"
            ></v-text-field>

            <v-subheader>Entity</v-subheader>
            <v-text-field
              :disabled="!isEditing"
              color="white"
              label="Company Name"
              v-model="form.compname"
            ></v-text-field>
            <v-text-field
              :disabled="!isEditing"
              color="white"
              label="Company Address"
              v-model="form.compaddress"
            ></v-text-field>
            <v-autocomplete
              :disabled="!isEditing"
              :items="profileCompanyPositions"
              :filter="customFilter"
              color="white"
              item-text="title"
              item-value="name"
              label="My position is"
              v-model="form.compposition"
            ></v-autocomplete>
            <v-text-field
              :disabled="!isEditing"
              color="white"
              label="Company Registration Number"
              v-model="form.compregnumb"
            ></v-text-field>
            <v-text-field
              :disabled="!isEditing"
              color="white"
              label="Product Category"
              v-model="form.prodcat"
            ></v-text-field>
            <v-text-field
              :disabled="!isEditing"
              color="white"
              label="Number of Employees"
              v-model="form.employees"
            ></v-text-field>

          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              :disabled="!isEditing"
              :loading="btnLoading"
              color="success"
              @click="save"
            >
              Save
            </v-btn>
          </v-card-actions>
          <v-snackbar
            v-model="hasSaved"
            color="success"
            :timeout="2000"
            absolute
            bottom
            left
          >
            Your profile has been updated
          </v-snackbar>
        </v-card>
      </v-flex>
    </v-layout>


    <v-dialog v-model="dialog" scrollable max-width="300px">
      <v-card>
        <v-card-title>Memberships</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 300px;">
          <div v-for="(membership, i) in user.memberships" :key="i">
            {{membership}}
          </div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn flat @click.native="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


  </v-container>
</template>

<script>
export default {
  head: {
    title: 'Personal Profile'
  },
  computed: {
    user: function () {
      return this.$store.state.user
    },
    form: function () {
      if (!this.user.name) {
        return
      }
      return {
        first: this.user.first,
        last: this.user.last,
        eventStatusGroup: 12,
        eventStatus: typeof this.user.user_event_status[0] === 'object' ? this.user.user_event_status[0].status_link : '',
        mobile: this.user.profile ? this.user.profile.mobile : '',
        location: this.user.location,
        zip: this.user.profile ? this.user.profile.zip : '',
        address: this.user.profile ? this.user.profile.address : '',
        about: this.user.profile ? this.user.profile.about : '',
        outward: this.user.profile ? this.user.profile.outward : '',
        compname: this.user.profile ? this.user.profile.compname : '',
        compaddress: this.user.profile ? this.user.profile.compaddress : '',
        compregnumb: this.user.profile ? this.user.profile.compregnumb : '',
        prodcat: this.user.profile ? this.user.profile.prodcat : '',
        employees: this.user.profile ? this.user.profile.employees : '',
        compposition: this.user.profile ? this.user.profile.compposition : ''
      }
    }
  },
  data () {
    return {
      dialog: false,
      hasSaved: false,
      isEditing: null,
      btnLoading: false,
      model: null,
      statusLevel: [],
      profileCompanyPositions: [
        {'name': 'founder', 'title': 'Founder'},
        {'name': 'ceo', 'title': 'CEO'},
        {'name': 'csuite', 'title': 'C-Suite'},
        {'name': 'vpmdsd', 'title': 'VP, MD or Senior Director'},
        {'name': 'ngo', 'title': 'NGO'},
        {'name': 'academic', 'title': 'Academic'},
        {'name': 'disrupter', 'title': 'Disrupter'},
        {'name': 'other', 'title': 'Other'}
      ]
    }
  },
  methods: {
    fetchStatusLevel () {
      this.$axios.get('/user/profileEvents/status/list').then(response => {
        this.statusLevel = response.data.data
      })
    },
    customFilter (item, queryText, itemText) {
      const textOne = item.name.toLowerCase()
      const searchText = queryText.toLowerCase()

      return textOne.indexOf(searchText) > -1
    },
    save () {
      this.btnLoading = true
      this.$axios.put('/user', this.form).then(response => {
        this.isEditing = !this.isEditing
        this.hasSaved = true
        this.btnLoading = false
        this.$store.dispatch('setUser')
      })
    }
  },
  created () {
    this.fetchStatusLevel()
  }
}
</script>

<style scoped>
  .small {
    font-size: 12px;
  }
  .margin-top {
    margin-top: 5px;
  }
</style>
