<template>
  <v-layout justify-center pa-5>
    <v-flex xs12 sm12 md12>
      <v-tabs centered color="blue" v-model="active_tab" dark icons-and-text>
        <v-tabs-slider color="yellow"></v-tabs-slider>
        <v-tab>
          Send Email
          <v-icon>email</v-icon>
        </v-tab>
        <v-tab>
          View Logs
          <v-icon>receipt</v-icon>
        </v-tab>
        <v-tab-item>
          <v-card>
            <v-card-text>
              <v-form ref="form" v-model="valid">
                <v-combobox
                  v-model="from"
                  :rules="emailRules"
                  :items="fromList"
                  :return-object="false"
                  chips
                  item-value="email"
                  required
                  label="From"
                >
                  <template v-slot:selection="data">
                    <v-chip
                      :key="JSON.stringify(data.item)"
                      :selected="data.selected"
                      :disabled="data.disabled"
                      class="v-chip--select-multi"
                      @input="data.parent.selectItem(data.item)"
                      >{{ data.item }}</v-chip
                    >
                  </template>
                  <template v-slot:item="data">
                    <v-list-tile-content>
                      <v-list-tile-title
                        v-html="data.item.name"
                      ></v-list-tile-title>
                      <v-list-tile-sub-title
                        v-html="data.item.email"
                      ></v-list-tile-sub-title>
                    </v-list-tile-content>
                  </template>
                </v-combobox>
                <v-combobox
                  v-model="to"
                  :rules="emailRules"
                  :items="recepients"
                  :return-object="false"
                  label="To"
                  chips
                  item-value="email"
                  multiple
                  required
                >
                  <template v-slot:selection="data">
                    <v-chip
                      :key="JSON.stringify(data.item)"
                      :selected="data.selected"
                      :disabled="data.disabled"
                      class="v-chip--select-multi"
                      @input="data.parent.selectItem(data.item)"
                      >{{ data.item }}</v-chip
                    >
                  </template>
                  <template v-slot:item="data">
                    <v-list-tile-content>
                      <v-list-tile-title
                        v-html="data.item.name"
                      ></v-list-tile-title>
                      <v-list-tile-sub-title
                        v-html="data.item.affiliation"
                      ></v-list-tile-sub-title>
                    </v-list-tile-content>
                  </template>
                </v-combobox>
                <v-combobox
                  v-model="cc"
                  :rules="ccRules"
                  :items="recepients"
                  :return-object="false"
                  label="Cc"
                  chips
                  item-value="email"
                  multiple
                >
                  <template v-slot:selection="data">
                    <v-chip
                      :key="JSON.stringify(data.item)"
                      :selected="data.selected"
                      :disabled="data.disabled"
                      class="v-chip--select-multi"
                      @input="data.parent.selectItem(data.item)"
                      >{{ data.item }}</v-chip
                    >
                  </template>
                  <template v-slot:item="data">
                    <v-list-tile-content>
                      <v-list-tile-title
                        v-html="data.item.name"
                      ></v-list-tile-title>
                      <v-list-tile-sub-title
                        v-html="data.item.affiliation"
                      ></v-list-tile-sub-title>
                    </v-list-tile-content>
                  </template>
                </v-combobox>
                <v-combobox
                  v-model="bcc"
                  :rules="ccRules"
                  :items="recepients"
                  :return-object="false"
                  label="Bcc"
                  chips
                  item-value="email"
                  multiple
                >
                  <template v-slot:selection="data">
                    <v-chip
                      :key="JSON.stringify(data.item)"
                      :selected="data.selected"
                      :disabled="data.disabled"
                      class="v-chip--select-multi"
                      @input="data.parent.selectItem(data.item)"
                      >{{ data.item }}</v-chip
                    >
                  </template>
                  <template v-slot:item="data">
                    <v-list-tile-content>
                      <v-list-tile-title
                        v-html="data.item.name"
                      ></v-list-tile-title>
                      <v-list-tile-sub-title
                        v-html="data.item.affiliation"
                      ></v-list-tile-sub-title>
                    </v-list-tile-content>
                  </template>
                </v-combobox>
                <v-text-field
                  v-model="subject"
                  :rules="notEmptyRules"
                  label="Subject"
                  required
                ></v-text-field>
                <v-textarea
                  v-model="message"
                  :rules="notEmptyRules"
                  label="Message"
                  auto-grow
                  required
                ></v-textarea>
                <v-flex>
                  <v-checkbox
                    v-model="tracking"
                    label="Enable Tracking"
                  ></v-checkbox>
                </v-flex>
                <v-flex>
                  <v-checkbox
                    v-model="clicktracking"
                    label="Enable Click Tracking"
                  ></v-checkbox>
                </v-flex>
                <v-flex>
                  <v-checkbox
                    v-model="opentracking"
                    label="Enable Open Tracking"
                  ></v-checkbox>
                </v-flex>
                <v-btn
                  :disabled="dialog || success || fail"
                  :loading="dialog || success || fail"
                  @click="send"
                  >Send</v-btn
                >
                <v-dialog v-model="dialog" hide-overlay persistent width="300">
                  <v-card color="primary" dark>
                    <v-card-text>
                      Sending Email
                      <v-progress-linear
                        indeterminate
                        color="white"
                        class="mb-0"
                      ></v-progress-linear>
                    </v-card-text>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="success" hide-overlay persistent width="300">
                  <v-card color="green" dark>
                    <v-card-text>Email Sent Successfully</v-card-text>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="fail" hide-overlay persistent width="300">
                  <v-card color="red" dark>
                    <v-card-text>Unable To Send Email</v-card-text>
                  </v-card>
                </v-dialog>
              </v-form>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card>
            <v-list two-line>
              <template v-for="log in logs">
                <v-list-tile :key="log.id">
                  <v-list-tile-avatar>
                    <v-icon v-if="log.event == 'delivered'">done</v-icon>
                    <v-icon
                      v-if="log.event == 'opened' || log.event == 'clicked'"
                      >done_all</v-icon
                    >
                    <v-icon
                      v-if="log.event == 'failed' || log.event == 'rejected'"
                      >error</v-icon
                    >
                    <v-icon
                      v-if="
                        log.event == 'unsubscribed' || log.event == 'complained'
                      "
                      >highlight_off</v-icon
                    >
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title
                      v-html="log.message.headers.subject"
                    ></v-list-tile-title>
                    <v-list-tile-sub-title
                      v-html="log.recipient"
                    ></v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
              </template>
            </v-list>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-flex>
  </v-layout>
</template>

<script>
import { db } from "../firebase/init";
import firebase from "firebase/app";
import "@firebase/functions";
export default {
  name: "mailgunUI",
  data() {
    return {
      active_tab: 0,
      ccRules: [
        v => {
          if (v == null) {
            return true;
          } else {
            /^[\W]*([\w+\-.%]+@[\w\-.]+\.[A-Za-z]{2,4}[\W]*,{1}[\W]*)*([\w+\-.%]+@[\w\-.]+\.[A-Za-z]{2,4})[\W]*$/.test(
              v
            ) || "E-mail must be valid";
          }
        }
      ],
      emailRules: [
        v => !!v || "E-mail is required",
        v =>
          /^[\W]*([\w+\-.%]+@[\w\-.]+\.[A-Za-z]{2,4}[\W]*,{1}[\W]*)*([\w+\-.%]+@[\w\-.]+\.[A-Za-z]{2,4})[\W]*$/.test(
            v
          ) || "E-mail must be valid"
      ],
      notEmptyRules: [v => !!v || "Field is required"],
      success: false,
      toEmail: "",
      fail: false,
      dialog: false,
      tracking: false,
      clicktracking: false,
      opentracking: false,
      logs: null,
      valid: false,
      from: null,
      to: null,
      cc: null,
      bcc: null,
      subject: null,
      message: null,
      recepients: [],
      fromList: [{ name: "Contact", email: "contact@bostonhacks.io" }]
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    async send() {
      if (this.$refs.form.validate()) {
        this.toEmail = this.to.join();
        let message = {
          from: this.from,
          to: this.toEmail,
          subject: this.subject,
          text: this.message,
          tracking: this.tracking,
          clicktracking: this.clicktracking,
          opentracking: this.opentracking
        };
        this.dialog = true;
        firebase
          .functions()
          .httpsCallable("sendEmail")(message)
          .then(out => {
            if (out.data.message == "Queued. Thank you.") {
              this.dialog = false;
              this.success = true;
            } else {
              this.dialog = false;
              this.fail = true;
            }
          });
      }
    }
  },
  watch: {
    success(val) {
      if (!val) return;
      setTimeout(() => {
        this.success = false;
        this.$router.go();
      }, 2000);
    },
    fail(val) {
      if (!val) return;
      setTimeout(() => {
        this.fail = false;
        this.$router.go();
      }, 2000);
    }
  },
  mounted() {
    db.collection("users")
      .get()
      .then(docs => {
        docs.docs.forEach(doc => {
          this.recepients.push({
            name: doc.data().displayName,
            email: doc.data().email,
            affiliation: doc.data().companyName + ", " + doc.data().email
          });
        });
      });
    firebase
      .functions()
      .httpsCallable("getMailgunLogs")("getData")
      .then(data => {
        this.logs = data.data.items;
      });
  }
};
</script>
