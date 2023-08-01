import UserItem from "./userItem";

export default function UserList({ listPhone, remove, update, updateAvatar }) {
  return (
    <div id="main">
      {listPhone.map((student, index) => (
        <UserItem
          key={student.id}
          student={student}
          no={index + 1}
          remove={() => remove(student.id)}
          update={update}
          updateAvatar={updateAvatar}
        />
      ))}
    </div>
  );
}
