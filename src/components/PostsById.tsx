import { useQuery } from "@tanstack/react-query"

type PostsByIdProps = {
    id: number
}

const PostsById = ({ id }: PostsByIdProps) => {

    const fetchPostById = async (id) => {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)

        if(!response.ok) throw new Error("Failed fetching Post")

        return response.json()
    }

    const {data, isLoading, error} = useQuery({
        queryKey: ["posts", id], 
        queryFn: () => fetchPostById(id),
        staleTime: 5000
    })

    if(isLoading) return <span className="loader"></span>

    if(error) return <p className='error'>Error: {error.message}</p>

    return (
        <>
            {data.title}
        </>
    )
}
 
export default PostsById;