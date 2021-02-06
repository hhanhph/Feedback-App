import styled from "styled-components"

export const ProfileText = styled.div`
    width: 600px;
    margin: 0 auto 0 auto;
    margin-bottom: 2.5em;
    font-size: 1.3em;
    line-height: 0.9em;
    font-weight: 300;
    text-align: center;
    a {
        color: #e7c86d;
    };
    b {
        font-weight: 400;
    };
    br {
        display: block;
        margin: 1.5em 0;
    }
`;

export const Wrapper = styled.div`
    display: block;
    margin: 150px auto 0 auto;
    width: 600px;
`;

export const ProfilePic = styled.img`
    width: 175px;
    height: 175px;
    display: block;
    margin: 0 auto;
`;

export const ProfileName = styled.h1`
    margin-top: 1.3em;
    margin-bottom: 1.3em;
    color: #f3dd96;
    font-size: 2em;
    text-align: center;
`;

export const Profile = (
    {picture, name}
) => {
    return (
        <>
            <Wrapper>
                <ProfilePic src={picture} alt="Profile Picture" />
                <ProfileName>{name}</ProfileName>
            </Wrapper>
        </>
    )
}