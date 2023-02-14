import React, { useState } from "react";
import "./TotalContacts.css";
import axios from "axios";
import Header from "./Header/Header";
import Functionalities from "./Functionalities/Functionalities";
import { useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { red, blue } from "@mui/material/colors";
import EditIcon from "@mui/icons-material/Edit";
import DeleteContactComfirmation from "../DeleteContactComfirmation";

const TotalContacts = (props) => {
  const [arr, setArr] = useState([]);
  const [checkedIds, setCheckedIds] = useState([]);
  const [deletefile, setDeletefile] = useState(false);

  const userId = JSON.parse(localStorage.getItem("userdetails"))._id;
  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let result = await axios.get(
      `https://contact-manager-seoe.onrender.com/allcontacts/${userId}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    setArr(result.data.contacts);
  };

  const ActionButtonDelete = (id) => {
    setCheckedIds([...checkedIds, id]);
    setDeletefile(true);
  };

  return (
    <div className="totalContact">
      <div>
        <Header />
        <Functionalities ids={checkedIds} checkids={setCheckedIds} rend={fetchData} />
      </div>

      <table className="table table-striped">
        <thead className="thead">
          <tr>
            <th scope="col">
         
              <input
                type="checkbox" />
            </th>
        
            <th scope="col">Name</th>
            <th scope="col">Designation</th>
            <th scope="col">Company</th>
            <th scope="col">Industry</th>
            <th scope="col">Email</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Country</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody className="tbody">
          {arr.map((data, key) => {
            return (
              <tr key={data._id}>
                <td>
                  <input type="checkbox" id={data._id} checked={data.select} />
                </td>
                <td>{data.name}</td>
                <td>{data.designation}</td>
                <td>{data.company}</td>
                <td>{data.industry}</td>

                <LightTooltip
                  placement="bottom"
                  title={data.email}
                  arrow
                  sx={{ "& .MuiTooltip-arrow": { color: "white" } }}
                >
                  <td className="email">{data.email}</td>
                </LightTooltip>
              
                <td>{data.phonenumber}</td>
                <td>{data.category}</td>
                <td>
                  <div className="tableaction">
                    <div className="table-row-edit">
                      <EditIcon sx={{ color: blue[400] }} />
                    </div>
                    <div>
                      <DeleteIcon
                        onClick={() => ActionButtonDelete(data._id)}
                        sx={{ color: red[400] }}
                      />
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TotalContacts;
