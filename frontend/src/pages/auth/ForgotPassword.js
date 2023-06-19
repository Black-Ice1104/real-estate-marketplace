// Manage the forgot-password process
// Let user enter the email address and send access link via email
import {useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {  Link, useNavigate } from "react-router-dom";

export default function Login() {
  // state
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // hooks
  const navigate = useNavigate();

  // when click submit, send data to backend
  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent from reloading the page
    try {
      setLoading(true);
      // console.log(email, password);
      const { data } = await axios.post(`/forgot-password`, {
        email,
      });
      console.log(data);
      if (data?.error) {
        toast.error(data?.error);
        setLoading(false);
      } else {
        toast.success("Please check your email for password reset link");
        setLoading(false);
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong. Try again.");
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="display-1 bg-primary text-light p-5">Forgot password</h1>

      <div className="container">
        <div className="row">
          <div className="col-md-4 offset-md-4 mt-5">
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Enter your email"
                className="form-control mb-4"
                value={email}
                onChange={(e) => setEmail(e.target.value.toLowerCase())}
                required
                autoFocus
              />

              <button disabled={loading} className="btn btn-primary col-12 mb-4">
                {/* show loading status on button */}
                {/* disabled={loading} would disable button if user click while loading, so that avoid sending email multiple times */}
                {loading ? "Waiting..." : "Submit"}
              </button>
            </form>

            <Link className="text-danger" to="/login">Back to Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}