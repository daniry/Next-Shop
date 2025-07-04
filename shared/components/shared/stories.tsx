"use client";

import { cn } from "@/shared/lib/utils";
import { Container } from "./container";
import { useEffect, useState } from "react";
import { IStory } from "@/shared/services/stories";
import { Api } from "@/shared/services/apiClient";
import { X } from "lucide-react";
import ReactStories from "react-insta-stories";

interface Props {
    className?: string;
}

export const Stories: React.FC<Props> = ({ className }) => {
    const [stories, setStories] = useState<IStory[]>([]);
    const [open, setOpen] = useState(false);
    const [selectedStory, setSelectedStory] = useState<IStory>();

    useEffect(() => {
        async function fetchStories() {
            const data = await Api.stories.getAll();
            if (data) {
                const findStories = data.length > 6 ? data.slice(0, 6) : data;
                setStories(findStories);
            }
        }

        fetchStories();
    }, []);

    // Открытие сториса
    const onClickStory = (story: IStory) => {
        setSelectedStory(story);

        if (story.items.length > 0) {
            setOpen(true);
        }
    };

    console.log("stories", stories);
    return (
        <>
            <Container className={cn("flex items-center justify-between gap-2 my-10", className)}>
                {stories.length === 0 && [...Array(6)].map((_, index) => <div key={index} className="w-[200px] h-[250px] bg-gray-200 rounded-md animate-pulse" />)}

                {stories.map((story) => (
                    <img key={story.id} onClick={() => onClickStory(story)} className="rounded-md cursor-pointer" height={250} width={200} src={story.previewImageUrl} />
                ))}

                {open && (
                    <div className="absolute left-0 top-0 w-full h-full bg-black/80 flex items-center justify-center z-30">
                        <div className="relative" style={{ width: 520 }}>
                            <button className="absolute -right-10 -top-5 z-30" onClick={() => setOpen(false)}>
                                <X className="absolute top-0 right-0 w-8 h-8 text-white/50" />
                            </button>

                            <ReactStories
                                onAllStoriesEnd={() => setOpen(false)}
                                stories={selectedStory?.items.map((item) => ({ url: item.sourceUrl })) || []}
                                defaultInterval={3000}
                                width={520}
                                height={800}
                            />
                        </div>
                    </div>
                )}
            </Container>
        </>
    );
};
