import Head from "next/head";
import * as e from "../components/errorpage_styles";
import React from "react";
import Lottie from 'react-lottie-player'
import lottieJson from '../public/json/error.json';

const ErrorPage = () => {

    return (
        <>  
            <Head>
                <title>Not Found · Feedback App</title>
            </Head>

            <e.SiteWrapper>
            <e.ContentWrapper>

                <e.Title>Die Seite konnte nicht gefunden werden.</e.Title>

                <e.Animation>
                    <Lottie
                    animationData={lottieJson}
                    play
                    style={{ width: 250, height: 200 }}
                    /> 
                </e.Animation>

                <e.Text>Möglicherweise ist die Meeting-ID falsch  
                oder es wurde noch kein Feedback abgegeben.</e.Text>

            </e.ContentWrapper>
            </e.SiteWrapper>
        </>
    )
};

export default ErrorPage;