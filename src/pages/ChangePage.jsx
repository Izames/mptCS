import {Header} from "../components/Header.jsx";
import {ChangeContent} from "../components/ChangeContent.jsx";


export const ChangePage = () => {
    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header/>
            <ChangeContent/>
            </div>
             </>
    )
}