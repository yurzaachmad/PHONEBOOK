import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  useNavigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import UserAdd from "./components/userAdd";
import UserBox from "./components/userBox";

const SearchContact = ({
  q,
  setQ,
  sortTypes,
  currenSort,
  onSortChange,
  navigate,
  setPlus,
}) => (
  <div className="input-group mb-8" id="search">
    <div id="icon" onClick={onSortChange}>
      <i className={`fa-solid ${sortTypes[currenSort].class}`}></i>
    </div>
    <div className="input-container">
      <i className="fa-solid fa-magnifying-glass" id="input-icon"></i>
      <input
        type="text"
        className="form-control"
        aria-describedby="basic-addon1"
        id="input-field"
        value={q}
        onChange={(e) => {
          setQ(e.target.value);
        }}
      />
    </div>
    <div id="icon">
      <i
        className="fa-solid fa-user-plus"
        onClick={() => {
          navigate("add");
          setPlus(true);
        }}
      ></i>
    </div>
  </div>
);

function Layout({
  q,
  setQ,
  sortTypes,
  currenSort,
  onSortChange,
  onClick,
  setPlus,
  plus,
}) {
  const navigate = useNavigate();

  return (
    <div className="all">
      {plus ? null : (
        <SearchContact
          onClick={onClick}
          q={q}
          setQ={setQ}
          onSortChange={onSortChange}
          currenSort={currenSort}
          sortTypes={sortTypes}
          navigate={navigate}
          setPlus={setPlus}
        />
      )}
      <Outlet />
    </div>
  );
}

function NotFound() {
  return <h1>Halaman tidak ditemukan</h1>;
}

function App() {
  const [contact, setContact] = useState([]);
  const [q, setQ] = useState("");
  const [user, setUser] = useState({ name: "", phone: "" });

  // this code is for showing form to add contact
  const [plus, setPlus] = useState(false);
  const onClick = () => setPlus(true);
  const clik = () => setPlus(false);

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
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout
              add={addContact}
              q={q}
              setQ={setQ}
              sortTypes={sortTypes}
              currenSort={currenSort}
              onSortChange={onSortChange}
              onClick={onClick}
              setPlus={setPlus}
              plus={plus}
            />
          }
        >
          <Route
            index
            element={
              <UserBox
                contact={contact}
                deleteContact={deleteContact}
                updateContact={updateContact}
                updateAvatar={updateAvatar}
                q={q}
                setQ={setQ}
                searchParam={searchParam}
                sortTypes={sortTypes}
                currenSort={currenSort}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
          <Route
            path="add"
            element={
              <UserAdd
                user={user}
                setUser={setUser}
                clik={clik}
                addContact={addContact}
                setPlus={setPlus}
              />
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
