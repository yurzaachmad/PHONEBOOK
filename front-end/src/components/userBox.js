import UserList from "./userList";

export default function UserBox({
  contact,
  deleteContact,
  updateContact,
  updateAvatar,
  q,
  setQ,
  searchParam,
  sortTypes,
  currenSort,
}) {
  return (
    <div>
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
