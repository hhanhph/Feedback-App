import Head from 'next/head'
import * as card from '../components/question_styles'
import styled from 'styled-components'
import axios from 'axios'
import React from 'react'
import { useRouter } from 'next/router'

export const QuestionContainer = styled.div`
    height: 50%;
    display: flex;
    flex-direction: column;
    border: 1px solid white;
    margin-bottom: 0.5em;
    padding: 1em;
`;

const TestAPI = () => {
	const router = useRouter();

    const [email, setEmail] = React.useState("");

    const handleEmailSubmit = () => {
        console.log(email);
        axios.get('/sendMail', {
            email: email
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
        });
    };

    const handleSubmit = () => {
		router.push('/getMeeting')  
    };

    return (
        <>  
            <Head>
                <title>API TEST</title>
            </Head>

            <card.Wrapper>
            <card.QuestionBox>

                <QuestionContainer>
                    <card.QuestionWrapper>
                        <card.Question>E-Mail-Test</card.Question>
                    </card.QuestionWrapper>

                    <card.ResponseWrapperVertical>
                        <card.InputLine placeholder="E-Mail-Adresse"
                         onChange={(event) => setEmail(event.target.value)} />
                        <card.StartButton onClick={handleEmailSubmit}>
                         E-Mail senden</card.StartButton>
                    </card.ResponseWrapperVertical>
                </QuestionContainer>

                <QuestionContainer>
                    <card.QuestionWrapper>
                        <card.Question>Meetings abrufen</card.Question>
                    </card.QuestionWrapper>

                    <card.ResponseWrapperVertical>
                        <card.StartButton onClick={handleSubmit}>Abrufen</card.StartButton>
                    </card.ResponseWrapperVertical>
                </QuestionContainer>

            </card.QuestionBox>
            </card.Wrapper>
        </>
    )
}

export default TestAPI;