import React, { useEffect } from "react";
import { useState } from "react";
import "./Header.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function Header(props) {
  const [search, setSearch] = useState("");

  useEffect(() => {
    searchedEmail();
  }, [search]);

  const searchedEmail = async () => {
    try {
      const response = await fetch(
        `https://contact-manager-seoe.onrender.com/allcontacts/${userId}/${search}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const result = await response.json();
      if (!result.error) {
        props.setarr(result.contacts);
      } else {
        console.log(result.error);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="header">
      <div className="total-contact">
        <h4>Total Contacts</h4>
      </div>
  
      <div className="search-bar">
        <input
          className="search-by-email"
          type="text"
          value={search}
          placeholder="Search by Email Id....."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="header-user-admin">
        <div>
          <AccountCircleIcon sx={{ fontSize: 40 }} />
        </div>
        <div className="header-user-admin-name">
          <p className="name">Alam</p>
          <p className="admin">Super Admin</p>
        </div>
      </div>
    </div>
  );
}

export default Header;