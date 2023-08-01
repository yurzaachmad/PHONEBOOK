import { useEffect, useState } from "react";
import UserForm from "./userForm";
import UserList from "./userList";
import axios from "axios";

export default function UserBox() {
  const [contact, setContact] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/phonebooks").then((response) => {
      if (response.data) setContact(response.data);
    });
  }, []);

  const addContact = (name, phone) => {
    const id = Date.now().toString();
    const avatar = null;
    setContact([{ id, name, phone, avatar }, ...contact]);
    axios
      .post("http://localhost:3001/api/phonebooks", { name, phone })
      .then((response) => {
        setContact((currentData) =>
          currentData.map((item) => {
            if (item.id === id) item.id = response.data.id;
            return item;
          })
        );
      });
  };

  const deleteContact = (id) => {
    axios
      .delete(`http://localhost:3001/api/phonebooks/${id}`)
      .then((response) => {
        setContact(contact.filter((item) => item.id !== id));
      });
  };

  const updateContact = (id, name, phone) => {
    axios
      .put(`http://localhost:3001/api/phonebooks/${id}`, { name, phone })
      .then((response) => {
        setContact((currentData) =>
          currentData.map((item) => {
            if (item.id === id) {
              item.name = response.data.name;
              item.phone = response.data.phone;
            }
            return item;
          })
        );
      })
      .catch(() => {
        alert("update gagal");
      });
  };

  const updateAvatar = (id, avatar) => {
    const formData = new FormData();
    formData.append("avatar", avatar);
    axios
      .put(`http://localhost:3001/api/phonebooks/${id}/avatar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setContact((currentData) =>
          currentData.map((item) => {
            if (item.id === id) {
              item.avatar = response.data.avatar;
            }
            return item;
          })
        );
      })
      .catch(() => {
        alert("update avatar gagal");
      });
  };

  return (
    <div className="all">
      <UserForm add={addContact} />
      <UserList
        listPhone={contact}
        remove={deleteContact}
        update={updateContact}
        updateAvatar={updateAvatar}
      />
    </div>
  );
}
