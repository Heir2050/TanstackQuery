import { useMutation } from "@tanstack/react-query";
import { type FormEvent, useState } from "react";

const CreatePost = () => {
    const [title, setTitle] = useState("");

    const createPost = async (newPost: { title: string }) => {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newPost),
        });

        if (!response.ok) {
            throw new Error("Failed to create post");
        }

        return response.json();
    };

    const {mutate} = useMutation({
        mutationFn: createPost,
    })

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Quand il aura action de clique, executer l'action d'insertion grace a mutate
        mutate({title, body:"This is a new post"})

    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Post title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <button onClick={handleSubmit} type="submit">Create</button>
            </form>
        </>
    );
};

export default CreatePost;