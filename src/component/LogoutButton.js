function LogoutButton({ setRole }) {

  const logout = async () => {
    await fetch("http://localhost:8090/api/auth/logout", {
      method: "POST",
      credentials: "include"
    });

    setRole(null); // Clear React role → send user to login page
  };

  return (
    <button onClick={logout}>
      Logout
    </button>
  );
}

export default LogoutButton;
