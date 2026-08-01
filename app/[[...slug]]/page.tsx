import Storefront from "../Storefront";

type CatchAllPageProps = {
  params: Promise<{ slug?: string[] }>;
};

export default async function CatchAllPage({ params }: CatchAllPageProps) {
  const { slug = [] } = await params;
  const initialPath = slug.length ? `/${slug.join("/")}` : "/";

  return <Storefront initialPath={initialPath} />;
}
