import { useEffect, useState } from "react";
import UserForm from "./userForm";
import UserList from "./userList";
import axios from "axios";

export default function UserBox() {
  const [contact, setContact] = useState([]);
  const [q, setQ] = useState("");

  const [searchParam] = useState(["name", "phone"]);

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

  //this is state to sort asc and desc
  const sortTypes = {
    up: {
      class: "fa-arrow-down-a-z",
      fn: (a, b) => a.name.localeCompare(b.name),
    },
    down: {
      class: "fa-arrow-up-z-a",
      fn: (a, b) => b.name.localeCompare(a.name),
    },
  };

  const [currenSort, setCurrentSort] = useState("up");

  const onSortChange = () => {
    let nexSort;

    if (currenSort === "down") nexSort = "up";
    else if (currenSort === "up") nexSort = "down";

    setCurrentSort(nexSort);
  };

  return (
    <div className="all">
      <UserForm
        add={addContact}
        q={q}
        setQ={setQ}
        sortTypes={sortTypes}
        currenSort={currenSort}
        onSortChange={onSortChange}
      />
      <UserList
        listPhone={contact}
        remove={deleteContact}
        update={updateContact}
        updateAvatar={updateAvatar}
        q={q}
        setQ={setQ}
        searchParam={searchParam}
        sortTypes={sortTypes}
        currenSort={currenSort}
      />
    </div>
  );
}
