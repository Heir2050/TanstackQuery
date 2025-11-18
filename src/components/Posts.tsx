import { useQuery } from "@tanstack/react-query"

const Posts = () => {
    const fetchPosts = async() => {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts")

        if(!response.ok) throw new Error("Failed fetching Posts")

        return response.json()
    }

    const {data, isLoading, error} = useQuery({
        queryKey: ["posts"], 
        queryFn: fetchPosts,
        staleTime: 5000
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
 
export default Posts;