import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import DeleteIcon from "@mui/icons-material/Delete";

import { Utility } from "../utility";
import API from "../../apis";
import Toast from "../toast/Toast";

const QueryForm = ({ customer_id, addQuery, setSubmitted }) => {
  const [questionType, setQuestionType] = useState("");
  const [description, setDescription] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [attachmentPreview, setAttachmentPreview] = useState(null);
  const toastInfo = useSelector((state) => state.toastInfo);
  const dispatch = useDispatch();

  const { toastAndNavigate } = Utility();

  const handleAttachmentChange = (e) => {
    const file = e.target.files[0];
    setAttachment(file);

    if (file && file.type.startsWith("image/")) {
      const previewUrl = URL.createObjectURL(file);
      setAttachmentPreview(previewUrl);
    } else {
      setAttachmentPreview(null);
    }
  };

  const handleAttachmentDelete = () => {
    setAttachment(null);
    setAttachmentPreview(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (questionType && description) {
      setQuestionType("");
      setDescription("");
      setAttachment(null);
      setAttachmentPreview(null);

      const data = {
        customer_id: customer_id,
        title: questionType,
        description: description,
      };

      createQuery(data);
    }
  };

  const createQuery = (data) => {
    API.QueryAPI.create(data)
      .then((res) => {
        if (res.status === 200) {
          addQuery(data);
          setSubmitted(true);
          toastAndNavigate(dispatch, true, "info", "Query Submitted");
        }
      })
      .catch((err) => {
        console.log("Error", err);
        toastAndNavigate(
          dispatch,
          true,
          "error",
          err ? err?.message : "An Error Occurred"
        );
      });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();         
      handleSubmit(e);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", p: 2 }}
    >
      <FormControl sx={{ mb: 2 }}>
        <InputLabel>Query Type</InputLabel>
        <Select
          value={questionType}
          onChange={(e) => setQuestionType(e.target.value)}
        >
          <MenuItem value={"general inquiry"}>General Inquiry</MenuItem>
          <MenuItem value={"technical support"}>Technical Support</MenuItem>
          <MenuItem value={"billing"}>Billing</MenuItem>
          <MenuItem value={"bank statement"}>Bank Statement</MenuItem>
          <MenuItem value={"repayment"}>Repayment</MenuItem>
          <MenuItem value={"foreclosure"}>Foreclosure</MenuItem>
          <MenuItem value={"disbursement"}>Disbursement</MenuItem>
          <MenuItem value={"restructuring"}>Restructuring</MenuItem>
          <MenuItem value={"grievance"}>Grievance</MenuItem>
        </Select>
      </FormControl>

      <Box sx={{ position: "relative", mb: 2 }}>
        <TextField
          variant="outlined"
          label="Description"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onKeyDown={handleKeyDown}
          fullWidth
        />
        <IconButton
          component="label"
          sx={{ position: "absolute", bottom: 8, right: 8 }}
        >
          <AttachFileIcon />
          <input type="file" hidden onChange={handleAttachmentChange} />
        </IconButton>
      </Box>

      {attachment && (
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Typography>{attachment.name}</Typography>
          {attachmentPreview && (
            <Box
              component="img"
              src={attachmentPreview}
              alt="Preview"
              sx={{ maxHeight: 100, maxWidth: 100, ml: 2, borderRadius: 2 }}
            />
          )}
          <IconButton onClick={handleAttachmentDelete} sx={{ ml: 2 }}>
            <DeleteIcon />
          </IconButton>
        </Box>
      )}

      <Button type="submit" variant="contained" color="primary" sx={{ mt: 1 }}>
        Submit
      </Button>
      <Toast
        alerting={toastInfo.toastAlert}
        severity={toastInfo.toastSeverity}
        message={toastInfo.toastMessage}
      />
    </Box>
  );
};

export default QueryForm;
