import { AccountStage } from "@/components/account-stage";
import { CtaLink } from "@/components/brand";

export default function NotFound() {
  return (
    <AccountStage
      eyebrow="404"
      title="This room is empty."
      lede="The page is not here. The shop still is."
      image={{
        src: "/images/story-room.png",
        alt: "A dark bedroom at night, black clothing over a wooden chair, a thin strip of streetlight under the door",
        caption: "Empty",
      }}
      align="center"
    >
      <CtaLink href="/shop">Shop the house</CtaLink>
    </AccountStage>
  );
}
