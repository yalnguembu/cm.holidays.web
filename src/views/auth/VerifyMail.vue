<template>
  <main class="p-5">
    <CardWrapper>
      <form @submit.prevent="send">
        <div class="md:text-center mb-8">
          <h1 class="font-bold text-2xl">VERIFY MAIL</h1>
          <p class="text-gray-500">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus
          </p>
        </div>
        <div class="grid grid-cols-4 gap-4">
          <DigitInput v-model="digits.first" name="first" ref="firstInput" />
          <DigitInput v-model="digits.second" name="second" ref="secondInput" />
          <DigitInput v-model="digits.third" name="third" ref="thirdInput" />
          <DigitInput v-model="digits.forth" name="forth" ref="forthInput" />
        </div>
        <Button title="CONTINUE" type="submit" class="w-full mt-8" />
      </form>
    </CardWrapper>
  </main>
</template>

<script>
import Mail from "../components/icons/MailIcon.vue";
import DigitInput from "../components/__DigitInput.vue";
import Button from "../components/BaseButton.vue";
import CardWrapper from "../components/CardWrapper.vue";
const refs = [ "firstInput", "secondInput", "thirdInput", "forthInput" ];
export default {
  name: "VerifyMail",
  data() {
    return {
      digits: {
        first: "",
        second: "",
        third: "",
        forth: "",
      },
      isErrorMessageVisible: false,
    };
  },
  mounted() {
    this.$refs.firstInput.$el.focus();
  },
  methods: {
    isCrudentialsVaild() {},
    send() {
      // const email = this.email;
      // if (this.isCrudentialsVaild()) {
      // const users = JSON.parse(localStorage.getItem("users"));
      // const user = users.filter(
      //   (user) => user.email === email && user.password === password
      // );
      // if(user.length > 0) this.$router.push("/");
      // else this.showCrundentialErrorMessage();
      // }
    },
  },
  components: {
    Mail,
    DigitInput,
    Button,
    CardWrapper,
  },
};
</script>
