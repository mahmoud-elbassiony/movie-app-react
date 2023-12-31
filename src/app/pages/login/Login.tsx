import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { SubmitHandler, useForm } from "react-hook-form";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";

type LoginInputs = {
  email: string;
  password: string;
};

export default function Login() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginInputs>();

  const navigate = useNavigate();
  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    localStorage.setItem("token", "dummy token");
    setTimeout(() => navigate("/"), 1000);
  };
  return (
    <div className="container form-container">
      <form
        className="login-form text-white p-5 mx-auto  d-flex flex-column gap-4 rounded-4"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div>
          {/* <label htmlFor="email" className="form-label">
            Email address
          </label> */}

          <div className="position-relative">
            <EmailIcon />
            <input
              id="email"
              className="form-control rounded-pill border-0 mb-2"
              type="email"
              placeholder="Email address"
              {...register("email", {
                required: "please enter your email",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "please enter a valid email",
                },
              })}
            />
          </div>

          <p className="text-danger">{errors.email && errors.email.message}</p>
        </div>
        <div>
          {/* <label htmlFor="password" className="form-label">
            Password
          </label> */}
          <div className="position-relative">
            <LockIcon />
            <input
              id="password"
              className="form-control rounded-pill border-0 mb-2"
              placeholder="Password"
              type="password"
              {...register("password", {
                required: "please enter your password",
              })}
            />
          </div>
          {
            <p className="text-danger">
              {errors.password && errors.password.message}
            </p>
          }
        </div>
        <div className="mt-3">
          <button className="rounded-pill w-100 border-0 text-white py-2">
            Login
          </button>
          <Link className="text-center mt-3" to={"/signUp"}>
            Don't have an account? SignUp
          </Link>
        </div>
      </form>
    </div>
  );
}
