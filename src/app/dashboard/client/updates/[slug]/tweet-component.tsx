"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Textarea } from "@/components/ui/Textarea";
import { Heart, MessageCircle, Repeat2, Share, Send } from "lucide-react";
import { GetBoard } from "@/actions/test";
import type { Update } from "@mondaydotcomorg/api";
import { Separator } from "@/components/ui/Separator";

interface TweetPostProps {
  // user: {
  //   name: string
  //   username: string
  //   avatar: string
  // }
  // content: string
  // images?: string[]
  // timestamp: string
  // likes?: number
  // retweets?: number
  // replies?: number

  data: Update;
}

export function TweetPost({
  // data
  // user,
  // content,
  // images = [],
  // timestamp,
  // likes = 0,
  // retweets = 0,
  // replies = 0,
  data,
}: TweetPostProps) {
  const [replyText, setReplyText] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [isRetweeted, setIsRetweeted] = useState(false);
  // const [likeCount, setLikeCount] = useState(likes)
  // const [retweetCount, setRetweetCount] = useState(retweets)

  // const handleLike = () => {
  //   setIsLiked(!isLiked)
  //   setLikeCount(isLiked ? likeCount - 1 : likeCount + 1)
  // }

  // const handleRetweet = () => {
  //   setIsRetweeted(!isRetweeted)
  //   setRetweetCount(isRetweeted ? retweetCount - 1 : retweetCount + 1)
  // }

  const handleReply = () => {
    if (replyText.trim()) {
      console.log("Reply:", replyText);
      setReplyText("");
    }
  };

  const user = {};
  const date = new Date(data.created_at);

  console.log(data);

  let strippedText = data.text_body;

  for (const asset of data.assets ?? []) {
    strippedText = strippedText?.replaceAll(asset?.name!, "");
  }

  return (
    <Card className="mx-auto bg-card border-border">
      <CardContent className="">
        {/* Profile Section */}
        <div className="flex items-center justify-center space-x-3 mb-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={data.creator?.photo_small || "/placeholder.svg"} alt={data.creator?.name} />
            <AvatarFallback className="bg-muted text-muted-foreground font-semibold">
              {data.creator?.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <h3 className="font-bold text-card-foreground text-sm truncate">{data.creator?.name}</h3>
              <span className="text-muted-foreground text-sm">·</span>
              <span className="text-muted-foreground text-sm">
                {date.toLocaleString("default", { month: "long" })} {date.getDay()}
              </span>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="mb-4 text-sm">
          <p className="text-card-foreground text-sm leading-relaxed whitespace-pre-wrap">{strippedText}</p>

          {/* <Separator /> */}

          {/* Images */}
          {data.assets && data.assets.length > 0 && (
            <div className={`mt-3 grid gap-2 rounded-lg overflow-hidden ${data.assets.length === 1 ? "grid-cols-1" : data.assets.length === 2 ? "grid-cols-2" : "grid-cols-2"}`}>
              {data.assets.map((asset, index) => {
                const isImage = asset?.name.endsWith(".png") || asset?.name.endsWith(".jpg");

                // if (!isImage) {
                //   return <></>
                // }

                return (
                  <div key={index} className={`relative ${data?.assets?.length === 3 && index === 0 ? "row-span-2" : ""}`}>
                    {isImage && <span>{asset?.name}</span>}

                    <a href={asset?.public_url} className="text-blue-700">
                      <img src={asset?.public_url || "/placeholder.svg"} alt={asset?.name} className="w-full h-full object-cover rounded-md" />
                    </a>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Engagement Section */}
        <div className="flex items-center justify-between text-muted-foreground mb-4">
          {/* <button className="flex items-center space-x-2 hover:text-blue-500 transition-colors">
            <MessageCircle className="w-4 h-4" />
            <span className="text-xs">{replies}</span>
          </button> */}

          <button
            // onClick={handleRetweet}
            className={`flex items-center space-x-2 hover:text-green-500 transition-colors ${isRetweeted ? "text-green-500" : ""}`}
          >
            <Repeat2 className="w-4 h-4" />
            <span className="text-xs">{0}</span>
          </button>

          <button
            // onClick={handleLike}
            className={`flex items-center space-x-2 hover:text-red-500 transition-colors ${isLiked ? "text-red-500" : ""}`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
            <span className="text-xs">{0}</span>
          </button>

          <button className="flex items-center space-x-2 hover:text-blue-500 transition-colors">
            <Share className="w-4 h-4" />
          </button>
        </div>

        <Separator />

        {data.replies?.map((reply) => {
          const date = new Date(reply?.created_at);
          const name = reply?.creator?.name;

          return (
            // <div className="space-y-5 py-10">
            //   <div className="space-y-5">
            //     <div className="flex items-center justify-center space-x-3">
            //       <Avatar className="w-5 h-5">
            //         <AvatarImage src={reply?.creator?.photo_small || "/placeholder.svg"} alt={name} />
            //         <AvatarFallback className="bg-muted text-muted-foreground font-semibold">
            //           {name
            //             .split(" ")
            //             .map((n) => n[0])
            //             .join("")
            //             .toUpperCase()}
            //         </AvatarFallback>
            //       </Avatar>
            //       <div className="flex-1 min-w-0 text-xs">
            //         <div className="flex items-center space-x-2">
            //           <h3 className="font-bold text-card-foreground truncate text-sm">{name}</h3>
            //           <span className="text-muted-foreground">·</span>
            //           <span className="text-muted-foreground">{date.toLocaleString('default', { month: 'long' })} {date.getDay()}</span>
            //         </div>
            //       </div>
            //     </div>

            //     <div>
            //       {reply?.text_body}
            //     </div>
            //   </div>
            // </div>

            <div className="flex flex-row gap-3 py-5">
              <Avatar className="w-5 h-5">
                <AvatarImage src={reply?.creator?.photo_small || "/placeholder.svg"} alt={name} />
                <AvatarFallback className="bg-muted text-muted-foreground font-semibold">
                  {name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="bg-accent w-full rounded space-y-2 py-1 px-3">
                <div className="space-x-2">
                  <span className="font-semibold">{name}</span>
                  <span className="text-muted-foreground">·</span>
                  <span className="text-muted-foreground">
                    {date.toLocaleString("default", { month: "long" })} {date.getDay()}
                  </span>
                </div>

                <p className="text-sm">{reply?.text_body}</p>
              </div>
            </div>
          );
        })}

        {/* Reply Input */}
        <div className="flex items-start space-x-3 pt-3 border-t border-border">
          <div className="flex-1 space-y-2">
            <Textarea
              placeholder="Post your reply..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="min-h-[60px] resize-none border-border text-sm placeholder:text-muted-foreground"
            />
            <div className="flex justify-end">
              <Button onClick={handleReply} disabled={!replyText.trim()} size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Send className="w-3 h-3 mr-1" />
                Reply
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
