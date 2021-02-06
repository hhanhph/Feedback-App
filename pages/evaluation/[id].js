import Head from "next/head";
import * as e from "../../components/evaluation_styles";
import React from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import Icon from "@mdi/react";
import {
  mdiEmoticonHappyOutline,
  mdiEmoticonNeutralOutline,
  mdiEmoticonSadOutline,
  mdiCheckBold,
  mdiCloseThick,
} from "@mdi/js";

const EvaluationPage = ({ meetingName, meetingDate, participations }) => {
  const participationCount = participations.length;

  var emoticon = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  var attendance = {
    yes: 0,
    no: 0,
  };

  var preparation = {
    verygood: 0,
    good: 0,
    bad: 0,
    verybad: 0,
  };

  var comments = [];

  function getEvaluationData() {
    for (var participation of participations) {
      switch (participation.emoticon) {
        case "good":
          emoticon.good += 1;
          break;
        case "neutral":
          emoticon.neutral += 1;
          break;
        case "bad":
          emoticon.bad += 1;
          break;
      }

      switch (participation.attendance) {
        case "yes":
          attendance.yes += 1;
          break;
        case "no":
          attendance.no += 1;
          break;
      }

      switch (participation.preparation) {
        case 1:
          preparation.verygood += 1;
          break;
        case 2:
          preparation.good += 1;
          break;
        case 3:
          preparation.bad += 1;
          break;
        case 4:
          preparation.verybad += 1;
          break;
      }

      // Comments
      if (participation.comment != null) {
        comments.push(
          <e.CommentBox key={participation._id}>
            <e.CommentAuthor>{participation.name}</e.CommentAuthor>
            <e.Comment>{participation.comment}</e.Comment>
          </e.CommentBox>
        );
      }
    }
  }

  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [day, month, year].join(".");
  }

  getEvaluationData();

  const colors = {
    green: {
      area: "rgba(93, 187, 11, 0.6)",
      text: "rgba(93, 187, 11, 1.0)",
    },

    lightgreen: {
      area: "rgba(176, 204, 6, 0.6)",
      text: "rgba(176, 204, 6, 1.0)",
    },

    yellow: {
      area: "rgba(248, 203, 14, 0.6)",
      text: "rgba(248, 203, 14, 1.0)",
    },

    orange: {
      area: "rgba(246, 130, 7, 0.6)",
      text: "rgba(246, 130, 7, 1.0)",
    },

    red: {
      area: "rgba(215, 59, 37, 0.6)",
      text: "rgba(215, 59, 37, 1.0)",
    },
  };

  return (
    <>
      <Head>
        <title>Auswertung</title>
      </Head>

      <e.SiteWrapper>
        <e.ContentWrapper>
          <e.DetailHeadLine>Auswertung</e.DetailHeadLine>

          <e.TitleWrapper>
            <e.DetailSubtitle>Meeting:</e.DetailSubtitle>
            <e.DetailTitle>{meetingName}</e.DetailTitle>
          </e.TitleWrapper>

          <e.TitleWrapper>
            <e.DetailSubtitle>Datum:</e.DetailSubtitle>
            <e.DetailTitle>{formatDate(meetingDate)}</e.DetailTitle>
          </e.TitleWrapper>

          <e.TitleWrapper>
            <e.DetailSubtitle>Teilnehmer:</e.DetailSubtitle>
            <e.DetailTitle>{participationCount}</e.DetailTitle>
          </e.TitleWrapper>

          <e.QuestionBox>
            <e.HorizontalText>
              <e.QuestionNumber>Frage 01</e.QuestionNumber>
            </e.HorizontalText>

            <e.QuestionTitle>Wie hat dir das Meeting gefallen?</e.QuestionTitle>

            <e.DataArea>
              <e.Results>
                <e.HorizontalText>
                  <e.Icon>
                    <Icon
                      path={mdiEmoticonHappyOutline}
                      size="1.25em"
                      color={colors.green.text}
                    />
                  </e.Icon>
                  <e.HorizontalText>
                    <e.ReplyTitle color={colors.green.text}>gut</e.ReplyTitle>
                    <e.ReplyVotes>{emoticon.good} Votes</e.ReplyVotes>
                  </e.HorizontalText>
                </e.HorizontalText>

                <e.HorizontalText>
                  <e.Icon>
                    <Icon
                      path={mdiEmoticonNeutralOutline}
                      size="1.25em"
                      color={colors.yellow.text}
                    />
                  </e.Icon>
                  <e.HorizontalText>
                    <e.ReplyTitle color={colors.yellow.text}>
                      neutral
                    </e.ReplyTitle>
                    <e.ReplyVotes>{emoticon.neutral} Votes</e.ReplyVotes>
                  </e.HorizontalText>
                </e.HorizontalText>

                <e.HorizontalText>
                  <e.Icon>
                    <Icon
                      path={mdiEmoticonSadOutline}
                      size="1.25em"
                      color={colors.red.text}
                    />
                  </e.Icon>
                  <e.HorizontalText>
                    <e.ReplyTitle color={colors.red.text}>
                      schlecht
                    </e.ReplyTitle>
                    <e.ReplyVotes>{emoticon.bad} Votes</e.ReplyVotes>
                  </e.HorizontalText>
                </e.HorizontalText>
              </e.Results>

              <e.PieChart>
                <Pie
                  data={{
                    labels: ["gut", "neutral", "schlecht"],
                    datasets: [
                      {
                        data: [emoticon.good, emoticon.neutral, emoticon.bad],
                        backgroundColor: [
                          colors.green.area,
                          colors.yellow.area,
                          colors.red.area,
                        ],
                        borderColor: [
                          colors.green.text,
                          colors.yellow.text,
                          colors.red.text,
                        ],
                        borderWidth: 1,
                      },
                    ],
                  }}
                  height={65}
                  options={{
                    maintainAspectRatio: false,
                    legend: false,
                    tooltips: false,
                  }}
                />
              </e.PieChart>
            </e.DataArea>
          </e.QuestionBox>

          <e.QuestionBox>
            <e.HorizontalText>
              <e.QuestionNumber>Frage 02</e.QuestionNumber>
            </e.HorizontalText>

            <e.QuestionTitle>War deine Anwesenheit notwendig?</e.QuestionTitle>

            <e.DataArea>
              <e.Results>
                <e.HorizontalText>
                  <e.Icon>
                    <Icon
                      path={mdiCheckBold}
                      size="1.25em"
                      color={colors.green.text}
                    />
                  </e.Icon>
                  <e.HorizontalText>
                    <e.ReplyTitle color={colors.green.text}>Ja</e.ReplyTitle>
                    <e.ReplyVotes>{attendance.yes} Votes</e.ReplyVotes>
                  </e.HorizontalText>
                </e.HorizontalText>

                <e.HorizontalText>
                  <e.Icon>
                    <Icon
                      path={mdiCloseThick}
                      size="1.25em"
                      color={colors.red.text}
                    />
                  </e.Icon>
                  <e.HorizontalText>
                    <e.ReplyTitle color={colors.red.text}>Nein</e.ReplyTitle>
                    <e.ReplyVotes>{attendance.no} Votes</e.ReplyVotes>
                  </e.HorizontalText>
                </e.HorizontalText>
              </e.Results>

              <e.PieChart>
                <Pie
                  data={{
                    labels: ["ja", "nein"],
                    datasets: [
                      {
                        data: [attendance.yes, attendance.no],
                        backgroundColor: [colors.green.area, colors.red.area],
                        borderColor: [colors.green.text, colors.red.text],
                        borderWidth: 1,
                      },
                    ],
                  }}
                  height={65}
                  options={{
                    maintainAspectRatio: false,
                    legend: false,
                    tooltips: false,
                  }}
                />
              </e.PieChart>
            </e.DataArea>
          </e.QuestionBox>

          <e.QuestionBox>
            <e.HorizontalText>
              <e.QuestionNumber>Frage 03</e.QuestionNumber>
            </e.HorizontalText>

            <e.QuestionTitle>
              Wie gut war das Meeting vorbereitet?
            </e.QuestionTitle>

            <e.DataArea>
              <e.Results>
                <e.HorizontalText>
                  <e.ReplyTitle color={colors.green.text}>
                    sehr gut
                  </e.ReplyTitle>
                  <e.ReplyVotes>{preparation.verygood} Votes</e.ReplyVotes>
                </e.HorizontalText>

                <e.HorizontalText>
                  <e.ReplyTitle color={colors.lightgreen.text}>
                    gut
                  </e.ReplyTitle>
                  <e.ReplyVotes>{preparation.good} Votes</e.ReplyVotes>
                </e.HorizontalText>

                <e.HorizontalText>
                  <e.ReplyTitle color={colors.orange.text}>
                    schlecht
                  </e.ReplyTitle>
                  <e.ReplyVotes>{preparation.bad} Votes</e.ReplyVotes>
                </e.HorizontalText>

                <e.HorizontalText>
                  <e.ReplyTitle color={colors.red.text}>
                    sehr schlecht
                  </e.ReplyTitle>
                  <e.ReplyVotes>{preparation.verybad} Votes</e.ReplyVotes>
                </e.HorizontalText>
              </e.Results>

              <e.PieChart>
                <Pie
                  data={{
                    labels: ["sehr gut", "gut", "schlecht", "sehr schlecht"],
                    datasets: [
                      {
                        data: [
                          preparation.verygood,
                          preparation.good,
                          preparation.bad,
                          preparation.verybad,
                        ],
                        backgroundColor: [
                          colors.green.area,
                          colors.lightgreen.area,
                          colors.orange.area,
                          colors.red.area,
                        ],
                        borderColor: [
                          colors.green.text,
                          colors.lightgreen.text,
                          colors.orange.text,
                          colors.red.text,
                        ],
                        borderWidth: 1,
                      },
                    ],
                  }}
                  height={65}
                  options={{
                    maintainAspectRatio: false,
                    legend: false,
                    tooltips: false,
                  }}
                />
              </e.PieChart>
            </e.DataArea>
          </e.QuestionBox>

          <e.QuestionBox>
            <e.HorizontalText>
              <e.QuestionNumber>Frage 04</e.QuestionNumber>
              <e.TotalVotes>{comments.length} Kommentare</e.TotalVotes>
            </e.HorizontalText>

            <e.QuestionTitle>Möchtest du sonst noch was sagen?</e.QuestionTitle>

            {comments}
          </e.QuestionBox>
        </e.ContentWrapper>
      </e.SiteWrapper>
    </>
  );
};

export default EvaluationPage;

export async function getServerSideProps(ctx) {
  const id = ctx.params.id;
  const res = ctx.params.res;
  if (res === undefined) {
    console.log("There is no feedback");
    return {
      notFound: true,
    };
  }
  const meeting = await axios.get("http://localhost:3000/api/meeting/" + id);

  return {
    props: { ...meeting.data },
  };
}
