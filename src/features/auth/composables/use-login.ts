import { ref } from 'vue';

export default function useLogin() {
  const email = ref('');
  const password = ref('');
  const rememberMe = ref(false);

  const onSubmit = () => {
    console.log('Logging in', {
      email: email.value,
      password: password.value,
      rememberMe: rememberMe.value,
    });
  };

  return {
    email,
    password,
    rememberMe,
    onSubmit,
  };
}
