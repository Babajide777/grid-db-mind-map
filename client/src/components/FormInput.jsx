import React, { useState } from "react"
import { Box } from "@mui/material"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import { Details } from "./data"
import FormDetails from "./FormDetails"
import { useForm } from "react-hook-form"
import { useAddMapItemMutation } from "../store/Features/mapItem/mapItemApiSlice"
import { toast } from "react-toastify"

const FormInput = () => {
  const [addMapItem] = useAddMapItemMutation()
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const onSubmit = async data => {
    try {
      const { message } = await addMapItem({
        source: data.source,
        target: data.target,
        x: Number(data.positionX),
        y: Number(data.positionY),
        label: data.label
      }).unwrap()

      toast.success(`${message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      })

      reset()
    } catch (error) {
      let msg =
        error.message ||
        (error.data && error.data.message) ||
        "An error occurred"
      toast.error(`${msg}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      })
    }
  }
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        background: "white",
        height: { xs: "460px" },
        width: { xs: "70%", md: "20%" }
      }}
    >
      <Typography variant="h6">Enter a new idea</Typography>
      <Box
        component="form"
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{ width: "100%" }}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        {Details.map((item, i) => (
          <FormDetails
            key={i}
            {...item}
            register={register}
            errors={errors}
            errorParams={item.errorParams}
          />
        ))}
        <Button
          type="submit"
          variant="contained"
          color="success"
          sx={{
            width: "80%",
            py: "6px",
            mt: "20px",
            textTransform: "lowercase"
          }}
        >
          Continue
        </Button>
      </Box>
    </Box>
  )
}

export default FormInput
