import {Header} from "../components/Header.jsx";
import {PostContent} from "../components/PostContent.jsx"
import {ChangeContent} from "../components/ChangeContent.jsx"
import {CheckContent} from "../components/CheckContent.jsx"
import {Footer} from "../components/Footer.jsx";
export const PostPage = () => {
    return (
        <>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header/>
            <PostContent/>
            {/* <Footer style={{ marginTop: 'auto' }}/>  */}
        </div>
        </>
    )
}