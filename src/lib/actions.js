import { signOut } from "firebase/auth";
import { auth } from "./firebase";

export async function logout() {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    console.log("logout error", error);
    return false;
  }
}
