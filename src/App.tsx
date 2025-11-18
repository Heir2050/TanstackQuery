import './App.css'
import Posts from './components/Posts'
import { useState } from 'react'
import PostsById from './components/PostsById'

// useQuery is used to fetching data from the server
//useMutation is used to mutate(to manipulate) data on the server



function App() {

    const [isMounted, setMounted] = useState(false)

    return(

        <>
            <button onClick={() => setMounted((prev) => !prev)}>Toggle Posts</button>

            {isMounted && <Posts />}

            <PostsById id={3}/>
        </>
    )
    
}

export default App
