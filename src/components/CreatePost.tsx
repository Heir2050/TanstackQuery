import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type FormEvent, useState } from "react";
import Posts from "./Posts";

type PostPayload = {
    title: string;
    body?: string;
};

const CreatePost = () => {
    const [title, setTitle] = useState("");
    const queryClient = useQueryClient();

    const createPost = async (newPost: PostPayload) => {
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

    const { mutate } = useMutation({
        mutationFn: createPost,

        // This onSuccess it's will allow to refetch datas when the insert data is succefull happen
        //For more informations, check the network tab
        // onSuccess: () => {
        //     queryClient.invalidateQueries(["posts"])
        // },

        // This part will add the results added on the list without refetching the data
        // But to work, you must Desactivate the onSuccess method
        onMutate: async (newPost: PostPayload) => {
            await queryClient.cancelQueries({ queryKey: ["posts"] });

            const previousPosts = queryClient.getQueryData<PostPayload[]>(["posts"]) ?? [];

            queryClient.setQueryData<PostPayload[]>(["posts"], (old = []) => [
                ...old,
                { id: Date.now(), ...newPost },
            ]);

            return { previousPosts };
        },

        // You can also handle about errors
        onError: (_err, _newPost, context) => {
            if (context?.previousPosts) {
                queryClient.setQueryData(["posts"], context.previousPosts);
            }
        }
    });

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!title.trim()) return;

        mutate(
            { title: title.trim(), body: "This is a new post" },
            {
                onSuccess: () => setTitle(""),
            }
        );
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
                <button type="submit">Create</button>
            </form>

            <Posts />
        </>
    );
};

export default CreatePost;