import React from "react";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SocialShareProps {
  imageUrl: string;
  caption?: string;
  shareUrl?: string; // The link to your site or editor page
}

export const SocialShare: React.FC<SocialShareProps> = ({ imageUrl, caption = "Check out my Eid creation!", shareUrl = window.location.href }) => {
  // Facebook share
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(caption)}`;
  // X (Twitter) share
  const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(caption)}`;
  // LinkedIn share
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;

  // Instagram: No direct web share, so copy image/caption to clipboard
  const handleInstagramShare = async () => {
    try {
      await navigator.clipboard.writeText(`${caption}\n${imageUrl}`);
      alert("Caption and image URL copied! Open Instagram and paste in your post.");
    } catch (e) {
      alert("Failed to copy to clipboard.");
    }
  };

  return (
    <div className="flex gap-2 mt-4">
      <a href={facebookUrl} target="_blank" rel="noopener noreferrer">
        <Button variant="outline" size="icon" title="Share on Facebook">
          <Facebook className="w-5 h-5" />
        </Button>
      </a>
      <a href={twitterUrl} target="_blank" rel="noopener noreferrer">
        <Button variant="outline" size="icon" title="Share on X (Twitter)">
          <Twitter className="w-5 h-5" />
        </Button>
      </a>
      <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
        <Button variant="outline" size="icon" title="Share on LinkedIn">
          <Linkedin className="w-5 h-5" />
        </Button>
      </a>
      <Button variant="outline" size="icon" title="Share on Instagram" onClick={handleInstagramShare}>
        <Instagram className="w-5 h-5" />
      </Button>
    </div>
  );
};
