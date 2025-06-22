import api from "../../../api/api";

export async function signOut() {
  try {
    const response = await api.post("/auth/logout", { userId: 1 });

    console.log("Sesión cerrada exitosamente", { response });

    return response;
  } catch (error) {}
}
