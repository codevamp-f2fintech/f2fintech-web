import React, { useState } from "react";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import imageValidation from "./Validation";
import PreviewImage from "./PreviewImage";

const ImagePicker = ({
  preview,
  setPreview,
  deletedImage = [],
  setDeletedImage,
  multiple = false,
  label = "Upload Image",
}) => {
  const image = "image";
  const initialValues = { [image]: multiple ? [] : null };
  const [initialState, setInitialState] = useState(initialValues);

  const formik = useFormik({
    initialValues: initialState,
    enableReinitialize: true,
    onSubmit: () => watchForm(),
  });

  const removeImage = (index) => {
    const newImageFiles = [...formik.values[image]];
    newImageFiles.splice(index, 1);
    formik.setFieldValue(image, newImageFiles);
  };

  const showPicker = !formik.values[image]?.length || multiple;

  return (
    <Box>
      <form
        encType="multipart/form-data"
        style={{
          display: multiple || showPicker ? "block" : "none",
          
        }}
      >
        <TextField
        accept=".jpg, .gif, .png, .jpeg, .svg, .webp, application/pdf"
        name={image}
        label={label}
        size="small"
        onBlur={formik.handleBlur}
        InputProps={{
          multiple: multiple,
          startAdornment: (
            <IconButton component="label" sx={{ width: "100%", borderRadius: "0px" }}>
              <AddPhotoAlternateIcon />
              <input
                hidden
                type="file"
                multiple={multiple}
                name="file"
                onChange={(event) => {
                  const newFiles = Array.from(event.target.files);
                  if (multiple) {
                    formik.setFieldValue(image, [
                      ...(formik.values[image] || []),
                      ...newFiles,
                    ]);
                  } else {
                    formik.setFieldValue(image, newFiles);
                  }
                }}
              />
            </IconButton>
          ),
          sx: {
            "& .MuiInputBase-input": {
              padding: 0,
            },
          },
        }}
        sx={{
          outline: "none",
          "& .MuiInputBase-root": {
            padding: 0,
          },
        }}
      />
      </form>
      <PreviewImage
        deletedImage={deletedImage}
        setDeletedImage={setDeletedImage}
        formik={formik}
        imageFiles={formik.values[image]}
        preview={preview}
        setPreview={setPreview}
        removeImage={removeImage}
      />
      {formik.touched[image] && formik.errors[image] && (
        <Typography variant="body2" color="error" mb="10%">
          {formik.errors[image]}
        </Typography>
      )}
    </Box>
  );
};

ImagePicker.propTypes = {
  preview: PropTypes.array,
  setPreview: PropTypes.func,
  deletedImage: PropTypes.array,
  setDeletedImage: PropTypes.func,
  multiple: PropTypes.bool,
  label: PropTypes.string,
};

export default ImagePicker;
