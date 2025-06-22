import api from "../../../api/api";

export async function signOut(userId: number) {
  try {
    const response = await api.post("/auth/signout", { userId });

    console.log("Sesión cerrada exitosamente", { response });

    return response;
  } catch (error) {}
}
