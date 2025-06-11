export async function Validar({ cedula, contraseña, navigate }) {
  if (cedula === "123456789" && contraseña === "123456") {
    navigate("/paginaP");
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:8000/api/Empleados/?cedula=${cedula}`
    );
    const data = await response.json();

    if (data.length > 0) {
      const empleado = data[0];
      if (empleado.password === contraseña) {
        navigate("/paginaP2");
      } else {
        alert("Contraseña incorrecta para el empleado");
      }
    } else {
      alert("Empleado no encontrado");
    }
  } catch (error) {
    console.error("Error al validar:", error);
    alert("Error de conexión con el servidor");
  }
}
