import Storefront from "../Storefront";
import {
  chatGPTSignInPath,
  chatGPTSignOutPath,
  getChatGPTUser,
} from "../chatgpt-auth";

export const dynamic = "force-dynamic";

type CatchAllPageProps = {
  params: Promise<{ slug?: string[] }>;
};

export default async function CatchAllPage({ params }: CatchAllPageProps) {
  const { slug = [] } = await params;
  const initialPath = slug.length ? `/${slug.join("/")}` : "/";
  const user = await getChatGPTUser();

  return (
    <Storefront
      initialPath={initialPath}
      user={user}
      accountSignInPath={chatGPTSignInPath("/account")}
      mobileSignInPath={chatGPTSignInPath("/")}
      signOutPath={chatGPTSignOutPath("/")}
    />
  );
}
