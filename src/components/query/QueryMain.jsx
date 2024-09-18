import React, { useState, useEffect } from "react";
import { Container, Box } from "@mui/material";
import ChatField from "./ChatField";
import QueryForm from "./QueryForm";
import QueryList from "./QueryList";
import { Utility } from "../utility";

const QueryMain = () => {
  const [queries, setQueries] = useState([]);
  const [selectedQueryId, setSelectedQueryId] = useState(null);

  const [submitted, setSubmitted] = useState(true);
  const { getLocalStorage } = Utility();
  const customerInfo = getLocalStorage("customerInfo");

  useEffect(() => {
    if (selectedQueryId !== null) {
      const queryIndex = queries.findIndex((q) => q.id === selectedQueryId);
      setSelectedQueryId(queries[queryIndex]?.id);
    }
  }, [queries]);

  const addQuery = (query) => {
    console.log("query in querymain", query);
    setQueries([
      ...queries,
      {
        ...query,
        id: queries.length,
        responses: [
          {
            response: query.description,
            type: "user",
            created_at: new Date().toISOString(),
          },
        ],
      },
    ]);
    setSubmitted(true);
  };

  const addResponse = (queryId, response) => {
    console.log("responses in queryMain", response);
    setQueries(
      queries.map((q) =>
        q.id === queryId ? { ...q, responses: [...q.responses, response] } : q
      )
    );
  };

  return (
    <Container
      sx={{
        height: "120vh",
        maxHeight: "100%",
        display: "flex",
        border: "1px solid lightgray",
        paddingBottom: "10px",
        marginBottom: "10px",
      }}
    >
      <Box sx={{ width: "50%", borderRight: "1px solid lightgray" }}>
        <QueryForm
          customer_id={customerInfo?.id}
          addQuery={addQuery}
          setSubmitted={setSubmitted}
        />
      </Box>
      <Box
        sx={{
          width: "50%",
          display: "flex",
          flexDirection: "column",
          mb: "10px",
        }}
      >
        <QueryList
          queries={queries}
          setSelectedQuery={setSelectedQueryId}
          submitted={submitted}
          setSubmitted={setSubmitted}
          selectedQueryId={selectedQueryId}
          addResponse={addResponse}
        />
      </Box>
    </Container>
  );
};

export default QueryMain;
