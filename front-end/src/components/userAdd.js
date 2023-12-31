import { useNavigate } from "react-router-dom";

export default function UserAdd({ user, setUser, addContact, setPlus }) {
  const navigate = useNavigate();

  const submit = (event) => {
    event.preventDefault();
    addContact(user.name, user.phone);
    setUser({ name: "", phone: "" });
    setPlus(false);
    navigate("/");
  };

  return (
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
            <button
              type="button"
              className="btn"
              onClick={() => {
                navigate("/");
                setPlus(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
