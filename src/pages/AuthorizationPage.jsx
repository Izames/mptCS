import {Header} from "../components/Header.jsx";
import {AuthContent} from "../components/AuthContent.jsx";
import {CheckContent} from "../components/CheckContent.jsx"
import {Footer} from "../components/Footer.jsx";

export const AuthorizationPage = () => {
    return (
        <>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header/>
            <CheckContent/>
            <Footer style={{ marginTop: 'auto' }}/> 
                </div>
        </>
    )
}