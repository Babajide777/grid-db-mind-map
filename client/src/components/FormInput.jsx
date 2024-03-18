import React from "react"
import { Box } from "@mui/material"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import { Details } from "./data"
import FormDetails from "./FormDetails"
import { useForm } from "react-hook-form"

const FormInput = ({ onSubmit, register, errors, handleSubmit }) => {
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
