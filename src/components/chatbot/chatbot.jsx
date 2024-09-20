import React, { Component } from "react";
// import { Launcher } from "react-chat-window";

class Chatbot extends Component {
    constructor() {
        super();
        this.state = {
            messageList: [],
        };
    }

    _onMessageWasSent(message) {
        this.setState({
            messageList: [...this.state.messageList, message],
        });
    }

    _sendMessage(text) {
        if (text.length > 0) {
            this.setState({
                messageList: [
                    ...this.state.messageList,
                    {
                        author: "them",
                        type: "text",
                        data: { text },
                    },
                ],
            });
        }
    }

    render() {
        return (
            <div>
                {/* <Launcher
          agentProfile={{
            teamName: "react-chat-window",
            imageUrl:
              "https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png",
          }}
          onMessageWasSent={this._onMessageWasSent.bind(this)}
          messageList={this.state.messageList}
          showEmoji
        /> */}
            </div>
        );
    }
}
export default Chatbot;

// import { Box, Container, Typography } from "@mui/material";
// import React from "react";

// const chatbot = () => {
//   return (
//     <>
//       <Container
//         sx={{ border: "1px solid red", height: "100vh", maxHeight: "100%" }}
//       >
//         <Box>
//           <Typography>chatbot</Typography>
//         </Box>
//       </Container>
//     </>
//   );
// };

// export default chatbot;
