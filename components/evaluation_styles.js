import styled from 'styled-components'

// Start page

export const TitleWrapper = styled.div`
    width: 100%;
    margin-bottom: 2em;
`;

export const Subtitle = styled.h3`
    width: 100%;
    text-align: center;
    font-size: 0.875em;
    font-weight: 400;
    text-transform: uppercase;
    color: #FFF;
`;

export const Title = styled.h2`
    text-align: center;
    font-size: 1.4em;
    font-weight: 600;
    color: #FFF;
`;

// Detail view

export const SiteWrapper = styled.div`
    display: flex;
    justify-content: center;
    padding-top: 2em;
    width: 100vw;
    height: 100vh;
    background-color: #016EC4;
    overflow-y: scroll;
`;

export const ContentWrapper = styled.div`
    display: block;
    flex-direction: column;
    width: 19em;
    padding-top: 2em;
`;

// Elements

export const DetailHeadLine = styled.div`
    font-family: Roboto, sans-serif;
    font-weight: 600;
    font-size: 1.8em;
    text-align: center;
    color: #FFF;
    margin-bottom: 1.4em;
`;

export const DetailSubtitle = styled.h3`
    width: 100%;
    text-align: center;
    font-size: 0.8em;
    font-weight: 400;
    text-transform: uppercase;
    line-height: 0;
    color: #FFF;
`;

export const DetailTitle = styled.h2`
    text-align: center;
    font-size: 1em;
    font-weight: 600;
    color: #FFF;
`;

// Question Box

export const QuestionBox = styled.div`
    flex-direction: column;
    background-color: rgba(0,0,0,0.4);
    border-radius: 0.8em;
    padding: 1em;
    margin-bottom: 0.7em;
`;

export const DataArea = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const Results = styled.span`
    display: flex;
    flex-direction: column;
    width: 12em;
    min-height: 5.75em;
    margin-right: 3em;
    justify-content: center;
`;

export const PieChart = styled.span`
    display: block;
    width: 4.25em;
`;

// Container for using several elements in the same line
export const QuestionNumber = styled.span`
    color: #FFF;
    text-transform: uppercase;
    font-size: 0.7em;
`;

export const QuestionTitle = styled.h3`
    font-size: 0.9em;
    font-weight: 500;
    color: #FFF;
`;

export const HorizontalText = styled.div`
    width: 100%;
    height: 1.5em;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const Icon = styled.span`
    width: 2.25em;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const TotalVotes = styled.span`
    text-align: right;
    color: #FFF;
    text-transform: uppercase;
    font-style: italic;
    font-size: 0.7em;
    font-weight: 100;
`;

// For Votes

export const ReplyTitle = styled.span`
    max-width: 6.4em;
    font-size: 0.8em;
    color: ${props => (props.color)};
    font-weight: 400;
`;

export const ReplyVotes = styled.span`
    font-size: 0.7em;
    color: #FFF;
    font-weight: 100;
`;

// For comments:

export const CommentBox = styled.div`
    background-color: #FFF;
    border-radius: 0.8em;
    padding: 0.3em 0.8em;
    margin-top: 0.6em;
`;

export const CommentAuthor = styled.span`
    font-size: 0.7em;
    font-weight: 500;
`;

export const Comment = styled.p`
    font-size: 0.65em;
    font-weight: 200;
    line-height: 1.4em;
`;