import Head from 'next/head'
import * as card from '../../../../components/question_styles'
import React, { useEffect, useRef } from 'react'
import Icon from '@mdi/react';
import { mdiEmoticonHappyOutline, mdiEmoticonNeutralOutline, mdiEmoticonSadOutline } from '@mdi/js';
import axios from 'axios';
import { useRouter } from 'next/router'

const Emoticon = () => {

    const router = useRouter();

    const [emoticon, setEmoticon] = React.useState("");

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
            localStorage.setItem('emoticon', emoticon);
            const href={
                pathname: '/questions/[id]/[participantid]/2',
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
                    <card.Subtitle>Frage 01</card.Subtitle>
                </card.TitleWrapper>

                <card.QuestionWrapper>
                    <card.Question>Wie hat dir das Meeting gefallen?</card.Question>
                </card.QuestionWrapper>

                <card.ResponseWrapperHorizontal>
                    
                    <card.IconLabel>
                        <input type="button" value="good"
                        onClick={(event) => setEmoticon(event.target.value)} />
                        <Icon path={mdiEmoticonHappyOutline} size="5em" />
                    </card.IconLabel>
                
                    <card.IconLabel>
                        <input type="button" value="neutral"
                        onClick={(event) => setEmoticon(event.target.value)} />
                        <Icon path={mdiEmoticonNeutralOutline} size="5em" />
                    </card.IconLabel>

                    <card.IconLabel>
                        <input type="button" value="bad" 
                        onClick={(event) => setEmoticon(event.target.value)} />
                        <Icon path={mdiEmoticonSadOutline} size="5em" />
                    </card.IconLabel>   
        
                </card.ResponseWrapperHorizontal>

            </card.QuestionBox>
            </card.Wrapper>
        </>
    )
};

export default Emoticon;