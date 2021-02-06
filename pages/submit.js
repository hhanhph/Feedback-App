import Head from 'next/head'
import * as card from '../components/question_styles'
import axios from 'axios'
import React, { useEffect, useRef } from 'react';
import Lottie from 'react-lottie-player'
import lottieJson from '../public/json/success.json';


const Submit = () => {

    const isInitialMount = useRef(true);

    useEffect(() => {
    if (isInitialMount.current) {
        isInitialMount.current = false;
        axios.post('/api/feedback', {
            meetingid: localStorage.getItem('meetingid'),
            name: localStorage.getItem('name'),
            emoticon: localStorage.getItem('emoticon'),
            attendance: localStorage.getItem('attendance'),
            preparation: localStorage.getItem('preparation'),
            comment: localStorage.getItem('comment'),
            finished: true
        })
        .then(function (response) {
          console.log(response);
          localStorage.clear();
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
        // Your useEffect code here to be run on update
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
                    <card.Subtitle>Feedback-App</card.Subtitle>
                </card.TitleWrapper>

                <card.QuestionWrapper>
                    <card.Question>Vielen Dank!</card.Question>
                </card.QuestionWrapper>

                <card.ResponseWrapperVertical>
                    <Lottie
                        loop={0}
                        animationData={lottieJson}
                        play={true}
                        style={{ width: 250, height: 250 }}
                    />
                </card.ResponseWrapperVertical>

                <card.ButtonWrapper>
                    <card.EndText>Dein Feedback wurde erfolgreich übermittelt.</card.EndText>
                </card.ButtonWrapper>

            </card.QuestionBox>
            </card.Wrapper>
        </>
    )
}

export default Submit;