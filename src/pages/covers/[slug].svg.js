import { getPosts } from '../../lib/posts';
import { renderSVG, coverOptions } from '../../lib/cover.js';

// One generated cover per post, written to /covers/<slug>.svg at build time.
export async function getStaticPaths() {
  const posts = await getPosts();
  return posts.map((post) => ({ params: { slug: post.id }, props: { cover: post.data.cover } }));
}

export function GET({ params, props }) {
  return new Response(renderSVG(coverOptions(params.slug, props.cover)), {
    headers: { 'Content-Type': 'image/svg+xml; charset=utf-8' },
  });
}
