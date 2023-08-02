import UserItem from "./userItem";

export default function UserList({
  listPhone,
  remove,
  update,
  updateAvatar,
  q,
  searchParam,
  sortTypes,
  currenSort,
}) {
  const search = (listPhone) => {
    return listPhone.filter((item) => {
      return searchParam.some((newItem) => {
        return (
          item[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
        );
      });
    });
  };
  // console.log([...listPhone].sort(sortTypes[currenSort].fn), "ini");
  return (
    <div id="main">
      {search([...listPhone].sort(sortTypes[currenSort].fn)).map(
        (student, index) => (
          <UserItem
            key={student.id}
            student={student}
            no={index + 1}
            remove={() => remove(student.id)}
            update={update}
            updateAvatar={updateAvatar}
          />
        )
      )}
    </div>
  );
}
