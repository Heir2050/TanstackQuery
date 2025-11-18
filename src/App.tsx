import './App.css'
import {useQuery, useMutation} from "@tanstack/react-query"

// useQuery is used to fetching data from the server
//useMutation is used to mutate(to manipulate) data on the server



function App() {

    const fetchPosts = async() => {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts")

        if(!response.ok) throw new Error("Failed fetching Posts")

        return response.json()
    }

    const {data, isLoading, error} = useQuery({
        queryKey: ["posts"], 
        queryFn: fetchPosts
    })

    if(isLoading) return <span className="loader"></span>

    if(error) return <p className='error'>Error: {error.message}</p>

    return (
        <>
            {data?.map((post) => (
                <p key={post.id}>{post.title}</p>
            ))}
        </>
    )
}

export default App
