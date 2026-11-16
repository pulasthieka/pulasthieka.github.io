import { getPosts } from '../../lib/posts';
import { renderSVG, coverOptions, thumbOptions } from '../../lib/cover.js';

// Two generated covers per post, written at build time:
//   /covers/<slug>.svg        full detail, for the article page
//   /covers/<slug>-thumb.svg  simplified and heavier, for cards and lists
export async function getStaticPaths() {
  const posts = await getPosts();
  return posts.flatMap((post) => {
    const options = coverOptions(post.id, post.data.cover);
    return [
      { params: { slug: post.id }, props: { options, weight: 1 } },
      { params: { slug: `${post.id}-thumb` }, props: { options: thumbOptions(options), weight: 2.6 } },
    ];
  });
}

export function GET({ props }) {
  return new Response(renderSVG(props.options, props.weight), {
    headers: { 'Content-Type': 'image/svg+xml; charset=utf-8' },
  });
}
