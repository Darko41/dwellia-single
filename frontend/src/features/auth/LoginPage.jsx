import { loginRequest } from "./services/authApi";
import { useAuth } from "./AuthContext";

export default function LoginPage() {
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await loginRequest({
      email: e.target.email.value,
      password: e.target.password.value,
    });

    login(res.token);
  };

  return (
    <form onSubmit={handleLogin}>
      <input name="email" placeholder="email" />
      <input name="password" type="password" placeholder="password" />
      <button>Login</button>
    </form>
  );
}