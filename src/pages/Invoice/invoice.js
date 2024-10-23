"use client";
import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Stack,
  Card,
  CardHeader,
  Typography,
} from "@mui/material";
import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";

const EditUser = () => {
  const [message, setMessage] = useState([]);

  const form = useForm({
    defaultValues: {
      vendor_name: "",
      inv_no: "",
      invoice_date: "",
      inv_lines: [
        {
          item: "",
          price: "",
          quantity: "",
          amount: "",
          line_no: "",
        },
      ],
    },
  });

  const { register, handleSubmit, formState, control, reset } = form;

  const { errors, isSubmitSuccessful } = formState;

  const { fields, append, remove } = useFieldArray({
    name: "inv_lines",
    control,
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      setMessage("");
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit = async (formData) => {
    try {
      formData.inv_lines.forEach((line, index) => {
        line.line_no = index + 1;
      });

      const response = await axios.post("/api/invoiceApi", formData);
      setMessage("Data Added Successfully");
   
    } catch (error) {
      setMessage("Something went wrong");
      console.error("Error updating user details:", error);
    }
  };

  return (
    <>
      <Card elevation={3} sx={{ margin: 10, backgroundColor: "#f3f6f9" }}>
        <CardHeader
          title="Invoice"
          titleTypographyProps={{ variant: "subtitle2" }}
          sx={{
            backgroundColor: "rgba(74, 87, 169, 0.1)",
            color: "#46464E",
            padding: 1,
            marginBottom: 2,
          }}
        />
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <TextField
              label="VendorName"
              type="text"
              {...register("vendor_name", {
                required: "VendorName is Required",
              })}
              error={!!errors.vendor_name}
              helperText={errors.vendor_name?.message}
            />

            <TextField
              label="Invoice No"
              type="inv_no"
              {...register("inv_no", {
                required: "inv_no is Required",
              })}
              error={!!errors.inv_no}
              helperText={errors.inv_no?.message}
            />

            <TextField
              type="date"
              {...register("invoice_date", {
                required: "invoice_date is Required",
              })}
              error={!!errors.invoice_date}
              helperText={errors.invoice_date?.message}
            />

            {fields.map((field, index) => {
              return (
                <div className="form-control" key={field.id}>
                  <TextField
                    label="Item"
                    type="text"
                    {...register(`inv_lines[${index}].item`, {
                      required: "Item is Required",
                    })}
                    error={!!errors[`inv_lines[${index}].item`]}
                    helperText={errors[`inv_lines[${index}].item`]?.message}
                    sx={{ mr: 1 }}
                  />
                  <TextField
                    label="Price"
                    type="text"
                    {...register(`inv_lines[${index}].price`, {
                      required: "Price is Required",
                    })}
                    error={!!errors[`inv_lines[${index}].price`]}
                    helperText={errors[`inv_lines[${index}].price`]?.message}
                    sx={{ mr: 1 }}
                  />
                  <TextField
                    label="Quantity"
                    type="text"
                    {...register(`inv_lines[${index}].quantity`, {
                      required: "Quantity is Required",
                    })}
                    error={!!errors[`inv_lines[${index}].quantity`]}
                    helperText={errors[`inv_lines[${index}].quantity`]?.message}
                    sx={{ mr: 1 }}
                  />
                  <TextField
                    label="Amount"
                    type="text"
                    {...register(`inv_lines[${index}].amount`, {
                      required: "Amount is Required",
                    })}
                    error={!!errors[`inv_lines[${index}].amount`]}
                    helperText={errors[`inv_lines[${index}].amount`]?.message}
                    sx={{ mr: 1 }}
                  />
                  {index > 0 && (
                    <Button
                      type="button"
                      variant="contained"
                      color="primary"
                      onClick={() => remove(index)}
                      sx={{ ml: 5, mt: 1 }}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              );
            })}

            <Button
              type="button"
              variant="contained"
              color="primary"
              onClick={() => append({})}
            >
              Add Row
            </Button>

            <Button type="submit" variant="contained" color="primary">
              Save Changes
            </Button>
          </Stack>
        </form>
        <Typography
          variant="body2"
          align="center"
          pt={2}
          style={{ color: "green" }}
        >
          {message}
        </Typography>
      </Card>
    </>
  );
};

export default EditUser;
