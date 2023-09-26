import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function RedirectToDefaultPage() {
  const navigate = useNavigate();

  const { userInfo } = useSelector((state: { auth: any; }) => state.auth);

  if (userInfo) {
    navigate("/home");
  } else {
    navigate("/iniciosesion");
  }

  return null; // No se renderiza nada en esta función
}

export default RedirectToDefaultPage; // Exporta como valor predeterminado (default export)
