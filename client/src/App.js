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
  const [dataSubmit, setDataSubmit] = useState("")
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const onSubmit = data => {
    // console.log(data)
    setDataSubmit(data)
    reset()
  }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box component="main" style={styles.mainContianer} display="flex">
        <MainMindMap dataSubmit={dataSubmit} />
        <FormInput
          onSubmit={onSubmit}
          register={register}
          errors={errors}
          handleSubmit={handleSubmit}
        />
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
