# Latent Traces

*The algorithmic philosophy behind the blog's cover images.*

A recording is never the thing itself. It is what the thing did to an instrument: a body, a brain, a server or a cell is perturbed, and a stack of channels each writes down its own partial, noisy account. Latent Traces treats every cover as one such recording. Nothing is drawn directly. A hidden field is disturbed by a handful of events, many channels sample it at once, and the image is simply everything they wrote down, laid one over another.

The system begins with a seeded noise field and a small number of stimuli placed inside it. Each stimulus has the shape of a physiological response rather than a decorative bump: a sharp onset, then a slow, slightly ringing return to baseline. That asymmetry is the core of the piece and was tuned with painstaking care, because the eye reads it immediately as *something happened here, and the system is still recovering*. The peak is never the subject; the recovery is. Every channel feels each stimulus in proportion to its distance from it, so a single event becomes a hill shared unevenly across the stack.

The field is drawn as flow. The hidden field is domain-warped noise, noise that is itself pushed around by more noise, and each stimulus becomes a vortex whose pull has the response shape: a sharp rise near the core, then a long rippling recovery outward. Hundreds of evenly spaced streamlines follow the field; a line is only started where there is room and stops when it comes too close to another, so density stays even and the eye reads the currents rather than the lines. Lines fade with distance from the nearest stimulus, so depth comes from the events, without a single shadow or gradient. Coupling smooths the field: low coupling gives turbulent, tightly folded water, high coupling long calm currents.

The same field can be read in two ways. In linear mode one current runs across the page, bent by the stimuli. In radial mode one to three slow whirls share the frame, like cells or growth rings seen in cross-section. A quantisation control snaps every heading to a few fixed directions, so the same event that looks biological in one piece looks digital, sampled and held, in the next. These are not different drawings but one algorithm observed under different parameters.

Colour is deliberately withheld. The pieces are ink on paper, with a few lines threaded through the stimuli in a single accent, and a dotted ring and a dot marking each vortex core. They invert cleanly for a dark page. The restraint is the point: the result should look like a figure from a paper that someone cared about far too much, the product of deep computational expertise spent on getting a few hundred lines exactly right.

Every post gets its own seed and its own handful of parameters, so no two covers repeat, yet all of them are visibly the same instrument. A new article only needs a name; the algorithm, refined through countless iterations, does the rest.

## Using it

- `src/lib/cover.js` is the algorithm. The site calls it at build time and writes `/covers/<slug>.svg` for every post.
- `design/cover-art/viewer.html` is an interactive viewer (serve the repo, e.g. the `design-demos` launch config, and open it) for exploring seeds and parameters, with a preset for each post. It holds a copy of `cover.js`; paste it in again after changing that file.
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

## The portrait

The profile image is the same flow pointed at a photograph. Streamlines ride slow noise
currents with a pull along the face's contours, and they pack tighter where the photo is
darker, so hair and shoulders come through as dense water and the lit face stays open.
`npm run portrait` regenerates `public/img/portrait.svg` from
`design/portrait/source.webp` (the photo is kept in the repo but not served on the site).
