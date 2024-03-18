import React from "react"
import { useForm } from "react-hook-form"
import { Typography, TextField, Box } from "@mui/material"

const FormDetails = ({ name, errors, register, errorParams }) => {
  return (
    <Box
      sx={{
        width: "80%",
        // py: "6px"
        display: "flex",
        flexDirection: "column"
      }}
    >
      <Typography variant="p" sx={{ fontSize: "12px" }}>
        {name}
      </Typography>
      <TextField
        id={name}
        type="text"
        name={name}
        size="small"
        sx={{
          "& .MuiOutlinedInput-input": {
            color: "#aaa",
            height: 10
          }
        }}
        {...register(name, errorParams)}
      />
      {errors && errors[name] && (
        <Typography
          variant="p"
          sx={{ color: "red", fontSize: "10px", mt: "10px" }}
        >
          {errors[name].message || `${name} field is invalid`}
        </Typography>
      )}
    </Box>
  )
}

export default FormDetails
