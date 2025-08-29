import { useSearchParams } from "react-router-dom";
import Profile from "./Profile";

export default function Main() {
  const [searchParams, setSearchParams] = useSearchParams();
  const startApp = searchParams.get("tgWebAppStartParam");

  if (startApp?.startsWith("profile")) {
    return <Profile id={startApp.replace("profile", "")}></Profile>;
  }

  return "hello bioify!";
}
