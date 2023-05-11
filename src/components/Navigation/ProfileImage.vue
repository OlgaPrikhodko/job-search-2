<template>
  <img
    :src="imageLink"
    class="object-fit h-8 w-8 rounded-3xl"
    alt="User profile image"
  />
</template>

<script>
export default {
  name: "ProfileImage",
  data() {
    return {
      imageLink:
        "https://st2.depositphotos.com/4063385/6717/v/380/depositphotos_67174477-stock-illustration-cat-logo.jpg",
    };
  },
};
</script>
