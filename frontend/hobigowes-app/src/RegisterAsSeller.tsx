import { useEffect, useState } from "react";
import Button from "./components/Button";
import "./Header.css";
import "./Login.css";
import "./index.css";
import "./RegisterAsSeller.css";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const RegisterAsSeller = () => {
  const [address, setAddress] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userID, setUserID] = useState<number | null>(null);

  useEffect(() => {
    const token = Cookies.get("token");
    if (typeof token === "string") {
      setIsAuthenticated(true);
      const payload: { role?: number; user_id?: number } = jwtDecode(token);
      if (payload.user_id) {
        setUserID(payload.user_id);
      }
    }
  }, [userID]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/becomeSeller", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address, user_id: userID }),
      });

      const data = await response.json();

      console.log("RESPONSE: ", response.status);
      console.log("MESSAGE: ", data.message);

      if (response.status == 201) {
        window.alert("You're now a seller");
        // Handle token storage and redirect if necessary

        var token = data.token;
        console.log(token.id);
        var expirationDate = new Date();
        expirationDate.setTime(expirationDate.getTime() + 1 * 60 * 60 * 1000); // 1 hour in milliseconds

        var cookieString = "token=" + token + "; expires=" + expirationDate.toUTCString() + "; path=/";

        document.cookie = cookieString;
        window.location.href = "/profile";
      } else {
        window.alert(data.message);
      }
    } catch (error) {
      window.alert("Failed to register as Seller");
    }
  };

  return (
    <div className="registerAsSeller">
      <section>
        <form action="" className="formRegisterAsSeller" onSubmit={handleSubmit}>
          <input type="text" name="address" id="address" placeholder="Address" onChange={(e) => setAddress(e.target.value)} required />
          <Button btnType="btn-register-as-seller" type="submit">
            Become Seller
          </Button>
        </form>
      </section>
    </div>
  );
};

export default RegisterAsSeller;
