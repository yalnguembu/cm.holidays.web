<template>
  <main class="p-5">
    <CardWrapper>
      <form @submit.prevent="send">
        <div class="md:text-center mb-8">
          <h1 class="font-bold text-2xl">FORGOT PASSWORD</h1>
          <p class="text-gray-500">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus
          </p>
        </div>
        <TextField
          v-model="email"
          type="text"
          name="email"
          label="Email"
          placeholder="Enter your email"
          :class="isEmailEmpty && 'border border-red-500'"
        >
          <Mail class="mt-3 w-6 h-6" />
        </TextField>
        <p
          class="text-red-600 mt-2 transition duration-500"
          v-show="isEmailEmpty"
        >
          This field is required
        </p>
        <Button title="SEND RESET LINK" type="submit" class="w-full  mt-8" />
      </form>
    </CardWrapper>
  </main>
</template>
<script>
import Mail from "../components/icons/MailIcon.vue";
import TextField from "../components/__TextField.vue";
import Button from "../components/BaseButton.vue";
import CardWrapper from "../components/CardWrapper.vue";

export default {
  name: "Forgot",
  data() {
    return {
      email: "",
      password: "",
      remember: false,
      isErrorMessageVisible: false,
      isEmailEmpty: false,
      isPasswordEmpty: false,
    };
  },
  methods: {
    checkEmail() {
      if (this.email.length > 0) this.isEmailEmpty = false;
      else this.isEmailEmpty = true;
    },
    isCrudentialsVaild() {
      this.checkEmail();
      if (this.isEmailEmpty ) {
        return false;
      }
      return true;
    },
    send() {
      const email = this.email;
      if (this.isCrudentialsVaild()) {
        // const users = JSON.parse(localStorage.getItem("users"));
        // const user = users.filter(
        //   (user) => user.email === email && user.password === password
        // );
        this.$router.push("/verify-mail");
        // if(user.length > 0) this.$router.push("/verify-mail");
        // else this.showCrundentialErrorMessage();
      }
    },
  },
  watch: {
    email() {
      this.checkEmail();
    },
  },
  components: {
    Mail,
    TextField,
    Button,
    CardWrapper,
  },
};
</script>

