import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";

type SignUpInputs = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SignUp() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<SignUpInputs>();

  const password = watch("password");

  const navigate = useNavigate();
  const onSubmit: SubmitHandler<SignUpInputs> = (data) => {
    localStorage.setItem("token", "dummy token");
    setTimeout(() => navigate("/"), 1000);
  };
  return (
    <div className="container">
      <form
        className="login-form text-white w-50 p-5 mx-auto my-5 d-flex flex-column gap-4 rounded-4"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div>
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
          {errors.email && (
            <p className="text-danger">{errors.email.message}</p>
          )}
        </div>
        <div>
          <div className="position-relative">
            <LockIcon />
            <input
              id="password"
              className="form-control rounded-pill border-0 mb-2"
              placeholder="Password"
              type="password"
              {...register("password", {
                required: "please enter your password",
                minLength: {
                  value: 8,
                  message: "password must be at least 8 characters",
                },
              })}
            />
          </div>
          {errors.password && (
            <p className="text-danger">{errors.password.message}</p>
          )}
        </div>
        <div>
          <div className="position-relative">
            <LockIcon />
            <input
              id="confirmPassword"
              className="form-control rounded-pill border-0 mb-2"
              placeholder="Confirm Password"
              type="password"
              {...register("confirmPassword", {
                required: "please confirm your password",
                validate: (value) =>
                  value === password || "The passwords do not match",
              })}
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-danger">{errors.confirmPassword.message}</p>
          )}
        </div>
        <div className="mt-3">
          <button className="rounded-pill w-100 border-0 text-white py-2">
            SignUp
          </button>
          <Link className="text-center mt-3" to={"/login"}>
            Already have an account? Login
          </Link>
        </div>
      </form>
    </div>
  );
}
