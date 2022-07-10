import React from "react";
import { Alert, Confirm } from "react-st-modal";
import useAllUsers from "../../hooks/useAllUsers";
import useUserInfo from "../../hooks/useUserInfo";
import Loading from "../../Shared/Loading";
import "../NestedRoutes.css";

const ManageUsers = () => {
  const { userInfo, loading } = useUserInfo();
  const { users } = useAllUsers();
  const handleMakeAdmin = ({ user }) => {
    const role = "Admin";
    const name = user?.profileName ? user?.profileName : user?.primaryName;
    const warning = `${name} will have access to important pages!`;
    const confirmation = `You added ${name} as an admin`;
    const updatedUser = { ...user, role, warning, confirmation };
    handleAdmin({ updatedUser });
  };
  const handleRemoveAdmin = ({ user }) => {
    const name = user?.profileName ? user?.profileName : user?.primaryName;

    const role = null;
    const warning = `${name} will loss access to important pages!`;
    const confirmation = `You removed ${name} as an admin`;
    const updatedUser = { ...user, role, warning, confirmation };

    handleAdmin({ updatedUser });
  };

  const handleAdmin = async ({ updatedUser }) => {
    const email = updatedUser?.email;
    const role = updatedUser?.role;

    const isConfirm = await Confirm(`${updatedUser.warning}`, "Are you sure?");

    if (isConfirm) {
      fetch(`http://localhost:5000/handleAdmin/${email}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ role }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.acknowledged) {
            Alert(`${updatedUser.confirmation}`, "done!");
          }
        });
    }
  };
  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <>
      <h1 className="text-center my-5 text-primary text-4xl">Manage Users</h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th className="text-center">Name</th>
              <th className="text-center">Email</th>
              <th className="text-center">Role</th>
              <th className="text-center">Make Admin</th>
              <th className="text-center">Remove Admin</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user?._id}>
                <td>
                  {user?.profileName ? user?.profileName : user?.primaryName}
                </td>
                <td>{user?.email}</td>
                <td>{user?.role ? user.role : "Member"}</td>
                <td className="text-center">
                  <button
                    onClick={() => handleMakeAdmin({ user })}
                    disabled={user?.role}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke={user?.role ? "whiteSmoke" : "green"}
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                      />
                    </svg>
                  </button>
                </td>
                <td className="text-center">
                  <button
                    onClick={() => handleRemoveAdmin({ user })}
                    disabled={!user?.role}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke={!user?.role ? "whiteSmoke" : "red"}
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 7a4 4 0 11-8 0 4 4 0 018 0zM9 14a6 6 0 00-6 6v1h12v-1a6 6 0 00-6-6zM21 12h-6"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ManageUsers;
