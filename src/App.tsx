import {useState, useEffect} from "react";

  type User = {
  id: number;
  name: string;
  age: string;
  nickname: string;
};

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [nickname, setNickname] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(() => {

  const storedUsers = localStorage.getItem("users");

  return storedUsers
  ? (JSON.parse(storedUsers) as User[])
  : [];
  });

  const handleEditUser = () => {
    if (!editUser) return;

    setUsers(users.map((user) => (user.id === editingId ? editUser : user)));
    setEditingId(null);
    setEditUser(null);
  };
  const handleAddUser = () => {
    if (
      !name.trim() ||
      !age.trim() ||
      !nickname.trim()
    ) {
      return;
    }

    const newUser: User = {
      id: Date.now(),
      name,
      age,
      nickname,
    };  
    setUsers([...users, newUser]);

    setName("");
    setAge("");
    setNickname("");
  };

  const handleDeleteUser = (id: number) => {
  setUsers(users.filter((user) => user.id !== id));
  };
  useEffect(() => {
    localStorage.setItem(
      "users",
      JSON.stringify(users)
    );
  }, [users]);

  return (
    <div>
      <div>
        <input placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <input placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </div>
      <div>
        <input placeholder="Nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
      </div>
        <button onClick={handleAddUser}>
          Add
        </button>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Nickname</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  {editingId !== user.id ? (
                    user.name
                  ) : (
                    <input
                      placeholder="Edit Name"
                      value={editUser ? editUser.name : user.name}
                      onChange={(e) => {
                        if (!editUser) return;

                        setEditUser({
                          ...editUser,
                          name: e.target.value,
                        });
                      }}
                    />
                  )}
                </td>
                <td>
                  {editingId !== user.id ? (
                    user.age
                  ) : (
                    <input
                      placeholder="Edit Age"
                      value={editUser ? editUser.age : user.age}
                      onChange={(e) => {
                        if (!editUser) return;

                        setEditUser({
                          ...editUser,
                          age: e.target.value,
                        });
                      }}
                    />
                  )}
                </td>
                <td>
                  {editingId !== user.id ? (
                    user.nickname
                  ) : (
                    <input
                      placeholder="Edit Nickname"
                      value={editUser ? editUser.nickname : user.nickname}
                      onChange={(e) => {
                        if (!editUser) return;

                        setEditUser({
                          ...editUser,
                          nickname: e.target.value,
                        });
                      }}
                    />
                  )}
                </td>
                <td>
                  {editingId === user.id ? (
                    <button onClick={handleEditUser}>Save</button>
                  ) : null}
                  {editingId === user.id ? (
                    <button
                      onClick={() => {
                        setEditingId(null);
                        setEditUser(null);
                      }}
                    >
                      Cancel
                    </button>
                  ) : null}
                  {editingId !== user.id ? (
                    <button
                      onClick={() => {
                        setEditingId(user.id);
                        setEditUser(user);
                      }}
                    >
                      Edit
                    </button>

                  ) : null}
                  {editingId !== user.id ? (
                    <button
                      onClick={() => {
                        handleDeleteUser(user.id);
                      }}
                    >
                      Delete
                    </button>
                    
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
    
      
  )
}

export default App
