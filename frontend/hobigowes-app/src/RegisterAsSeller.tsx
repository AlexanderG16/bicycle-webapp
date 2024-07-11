import { useEffect, useState } from "react";
import Button from "./components/Button";
import "./Header.css";
import "./Login.css";
import "./index.css";
import "./RegisterAsSeller.css";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

function RegisterAsSeller() {
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
      const response = await fetch("https://localhost:5000/api/auth/becomeSeller", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address: address, user_id: userID }),
      });

      console.log("RESPONSE: ", response);
      console.log("MESSAGE: ", response.json);

      if (response.status == 201) {
        window.alert("You're now a seller");
        window.location.href = "/profile";
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
}

export default RegisterAsSeller;
