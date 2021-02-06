import styled from 'styled-components'

export const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    min-height: 100vh;
    /* Safari height fix */
    min-height: -webkit-fill-available;

    /* desktop fix */
    @media only screen and (min-width: 700px) {
        height: 100vh;
    }
`;

export const QuestionBox = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 19em;
    height: 34.5em;
    background-color: #016EC4;
    border-radius: 1.5em;
    padding: 2em;
`;

// Wrapper

export const TitleWrapper = styled.div`
    order: 0;
    height: 1.1em;
`;

export const QuestionWrapper = styled.div`
    order: 1;
    max-width: 100%;
    max-height: 10em;
    margin: 1em 0 2em 0;
`;

export const ResponseWrapperVertical = styled.div`
    order: 2;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    flex-flow: wrap;
    align-items: center;
    justify-content: center;
    overflow-y: scroll;
`;

export const ResponseWrapperHorizontal = styled.div`
    order: 2;
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const ButtonWrapper = styled.div`
    order: 3;
    height: 2.2em;
    margin-top: 2em;
`;

// Elements

export const Subtitle = styled.div`
    text-align: center;
    font-size: 0.875em;
    font-weight: 400;
    text-transform: uppercase;
    color: #FFF;
`;

export const EndText = styled.div`
    text-align: center;
    font-size: 0.875em;
    font-weight: 400;
    color: #FFF;
`;

export const Question = styled.h1`
    font-family: Roboto, sans-serif;
    font-weight: 600;
    font-size: 2em;
    text-align: center;
    color: #FFF;
    margin: 0em;
`;

export const StartButton = styled.button`
    width: 100%;
    height: 2.2em;
    background-color: rgba(0,0,0,0.4);
    color: #FFF;
    font-size: 1em;
    text-align: center;
    border-radius: 20px;
    font-weight: 400;
    border: 0px;
    outline: none;

    &:hover {
        background-color: #FFF;
        color: #016EC4;
    }
`;

export const NextButton = styled.button`
    width: 50%;
    height: 2.2em;
    background-color: rgba(0,0,0,0.4);
    color: #FFF;
    font-size: 1em;
    text-align: center;
    border-radius: 20px;
    font-weight: 400;
    border: 0px;
    outline: none;

    &:hover {
        background-color: #FFF;
        color: #016EC4;
    }

    cursor: pointer;
`;

export const SkipButton = styled.button`
    width: 50%;
    height: 2.2em;
    background-color: rgba(0,0,0,0);
    color: #FFF;
    font-size: 1em;
    font-weight: 400;
    text-align: center;
    border: 0px;
    cursor: pointer;
    outline: none;
`;

export const VoteButton = styled.button`
    width: 100%;
    height: 2.75em; 
    border-radius: 20px;
    border: 0.1em solid #FFF;
    background-color: transparent;
    color: #FFF;
    font-size: 1em;
    outline: none;

    &:hover {
        background-color: #FFF;
        color: #016EC4;
    };

    input:checked + * {
        background-color: #FFF;
        color: #016EC4;
    }
`;

export const Form = styled.form`
    order: 2;
    width: 100%;
    height: 100%;
`;

export const Comment = styled.textarea`
    background-color: #FFF;
    border-radius: 1.5em;
    border: 0;
    padding: 1em;
    font-family: Roboto, sans-serif;
    font-weight: 300;
    font-size: 0.8em;
    line-height: 1.4em;
    width: 100%;
    height: 18em;
    overflow-y: scroll;
    outline: none;
    resize: none;
`;

export const InputLine = styled.input`
    background-color: #FFF;
    border-radius: 1.5em;
    border: 0;
    padding: 1em;
    font-family: Roboto, sans-serif;
    font-weight: 300;
    font-size: 0.8em;
    line-height: 1.4em;
    width: 100%;
    height: 2.7em;
    overflow: hidden;
`;

export const IconLabel = styled.label`
    height: 5em;
    color: white;
    
    input { 
        position: absolute;
        opacity: 0;
        width: 0;
        height: 0;
    }

    input {
        cursor: pointer;
    }

    &:hover {
        color: black;
    }

    input:checked + * {
        color: black;
    }
`;

export const VoteLabel = styled.label`
    width: 100%;
    
    input { 
        position: absolute;
        opacity: 0;
        width: 100%;
        height: 100%;
    }

    input + button {
        cursor: pointer;
    }

    input + button:hover {
        background-color: #FFF;
        color: #016EC4;
    }

    input:checked + button {
        background-color: #FFF;
        color: #016EC4;
    }
`;

// MeetingList

export const MeetingListWrapper = styled.div`
    order: 2;
    align-items: center;
    justify-content: center;
    overflow-y: scroll;
`;

export const MeetingListBox = styled.div`
    background-color: #FFF;
    width: 100%;
    height: 3.8em;
    border-radius: 1.5em;
    padding: 0.8em 1em;
    margin-bottom: 0.6em;
`;

export const MeetingListTitle = styled.div`
    color: #000;
    font-size: 0.9em;
    font-weight: 500;
`;

export const MeetingListDate = styled.div`
    color: #016EC4;
    font-size: 0.7em;
    font-weight: 500;
    margin-bottom: 0.4em;
`;

// only for start page
export const StartPageTitleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 5em;
    margin-bottom: 1em;
`;

export const StartPageSubtitle = styled.div`
    font-size: 0.875em;
    font-weight: 400;
    text-transform: uppercase;
    color: #FFF;
    margin-top: 1.5em;
`;

export const BrandungLogo = styled.img`
    height: 2.75em;
    width: 2.75em;
`;

export const StartContainer = styled.div`
    order: 2;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    flex-flow: wrap;
    align-items: center;
    justify-content: center;
`;

export const NameWrapper = styled.div`
    width: 100%;
    max-height: 4.75em;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const Name = styled.h1`
    font-family: Roboto, sans-serif;
    font-weight: 600;
    font-size: 2em;
    text-align: center;
    color: #FFF;
    margin: 0em;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const AnimationWrapper = styled.div`
    display: flex;
    justify-content: center;
    overflow-y: hidden;
`;

export const CheckBoxWrapper = styled.label`
    order: 2;
    flex-grow: 1;
    display: flex;
    align-items: flex-end;
    justify-content: center;

    div {
        display: inline-flex;
        height: 2.1em;
        align-items: center;
        padding-right: 0.3em;
        /* text not selectable */
        user-select: none;
    }  
    
    input[type='checkbox'] {
        appearance: none;
        width: 3em;
        height: 3em;
        border-radius: 3em;
        border: 0.3em solid #FFF;
        outline: none;
    }

    input[type='checkbox']:checked {
        background: no-repeat url(/images/check-bold.svg);
        background-size: 70%;
        background-position: center; 
        border-color: black;
        filter: invert();
        outline: none;
    }

    p {
        color: #FFF;
        padding-left: 0.4em;
        padding-bottom: 0.1em;
    }
`;