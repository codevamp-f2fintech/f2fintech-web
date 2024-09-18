import React, { useEffect, useState } from "react";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import ChatField from "./ChatField"; // Import ChatField component
import API from "../../apis";

import { Utility } from "../utility";

let LIMIT = 3;

const QueryList = ({
  setSelectedQuery,
  submitted,
  setSubmitted,
  selectedQueryId,
  addResponse,
}) => {
  const [queries, setQueries] = useState([]);
  const [queryResponses, setQueryResponses] = useState([]);
  const [responseCount, setResponseCount] = useState(0);
  const [submitCount, setSubmitCount] = useState(0);

  const { getLocalStorage } = Utility();
  const customerId = getLocalStorage("customerInfo")?.id;

  useEffect(() => {
    if (submitted) {
      API.QueryAPI.get(10, 0, customerId)
        .then((res) => {
          console.log("res", res.data);
          setQueries(res.data.data);
          setSubmitted(false);
        })
        .catch((err) => {
          console.log("Error", err);
        });
    }
  }, [submitted]);

  const getSelectedQueryResponse = (query_id, page = 0, submit = false) => {
    console.log("submitCount", submitCount);
    let OFFSET;
    if (submit) {
      LIMIT = 1;
      setSubmitCount((prevCount) => prevCount + 1);
      OFFSET = 0;
    } else {
      LIMIT = 3;
      OFFSET = page * LIMIT + submitCount;
    }

    console.log("page", LIMIT, page, page * LIMIT, OFFSET);
    API.QueryResponseAPI.get(LIMIT, OFFSET, query_id).then((res) => {
      // console.log("query response", res);
      if (res.data.status === "Success") {
        setResponseCount(res.data.count);
        console.log("old RESPONSE", queryResponses);
        if (queryResponses[query_id] && !submit) {
          setQueryResponses((prevResponses) => ({
            ...prevResponses,
            [query_id]: [...res.data.data, ...queryResponses[query_id]],
          }));
        } else if (queryResponses[query_id] && submit) {
          setQueryResponses((prevResponses) => ({
            ...prevResponses,
            [query_id]: [...queryResponses[query_id], ...res.data.data],
          }));
        } else {
          setQueryResponses((prevResponses) => ({
            ...prevResponses,
            [query_id]: res.data.data,
          }));
        }
      }
    });
  };

  return (
    <Box sx={{ p: 2, mb: "10px" }}>
      {selectedQueryId ? (
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {queries
              .find((query) => query.id === selectedQueryId)
              ?.title.replace(/\b\w/g, (char) => char.toUpperCase())}
          </Typography>

          {/* Display the ChatField with responses for the selected query */}
          <ChatField
            queryDescription={
              queries.find((query) => query.id === selectedQueryId)?.description
            }
            queryAttachment={
              queries.find((query) => query.id === selectedQueryId)?.description
            }
            queryResponses={queryResponses[selectedQueryId]}
            responseCount={responseCount}
            getSelectedQueryResponse={getSelectedQueryResponse}
            setSelectedQuery={setSelectedQuery}
            selectedQueryId={selectedQueryId}
          />
        </Box>
      ) : (
        <Box>
          <Typography>Select a query to view and respond</Typography>
          <List>
            {queries.map((query) => (
              <ListItem
                key={query.id}
                button
                onClick={() => {
                  setSelectedQuery(query.id);
                  getSelectedQueryResponse(query.id);
                }}
                sx={{
                  backgroundColor: "rgba(0, 0, 0, 0.08)",
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.15)",
                  },
                  mb: 1,
                }}
              >
                <ListItemText
                  primary={query.title.replace(/\b\w/g, (char) =>
                    char.toUpperCase()
                  )}
                  sx={{ color: "black" }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
};

export default QueryList;
