import Head from 'next/head'
import Link from 'next/link'
import * as card from '../components/question_styles'
import React from 'react'
import axios from 'axios';
import { useRouter } from 'next/router'

const newMeeting = () => {

    const router = useRouter();

    // Set meetingName
    const [meetingName, setMeetingName] = React.useState("");
    const [meetingDate, setMeetingDate] = React.useState("");

    // Function to create date out of the input String
    const convertDate = () => {
        var date = meetingDate;
        var pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
        var result = new Date(date.replace(pattern,'$3-$2-$1')); 
        return result;
    };

    const createMeeting = () => {
        axios.post('/newMeeting', {
            meetingName: meetingName,
            meetingDate: convertDate()
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
          router.push('/questions/:id/:participantid/start');
    };

    return (
        <>  
            <Head>
                <title>Feedback App</title>
            </Head>

            <card.Wrapper>
            <card.QuestionBox>

            <card.TitleWrapper>
                    <card.Subtitle>Feedback App</card.Subtitle>
                </card.TitleWrapper>

                <card.QuestionWrapper>
                    <card.Question>Neues Meeting</card.Question>
                </card.QuestionWrapper>

                <card.ResponseWrapperVertical>
                    <card.InputLine placeholder="Meeting-Titel"
                      onChange={(event) => setMeetingName(event.target.value)} />
                    
                    <card.InputLine placeholder="Datum"
                      onChange={(event) => setMeetingDate(event.target.value)} />
                </card.ResponseWrapperVertical>

                <card.ButtonWrapper>

                    <card.StartButton form="form1" onClick={() => createMeeting()}>erstellen</card.StartButton>

                </card.ButtonWrapper>

            </card.QuestionBox>
            </card.Wrapper>
        </>
    )
};

export default newMeeting;