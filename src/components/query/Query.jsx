import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Paper,
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";

const QueryForm = ({ addQuery }) => {
  const [questionType, setQuestionType] = useState("");
  const [description, setDescription] = useState("");
  const [attachment, setAttachment] = useState(null);

  const handleAttachmentChange = (e) => {
    setAttachment(e.target.files[0]);
  };

  const handleAttachmentDelete = () => {
    setAttachment(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (questionType && description) {
      addQuery({ questionType, description, attachment, responses: [] });
      setQuestionType("");
      setDescription("");
      setAttachment(null);
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
          <MenuItem value={"General Inquiry"}>General Inquiry</MenuItem>
          <MenuItem value={"Technical Support"}>Technical Support</MenuItem>
          <MenuItem value={"Billing"}>Billing</MenuItem>
          <MenuItem value={"Bank Statement"}>Bank Statement</MenuItem>
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
          <IconButton onClick={handleAttachmentDelete} sx={{ ml: 2 }}>
            <DeleteIcon />
          </IconButton>
        </Box>
      )}

      <Button type="submit" variant="contained" color="primary" sx={{ mt: 1 }}>
        Submit
      </Button>
    </Box>
  );
};

const ChatBox = ({ query, addResponse, setSelectedQuery }) => {
  const [response, setResponse] = useState("");

  const handleResponseSubmit = (e) => {
    e.preventDefault();
    if (response.trim()) {
      addResponse(query.id, response);
      setResponse("");
    }
  };

  return (
    <Box
      sx={{ p: 2, height: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => setSelectedQuery(null)}
        sx={{ mb: 2, display: "flex", justifyContent: "flex-start" }}
      >
        Back
      </Button>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {query.questionType}
      </Typography>
      <Typography sx={{ mb: 2 }}>{query.description}</Typography>
      {query.attachment && (
        <Box sx={{ mb: 2 }}>
          <Typography>Attached File: {query.attachment.name}</Typography>
        </Box>
      )}
      <List sx={{ maxHeight: "50vh", overflow: "auto", mb: 2 }}>
        <ListItem>
          <Paper
            sx={{
              p: 1,
              backgroundColor: "rgba(0, 0, 0, 0.08)",
              borderRadius: "4px",
              mb: 1,
              alignSelf: "flex-start",
            }}
          >
            <ListItemText primary={query.description} />
          </Paper>
        </ListItem>
        {query.responses.map((res, index) => (
          <ListItem key={index}>
            <Paper
              sx={{
                p: 1,
                backgroundColor:
                  index % 2 === 0
                    ? "rgba(200, 200, 200, 0.5)"
                    : "rgba(200, 255, 200, 0.5)",
                borderRadius: "4px",
                mb: 1,
                alignSelf: index % 2 === 0 ? "flex-start" : "flex-end",
              }}
            >
              <ListItemText primary={res} />
            </Paper>
          </ListItem>
        ))}
      </List>
      <Box
        component="form"
        onSubmit={handleResponseSubmit}
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <TextField
          variant="outlined"
          label="Your Response"
          multiline
          rows={4}
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" color="primary">
          Send
        </Button>
      </Box>
    </Box>
  );
};

const QueryList = ({ queries, setSelectedQuery }) => (
  <Box sx={{ p: 2 }}>
    <Typography>Select a query to view and respond</Typography>
    <List>
      {queries.map((query) => (
        <ListItem
          button
          key={query.id}
          onClick={() => setSelectedQuery(query)}
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.08)",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.15)",
            },
            mb: 1,
          }}
        >
          <ListItemText
            primary={query.questionType}
            sx={{ color: "blue", textDecoration: "underline" }}
          />
        </ListItem>
      ))}
    </List>
  </Box>
);

const Query = () => {
  const [queries, setQueries] = useState([]);
  const [selectedQuery, setSelectedQuery] = useState(null);

  useEffect(() => {
    if (selectedQuery) {
      const queryIndex = queries.findIndex((q) => q.id === selectedQuery.id);
      setSelectedQuery(queries[queryIndex]);
    }
  }, [queries]);

  const addQuery = (query) => {
    setQueries([...queries, { ...query, id: queries.length }]);
  };

  const addResponse = (queryId, response) => {
    setQueries(
      queries.map((q) =>
        q.id === queryId ? { ...q, responses: [...q.responses, response] } : q
      )
    );
  };

  return (
    <Container
      sx={{ height: "100vh", display: "flex", border: "1px solid lightgray" }}
    >
      <Box sx={{ width: "50%", borderRight: "1px solid lightgray" }}>
        <QueryForm addQuery={addQuery} />
      </Box>
      <Box sx={{ width: "50%", display: "flex", flexDirection: "column" }}>
        {selectedQuery ? (
          <ChatBox
            query={selectedQuery}
            addResponse={addResponse}
            setSelectedQuery={setSelectedQuery}
          />
        ) : (
          <QueryList queries={queries} setSelectedQuery={setSelectedQuery} />
        )}
      </Box>
    </Container>
  );
};

export default Query;
