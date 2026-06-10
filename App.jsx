import { useState } from "react"
import Site from "./Site.jsx"
import Admin from "./Admin.jsx"

export default function App() {
  const [mode, setMode] = useState("site")
  
  if (mode === "admin") {
    return <Admin onExit={() => setMode("site")} />
  }
  return <Site onAdmin={() => setMode("admin")} />
}
