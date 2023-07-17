import { useState, useEffect } from "react";
import { Avatar } from "antd";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../../context/auth";
import { Link, useNavigate } from "react-router-dom";

export default function ContactSeller({ ad }) {
  // context
  const [auth, setAuth] = useAuth();
  // state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  // hooks
  const navigate = useNavigate();
  const loggedIn = auth.user !== null && auth.token !== "";

  // auto complete
  useEffect(() => {
    if (auth?.user) {
      setName(auth.user?.name);
      setEmail(auth.user?.email);
      setPhone(auth.user?.phone);
    }
  }, [auth?.user]);

  const handleSubmit = async () => {
    if (auth.user === null && auth.token === "") {
      navigate("/login", {
        state: `/ad/${ad.slug}`,
      });
    }
    setLoading(true);
    try {
      // console.log(name, email, message, phone);
      const { data } = await axios.post("/contact-seller", {
        name,
        email,
        message,
        phone,
        adId: ad._id,
      });
      if (data?.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        toast.success("Thank you for your enquiry");
        setLoading(false);
        setMessage("");
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error("Something went wrong. Try again.");
    }
  };

  return (
    <div className="card shadow px-3 py-3">
      <div className="row">
        <div className="col-lg-8 offset-lg-2 mt-3">
            <div>
              <h4>Contact {ad.postedBy?.name ?? ad.postedBy?.username}</h4>
              <p>
                About {ad?.type} in {ad?.address} for {ad?.action} ${ad?.price}
              </p>
            </div>

            <textarea
              className="form-control mb-3"
              name="message"
              value={message}
              placeholder="✍️ Write description"
              onChange={(e) => setMessage(e.target.value)}
              disabled={!loggedIn}
            />

            <input
              name="name"
              type="text"
              className="form-control mb-3"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={!loggedIn}
              required
            />

            <input
              type="email"
              placeholder="Enter your email"
              className="form-control mb-3"
              value={email}
              onChange={(e) => setEmail(e.target.value?.toLowerCase())}
              disabled={!loggedIn}
              required
            />

            <input
              name="phone"
              type="text"
              className="form-control mb-3"
              placeholder="Enter your phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={!loggedIn}
            />

            <button
              className="btn btn-primary"
              disabled={!name || !email || loading}
              onClick={handleSubmit}
            >
              {loggedIn ? loading ? "Please wait.." : "Send enquiry" : "Login to send equiry"}
            </button>
        </div>
      </div>
    </div>
  );
}