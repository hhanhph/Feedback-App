import Head from 'next/head'
import * as card from '../../../../components/question_styles'
import React from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

const Comment = () => {

    const router = useRouter();

    const [comment, setComment] = React.useState("");
    
    // Get rid of empty comments
    function checkComment(currentComment) {
        if (currentComment != null) {
            var currentCheck = currentComment.replace(/\s/g, "");
            if (currentCheck == "") return true;
            else return false;
        }
    }

    const handleSubmit = () => {
        if (checkComment(comment)) {
            alert("Dein Kommentar scheint leer zu sein. Bitte klicke auf 'Überspringen' oder gebe einen Kommentar ein.")
        } else {
            axios.post('/api/feedback', { 
              })
              .then(function (response) {
                console.log(response);
                localStorage.setItem('comment', comment);
                nextPage();
              })
              .catch(function (error) {
                console.log(error);
            });
        }
    };

    const nextPage = () => {
        router.push('../../../submit');
    };
    
    return (
        <>  
            <Head>
                <title>Feedback App</title>
            </Head>

            <card.Wrapper>
            <card.QuestionBox>

            <card.TitleWrapper>
                    <card.Subtitle>Frage 04</card.Subtitle>
                </card.TitleWrapper>

                <card.QuestionWrapper>
                    <card.Question>Möchtest du sonst noch etwas sagen?</card.Question>
                </card.QuestionWrapper>

                <card.ResponseWrapperVertical>
                    <card.Comment placeholder="Hier tippen zum schreiben ..." 
                     onChange={(event) => setComment(event.target.value)} /> 
                </card.ResponseWrapperVertical>

                <card.ButtonWrapper>
                    <card.NextButton onClick={handleSubmit}>weiter</card.NextButton>
                    <card.SkipButton onClick={nextPage}>überspringen</card.SkipButton>
                </card.ButtonWrapper>

            </card.QuestionBox>
            </card.Wrapper>
        </>
    )
};

export default Comment;