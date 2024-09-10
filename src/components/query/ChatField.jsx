import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Divider,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { format, parseISO, isValid } from "date-fns";

import API from "../../apis";
import { Utility } from "../utility";

const LIMIT = 3;

const ChatField = ({
  queryDescription,
  queryResponses,
  responseCount,
  setSelectedQuery,
  selectedQueryId,
  getSelectedQueryResponse,
}) => {
  const listRef = useRef(null);
  const [response, setResponse] = useState("");

  const [offset, setOffset] = useState(1);
  const dispatch = useDispatch();

  const { toastAndNavigate } = Utility();

  const handleResponseSubmit = async (e) => {
    e.preventDefault();
    if (response.trim()) {
      try {
        const data = {
          query_id: selectedQueryId,
          response: response,
        };
        const res = await API.QueryResponseAPI.create(data);

        if (res.status === 200) {
          toastAndNavigate(dispatch, true, "info", "Response Submitted");
          setResponse("");
          getSelectedQueryResponse(selectedQueryId, 0, true);
        }
      } catch (error) {
        console.error("Failed to submit response:", error);
      }
    }
  };

  const handleViewMore = () => {
    getSelectedQueryResponse(selectedQueryId, offset); // 1
    setOffset(offset + 1); // 2
  };

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [queryResponses?.length]);

  // const renderQueryDescription = () => {
  //   if (queryDescription) {
  const groupMessagesByDate = (messages) => {
    if (!messages?.length) {
      return false;
    }
    const now = new Date();
    const formatCustomDate = (date) => {
      const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
      if (diffInDays < 1) return "Today";
      if (diffInDays === 1) return "Yesterday";
      if (diffInDays < 7) return `${diffInDays} days ago`;
      return format(date, "MMM d, yyyy");
    };

    return messages?.reduce((grouped, msg) => {
      const parsedDate = parseISO(msg.created_at);
      if (!isValid(parsedDate)) {
        console.error("Invalid date encountered:", msg.created_at);
        return grouped;
      }
      const formattedDate = formatCustomDate(parsedDate);
      if (!grouped[formattedDate]) grouped[formattedDate] = [];
      grouped[formattedDate].push(msg);
      return grouped;
    }, {});
  };

  console.log("chat queryResponsessss", queryResponses?.length);
  const groupedMessages = groupMessagesByDate(queryResponses);
  console.log("chat groupedMessages", groupedMessages);

  return (
    <Box sx={{ p: 1, display: "flex", flexDirection: "column", width: "100%" }}>
      <Box sx={{ display: "flex" }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => setSelectedQuery(null)}
          sx={{ alignSelf: "flex-start" }}
        >
          Back
        </Button>

        {responseCount > queryResponses?.length && (
          <Button
            onClick={handleViewMore}
            variant="contained"
            sx={{
              backgroundColor: "rgba(128, 128, 128, 0.5)",
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignSelf: "center",
              ml: 18,
              width: "auto",
              "&:hover": {
                backgroundColor: "rgba(128, 128, 128, 0.7)",
              },
            }}
          >
            View More
          </Button>
        )}
      </Box>

      <List
        ref={listRef}
        sx={{
          maxHeight: "35vh",
          overflowY: "auto",
          mb: 2,
        }}
      >
        <Typography sx={{fontWeight:"bolder"}}>{queryDescription}</Typography>

        {/* {renderQueryDescription()} */}
        {groupedMessages && Object.keys(groupedMessages).length ? (
          Object.entries(groupedMessages).map(([date, messages], index) => (
            <React.Fragment key={date}>
              <Divider textAlign="center" sx={{ mb: 1 }}>
                {date}
              </Divider>
              {messages.map((res, idx) => (
                <ListItem
                  key={idx}
                  sx={{
                    display: "flex",
                    justifyContent:
                      res.type === "user" ? "flex-start" : "flex-end",
                  }}
                >
                  <Paper
                    sx={{
                      p: 1,
                      backgroundColor:
                        res.type === "user"
                          ? "rgba(200, 200, 200, 0.5)" // Light gray for client messages
                          : "rgba(200, 255, 200, 0.5)", // Light green for supporter messages
                      borderRadius: 2,
                      maxWidth: "75%",
                    }}
                  >
                    <ListItemText primary={res.response} />
                  </Paper>
                </ListItem>
              ))}
            </React.Fragment>
          ))
        ) : (
          <ListItem>No messages to display</ListItem>
        )}
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
          onKeyPress={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleResponseSubmit(e);
            }
          }}
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" color="primary">
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default ChatField;
