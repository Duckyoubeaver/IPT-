import { UserAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navigation = () => {
  const { user, logout } = UserAuth();

    function wait(milliseconds) {
        // To allow the user enough time to properly view the alert message.
        return new Promise((resolve) => setTimeout(resolve, milliseconds));
    }
    
    const logoutProcess = async () => {
        try {

            toast.success('Logout successful.', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

      await logout();
      await wait(5000);
    } catch (e) {
      toast.error(e.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log(e.message);
    }
  };

  return (
    <nav className="navbar">
      <ul className="left">
        <li>
          <a href="/">HOME</a>
        </li>
        <li>
          <a href="/about">ABOUT</a>
        </li>
        <li>
          <a href="/gallery">GALLERY</a>
        </li>
      </ul>
      <ul className="nav-links">
        {user ? (
          <>
            <li>
              <span className="nav-email">{user.email}</span>
            </li>
            <li>
              <a href="/vote" className="nav-button">
                VOTE
              </a>
            </li>
            <li>
              <a onClick={logoutProcess} className="nav-button">
                LOGOUT
              </a>
            </li>
          </>
        ) : (
          <>
            <li>
              <a href="/signin" className="nav-button">
                LOGIN
              </a>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
