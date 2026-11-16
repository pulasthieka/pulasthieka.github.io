# Latent Traces

*The algorithmic philosophy behind the blog's cover images.*

A recording is never the thing itself. It is what the thing did to an instrument: a body, a brain, a server or a cell is perturbed, and a stack of channels each writes down its own partial, noisy account. Latent Traces treats every cover as one such recording. Nothing is drawn directly. A hidden field is disturbed by a handful of events, many channels sample it at once, and the image is simply everything they wrote down, laid one over another.

The system begins with a seeded noise field and a small number of stimuli placed inside it. Each stimulus has the shape of a physiological response rather than a decorative bump: a sharp onset, then a slow, slightly ringing return to baseline. That asymmetry is the core of the piece and was tuned with painstaking care, because the eye reads it immediately as *something happened here, and the system is still recovering*. The peak is never the subject; the recovery is. Every channel feels each stimulus in proportion to its distance from it, so a single event becomes a hill shared unevenly across the stack.

Channels are coupled. At low coupling each trace wanders alone and the composition is a field of independent witnesses; at high coupling neighbours move together and the stack breathes like one tissue. Disagreement between channels is not suppressed, since it is the information. Each trace occludes the ones behind it, so depth emerges from ordering alone, without a single shadow or gradient. This is a meticulously crafted economy: one stroke weight, one fill, one accent, and all of the richness coming from the mathematics underneath.

The same field can be read in two geometries. Unrolled, the channels are stacked traces running left to right: time on the page, an instrument's view. Wrapped, they close into concentric rings: a cross-section, a cell, growth layers around a centre, where a stimulus becomes a bulge on one side of an otherwise calm body. Several ring systems can share the frame, and when they do, each one's first response reaches toward its neighbour. A quantisation control snaps the continuous response to discrete levels, so the same event that looks biological in one piece looks digital, sampled and held, in the next. These are not different drawings but one master-level algorithm observed under different parameters.

Colour is deliberately withheld. The pieces are ink on paper, with one channel, the one closest to the event, traced in a single accent, and a dotted line and a dot marking the instant of onset. They invert cleanly for a dark page. The restraint is the point: the result should look like a figure from a paper that someone cared about far too much, the product of deep computational expertise spent on getting a few hundred lines exactly right.

Every post gets its own seed and its own handful of parameters, so no two covers repeat, yet all of them are visibly the same instrument. A new article only needs a name; the algorithm, refined through countless iterations, does the rest.

## Using it

- `src/lib/cover.js` is the algorithm. The site calls it at build time and writes `/covers/<slug>.svg` for every post.
- `design/cover-art/viewer.html` is an interactive viewer (open it in a browser) for exploring seeds and parameters, with a preset for each post.
- To pin a post's cover, add the values from the viewer to its frontmatter:

```yaml
cover:
  seed: 4242
  mode: radial     # or linear
  channels: 22
  events: 2
  coupling: 0.8
  quantize: 0
  cells: 1
  accents: 1
```

Posts without a `cover` block get one derived from their filename.
