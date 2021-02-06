import React from "react";
import axios from "axios";
import * as card from "../../components/question_styles";
import Head from "next/head";

function Meeting({ meetingName, _id }) {
  return (
    <>
      <Head>
        <title>Meeting Detail</title>
      </Head>
      <card.Wrapper>
        <card.QuestionBox>
          <card.TitleWrapper>
            <card.Subtitle>Meeting ID: {_id}</card.Subtitle>
          </card.TitleWrapper>

          <card.QuestionWrapper>
            <card.Question>{meetingName} Meeting</card.Question>
          </card.QuestionWrapper>
        </card.QuestionBox>
      </card.Wrapper>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const id = ctx.params.id;
  const meeting = await axios.get("https://bra-feedback-app.herokuapp.com/api/meeting/" + id);

  return {
    props: { ...meeting.data },
  };
}

export default Meeting;
