import React, { useState } from "react"
import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"
import { Box, CssBaseline, ThemeProvider } from "@mui/material"
import { useForm } from "react-hook-form"
import theme from "./config/theme"
import MainMindMap from "./components/MainMindMap"
import FormInput from "./components/FormInput"

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box component="main" style={styles.mainContianer} display="flex">
        <MainMindMap />
      </Box>
    </ThemeProvider>
  )
}

/** @type {import("@mui/material").SxProps} */
const styles = {
  mainContianer: {
    padding: 0,
    margin: 0,
    boxSizing: "border-box",
    backgroundColor: "#E5E5E5"
  }
}

export default App
