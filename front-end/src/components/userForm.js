import { useState } from "react";

// views for add contact

const AddContact = ({ submit, user, setUser, clik }) => (
  <div className="input-group mb-8" id="search">
    <form className="formAdd" onSubmit={submit}>
      <div>
        <div className="mb-3">
          <div className="input-group">
            <span className="input-group-text" id="basic-addon3">
              Name
            </span>
            <input
              type="text"
              className="form-control"
              id="name"
              aria-describedby="basic-addon3 basic-addon4"
              name="name"
              value={user.name}
              onChange={(event) =>
                setUser({ ...user, name: event.target.value })
              }
            />
          </div>
        </div>
        <div className="mb-3">
          <div className="input-group">
            <span className="input-group-text" id="basic-addon3">
              Phone
            </span>
            <input
              type="text"
              className="form-control"
              id="phone"
              name="phone"
              aria-describedby="basic-addon3 basic-addon4"
              value={user.phone}
              onChange={(event) =>
                setUser({ ...user, phone: event.target.value })
              }
            />
          </div>
        </div>
        <div className="button">
          <button type="submit" className="btn">
            Save
          </button>
          <button type="button" className="btn" onClick={clik}>
            Cancel
          </button>
        </div>
      </div>
    </form>
  </div>
);

//views for search contact and sorting

const SearchContact = ({
  onClick,
  q,
  setQ,
  sortTypes,
  currenSort,
  onSortChange,
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
      <i className="fa-solid fa-user-plus" onClick={onClick}></i>
    </div>
  </div>
);

export default function UserForm({
  add,
  q,
  setQ,
  sortTypes,
  currenSort,
  onSortChange,
}) {
  const [user, setUser] = useState({ name: "", phone: "" });

  const submit = (event) => {
    event.preventDefault();
    add(user.name, user.phone);
    setUser({ name: "", phone: "" });
    clik();
  };

  // this code is for showing form to add contact
  const [plus, setPlus] = useState(false);
  const onClick = () => setPlus(true);
  const clik = () => setPlus(false);

  return (
    <div>
      {plus ? (
        <AddContact user={user} setUser={setUser} clik={clik} submit={submit} />
      ) : (
        <SearchContact
          onClick={onClick}
          q={q}
          setQ={setQ}
          onSortChange={onSortChange}
          currenSort={currenSort}
          sortTypes={sortTypes}
        />
      )}
    </div>
  );
}
