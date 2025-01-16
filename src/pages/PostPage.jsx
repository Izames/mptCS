import {Header} from "../components/Header.jsx";
import {PostContent} from "../components/PostContent.jsx";


export const PostPage = () => {
    return (
        <>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header/>
            <PostContent/>
        </div>
        </>
    )
}