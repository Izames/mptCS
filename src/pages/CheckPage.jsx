import {Header} from "../components/Header.jsx";
import {CheckContent} from "../components/CheckContent.jsx";
import {Footer} from "../components/Footer.jsx";

export const CheckPage = () => {
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