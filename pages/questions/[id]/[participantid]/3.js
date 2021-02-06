import Head from 'next/head'
import * as card from '../../../../components/question_styles'
import React, { useEffect, useRef } from 'react'
import axios from 'axios';
import { useRouter } from 'next/router'

const Preparation = () => {

    const router = useRouter();

    const [preparation, setPreparation] = React.useState("");

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
            localStorage.setItem('preparation', preparation);
            const href={
                pathname: '/questions/[id]/[participantid]/4',
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
                    <card.Subtitle>Frage 03</card.Subtitle>
                </card.TitleWrapper>

                <card.QuestionWrapper>
                    <card.Question>Wie gut war das Meeting vorbereitet?</card.Question>
                </card.QuestionWrapper>

                <card.ResponseWrapperVertical>
                    <card.VoteButton value="1" onClick={(event) => setPreparation(event.target.value)} >
                        sehr gut
                    </card.VoteButton>

                    <card.VoteButton value="2" onClick={(event) => setPreparation(event.target.value)} >
                        gut
                    </card.VoteButton>

                    <card.VoteButton value="3" onClick={(event) => setPreparation(event.target.value)} >
                        schlecht
                    </card.VoteButton>

                    <card.VoteButton value="4" onClick={(event) => setPreparation(event.target.value)} >
                        sehr schlecht
                    </card.VoteButton>
                </card.ResponseWrapperVertical>

            </card.QuestionBox>
            </card.Wrapper>
        </>
    );
}

export default Preparation;