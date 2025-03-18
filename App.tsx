import NavigatorRoutes from "@/routes";
import "./src/styles/global.css";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <>
      <NavigatorRoutes />
      <StatusBar style="light" />
    </>
  );
}
