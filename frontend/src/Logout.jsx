import api from "./api";

function Logout({ setAuth }) {
  const handleLogout = async () => {
    try {
      await api.post("logout/");
    } catch (err) {
      console.error(err);
    } finally {
      localStorage.removeItem("token");
      setAuth(false);
    }
  };

  return (
    <button className="btn btn-danger btn-sm" onClick={handleLogout}>
      Logout
    </button>
  );
}

export default Logout;