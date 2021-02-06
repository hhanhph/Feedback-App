const axios = require("axios");
const config = require("../config");
const qs = require("qs");
const moment = require("moment");

module.exports = function callOutlook() {
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

  axios
    .post(TOKEN_ENDPOINT, qs.stringify(postData))
    .then((response) => {
      token = response.data.access_token;

      ////////////////////////////////////////////////
      let trackingId;
      let attendeesEmail;
      let hostEmail;
      let meetingId;
      let participantId;
      let getId =
        "https://graph.microsoft.com/v1.0/users?$filter=startsWith(displayName,%27Han%27)";
      let config = {
        headers: {
          Authorization: "Bearer " + token,
          "Content-type": "application/json",
          Prefer: 'outlook.timezone="Europe/Berlin"',
          ConsistencyLevel: "eventual",
        },
      };
      axios
        .get(getId, config)
        .then(function (res) {
          trackingId = res.data.value[0].id;
          //find today meeting
          var day_start = new Date();
          day_start.setHours(0, 0, 0, 0);
          let dayStartString = moment(day_start).format(
            "YYYY-MM-DD[T]HH:mm:ss"
          );
          console.log(dayStartString);
          var day_end = new Date();
          day_end.setHours(24, 0, 0, 0);
          let dayEndString = moment(day_end).format("YYYY-MM-DD[T]HH:mm:ss");
          console.log(dayEndString);
          axios
            .get(
              "https://graph.microsoft.com/v1.0/users/" +
                trackingId +
                "/calendarview?startdatetime=" +
                dayStartString +
                "%2B1&enddatetime=" +
                dayEndString +
                "%2B1",
              config
            )
            .then(function (res) {
              if (res.data.value.length > 0) {
                for (a = 0; a < res.data.value.length; a++) {
                  meetingId = res.data.value[a].id;
                  hostEmail = res.data.value[a].organizer.emailAddress.address;

                  //convert String to ISOString
                  let endTime = moment(res.data.value[a].end.dateTime);
                  let endTime2 = moment(res.data.value[a].end.dateTime);
                  let after5Min = endTime
                    .add(-55, "minutes")
                    .format("YYYY-MM-DD[T]HH:mm:ss");
                  let after1Day = endTime2
                    .add(1, "day")
                    .add(-60, "minutes")
                    .format("YYYY-MM-DD[T]HH:mm:ss");
                  console.log("Send to attendees at: " + after5Min);
                  console.log("Send to host at: " + after1Day);
                  for (i = 0; i < res.data.value[a].attendees.length; i++) {
                    attendeesEmail =
                      res.data.value[a].attendees[i].emailAddress.address;
                    axios
                      .get(
                        "https://graph.microsoft.com/v1.0/users/" +
                          attendeesEmail,
                        config
                      )
                      .then(function (res) {
                        participantId = res.data.id;
                        console.log(
                          "ParticipantID " +
                            participantId +
                            " meetingId" +
                            meetingId
                        );
                        //send mails to participants
                        let data = {
                          message: {
                            subject: "Feedback for your latest meeting !",
                            body: {
                              contentType: "HTML",
                              content:
                                '<!DOCTYPE html><html lang="de"><head>    <meta charset="UTF-8">    <meta name="viewport" content="width=device-width, initial-scale=1.0">    <style>        body, html {            height: 100%;        }        .contentBox {            margin: 0 auto;            max-width: 22em;            min-height: 30em;            border: 0.3em solid #524EF4;            border-radius: 2em;            background-color: white;        }        .contentWrapper {            margin-top: 3em;            width: 100%;        }        h1, h2, h3, .button, p {            font-family: "Arial", sans-serif;            text-align: center;        }        h1 {            font-size: 2em;            color: #524EF4;            height: 0.5em;            margin-top: 0em;            margin-bottom: 2em;        }        h2 {            font-size: 1.2em;            height: 0;            color: #524EF4;            margin-top: 2.5em;            margin-bottom: 1.5em;        }        h3 {            font-size: 1em;            color: black;            height: 0.5em;            margin-top: 1em;        }        p {            color: black;            line-height: 150%;            font-size: 1em;            margin-top: 3em;            margin-bottom: 2.5em;        }        .button {            display: block;             margin: 0 auto;            background-color: #524EF4;            color: white;            font-size: 1.1em;            font-weight: 300;            width: 11em;            border-radius: 2em;            border: 0;            padding: 0.8em;        }        a {            color: white;            text-decoration: none;        }    </style></head><body>    <div class="contentBox">        <div class="contentWrapper">            <h1>Feedback App</h1>            <h2>Meeting:</h2>            <h3>Teambesprechung</h3>                <h2>Datum:</h2>            <h3>01.01.2021</h3>            <p>Du kannst für dieses Meeting <br>Feedback abgeben.</p>                        <a href="http://localhost:3000/questions/' +
                                meetingId +
                                "/" +
                                participantId +
                                "/start" +
                                '">                <button class="button">Jetzt teilnehmen</button>            </a>        </div>     </div></body></html>',
                            },
                            toRecipients: [
                              {
                                emailAddress: {
                                  address: attendeesEmail,
                                },
                              },
                            ],
                            singleValueExtendedProperties: [
                              {
                                id: "SystemTime 0x3FEF",
                                value: after5Min,
                              },
                            ],
                          },
                          saveToSentItems: "false",
                        };
                        axios
                          .post(
                            "https://graph.microsoft.com/v1.0/users/" +
                              trackingId +
                              "/sendMail",
                            data,
                            config
                          )

                          .then(function (res) {
                            console.log(
                              "Success send mail to participants " +
                                attendeesEmail
                            );
                          })
                          .catch((error) => {
                            console.log("Could not send emails");
                            console.log(error);
                          });
                      })
                      .catch((error) => {
                        console.log("Could not get participant's id");
                        console.log(error);
                      });
                  }
                  //Send mail to host
                  let data2 = {
                    message: {
                      subject:
                        "Feedback App - Your latest meeting's evaluation",
                      body: {
                        contentType: "HTML",
                        content:
                          '<!DOCTYPE html><html lang="de"><head>    <meta charset="UTF-8">    <meta name="viewport" content="width=device-width, initial-scale=1.0">    <style>        body, html {            height: 100%;        }        .contentBox {            margin: 0 auto;            max-width: 22em;            min-height: 30em;            border: 0.3em solid #524EF4;            border-radius: 2em;            background-color: white;        }        .contentWrapper {            margin-top: 3em;            width: 100%;        }        h1, h2, h3, .button, p {            font-family: "Arial", sans-serif;            text-align: center;        }        h1 {            font-size: 2em;            color: #524EF4;            height: 0.5em;            margin-top: 0em;            margin-bottom: 2em;        }        h2 {            font-size: 1.2em;            height: 0;            color: #524EF4;            margin-top: 2.5em;            margin-bottom: 1.5em;        }        h3 {            font-size: 1em;            color: black;            height: 0.5em;            margin-top: 1em;        }        p {            color: black;            line-height: 150%;            font-size: 1em;            margin-top: 3em;            margin-bottom: 2.5em;        }        .button {            display: block;             margin: 0 auto;            background-color: #524EF4;            color: white;            font-size: 1.1em;            font-weight: 300;            width: 11em;            border-radius: 2em;            border: 0;            padding: 0.8em;        }        a {            color: white;            text-decoration: none;        }    </style></head><body>    <div class="contentBox">        <div class="contentWrapper">            <h1>Feedback App</h1>            <h2>Meeting:</h2>            <h3>Teambesprechung</h3>                <h2>Datum:</h2>            <h3>01.01.2021</h3>            <p>Die Auswertung für dieses<br>Meeting steht bereit.</p>                        <a href="http://localhost:3000/evaluation/' +
                          meetingId +
                          '">                <button class="button">Jetzt ansehen</button>            </a>        </div>     </div></body></html>',
                      },
                      toRecipients: [
                        {
                          emailAddress: {
                            address: hostEmail,
                          },
                        },
                      ],
                      singleValueExtendedProperties: [
                        {
                          id: "SystemTime 0x3FEF",
                          value: after1Day,
                        },
                      ],
                    },
                    saveToSentItems: "false",
                  };
                  axios
                    .post(
                      "https://graph.microsoft.com/v1.0/users/" +
                        trackingId +
                        "/sendMail",
                      data2,
                      config
                    )

                    .then(function (res) {
                      console.log("Success send mail to host " + hostEmail);
                    })
                    .catch((error) => {
                      console.log("Could not send emails to host");
                      console.log(error);
                    });
                }
              } else {
                console.log("There is no meeting today ");
              }
            })
            .catch((error) => {
              console.log("Could not get EVENT");
              console.log(error);
            });
        })
        .catch(function (error) {
          console.log(error);
        });
      ////////////////////////////////////////////////
    })
    .catch((error) => {
      console.log(error);
    });
};
