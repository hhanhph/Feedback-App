import Head from "next/head";
import * as card from "../../../../components/question_styles";
import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
const qs = require("qs");
import Lottie from 'react-lottie-player'
import lottieJson from '../../../../public/json/feedback.json';

const QuestionStart = (props) => {
  const router = useRouter();

  const [name, setName] = React.useState(props.name);

  React.useEffect(() => {
    setName(props.name);
  }, [props.name]);

  const handleSubmit = () => {
    getName();

    axios
      .post("/api/feedback", {})
      .then(function (response) {
        console.log(response);
        localStorage.setItem("name", name);
        localStorage.setItem("meetingid", props.meetingid);
        localStorage.setItem("participantid", props.participantid);
        const href = {
          pathname: "/questions/[id]/[participantid]/1",
          query: { id: props.meetingid, participantid: props.participantid },
        };
        router.push(href);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getName = () => {
    if (document.getElementById("checkbox").checked) {
      setName("Anonym");
    } else {
      setName(props.name);
    }
  };

  return (
    <>
      <Head>
        <title>Feedback App</title>
      </Head>

      <card.Wrapper>
        <card.QuestionBox>

          <card.StartPageTitleWrapper>
            <card.BrandungLogo src="/images/logo.svg" />
            <card.StartPageSubtitle>Feedback App</card.StartPageSubtitle>
          </card.StartPageTitleWrapper>

          <card.StartContainer>
            <card.NameWrapper>
              <card.Name>Hallo {name}</card.Name>
            </card.NameWrapper>

            <card.AnimationWrapper>
              <Lottie
                  animationData={lottieJson}
                  play
                  style={{ width: 200, height: 200 }}
              />
            </card.AnimationWrapper>

            <card.CheckBoxWrapper>
              <div>
                <input
                  type="checkbox"
                  id="checkbox"
                  value="Anonym"
                  onChange={getName}
                />
                <p>anonym teilnehmen</p>
              </div>
            </card.CheckBoxWrapper>
          </card.StartContainer>

          <card.ButtonWrapper>
            <card.StartButton onClick={handleSubmit}>starten</card.StartButton>
          </card.ButtonWrapper>
        </card.QuestionBox>
      </card.Wrapper>
    </>
  );
};

export default QuestionStart;

export async function getServerSideProps(context) {

  const meetingid = context.params.id;
  const participantid = context.params.participantid;

  const TOKEN_ENDPOINT =
  "https://login.microsoftonline.com/1270dbb7-7731-44cb-8738-0969d20e2df4/oauth2/v2.0/token";
  const postData = {
    client_id: process.env.OAUTH_APP_ID,
    scope: "https://graph.microsoft.com/.default",
    client_secret: process.env.OAUTH_APP_SECRET,
    grant_type: "client_credentials",
  };

  axios.defaults.headers.post["Content-Type"] =
    "application/x-www-form-urlencoded";

  let token = "";

  const auth = await axios.post(TOKEN_ENDPOINT, qs.stringify(postData));
  token = auth.data.access_token;

    const userData = await axios.get(
    "https://graph.microsoft.com/v1.0/users/" + participantid,
    {
      headers: {
        Authorization: "Bearer " + token,
        "Content-type": "application/json",
        ConsistencyLevel: "eventual",
      },
    }
  );
  const name = userData.data.givenName;

  return {
    props: { 
      name: name, 
      meetingid: meetingid, 
      participantid: participantid },
  }
}