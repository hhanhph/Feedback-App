import Head from 'next/head'
import * as card from '../../../../components/question_styles'
import React, { useEffect, useRef } from 'react'
import Icon from '@mdi/react';
import axios from 'axios';
import { mdiCheckBold, mdiCloseThick } from '@mdi/js';
import { useRouter } from 'next/router'

const Attendance = () => {

    const router = useRouter();

    const [attendance, setAttendance] = React.useState("");

    const isInitialMount = useRef(true);

    useEffect(() => {
    if (isInitialMount.current) {
        isInitialMount.current = false;
    } else {
        // Your useEffect code here to be run on update
        axios.post('/api/feedback', {
          })
          .then(function (response) {
            console.log(response);
            localStorage.setItem('attendance', attendance);
            const href={
                pathname: '/questions/[id]/[participantid]/3',
                query: { id: localStorage.getItem('meetingid'), 
                participantid: localStorage.getItem('participantid') 
                },
            };
            router.push(href);
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    });
    
    return (
        <>  
        <Head>
            <title>Feedback App</title>
        </Head>

        <card.Wrapper>
        <card.QuestionBox>

        <card.TitleWrapper>
                <card.Subtitle>Frage 02</card.Subtitle>
            </card.TitleWrapper>

            <card.QuestionWrapper>
                <card.Question>War deine Anwesenheit notwendig?</card.Question>
            </card.QuestionWrapper>

                <card.ResponseWrapperHorizontal>
                
                    <card.IconLabel>
                        <input type="button" value="yes"
                        onClick={(event) => setAttendance(event.target.value)} />
                        <Icon path={mdiCheckBold} size="5em" />
                    </card.IconLabel>
                
                    <card.IconLabel>
                        <input type="button" value="no"
                        onClick={(event) => setAttendance(event.target.value)} />
                        <Icon path={mdiCloseThick} size="5em" />
                    </card.IconLabel>

                </card.ResponseWrapperHorizontal>

        </card.QuestionBox>
        </card.Wrapper>
    </>
    )
};

export default Attendance;