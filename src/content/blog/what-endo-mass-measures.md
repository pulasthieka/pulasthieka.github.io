---
title: "What Endo-MASS actually measures"
date: 2026-08-15
description: "A plain-language walkthrough of endothelial function, and why it takes four signals rather than one to see it."
tags: [biosignals, endothelial-function]
category: research
draft: true
cover: { seed: 2608, mode: linear, channels: 16, events: 1, coupling: 0.85, accents: 4 }
---

<!-- Draft carried over from the site design. It only appears in `npm run dev`
     until `draft: true` is removed. Check every claim before publishing. -->

The endothelium is the single layer of cells lining every blood vessel you have. It is not passive plumbing: it senses flow and releases signals that tell the vessel to widen or narrow. When it stops doing that well, it is one of the earliest measurable steps toward cardiovascular disease — earlier than plaque, earlier than symptoms.

The clinical gold standard for measuring it is flow-mediated dilation: block blood flow in the arm with a cuff, release it, and watch the artery widen on ultrasound. It works, and it needs a sonographer, a machine, and a trained reader. None of that scales to screening.

## Four signals instead of one image

Endo-MASS takes the same physiological event and records what it does to the whole limb rather than to one artery on screen. Four channels run simultaneously through the cuff cycle:

| Signal | What it adds |
| --- | --- |
| Blood pressure | Cuff-derived, gives the occlusion stimulus a measured start and end. |
| Bioimpedance | Tracks blood volume change in the limb segment through the recovery window. |
| PPG | Optical pulse waveform — shape change is where dilation shows up first. |
| Temperature | Skin temperature at two sites, as a slow confirmation of reperfusion. |

The point of recording them together is that no single channel is convincing on its own. PPG alone is noisy and posture-sensitive. Bioimpedance alone drifts with hydration. Read together against a known stimulus, the disagreements between channels become informative rather than fatal — one signal tells you whether to trust another.

> The interesting variable was never the peak value. It was how long the limb took to come back.

## What the clinical run taught us

We ran the device in a medical-council-approved study, and the most useful finding was procedural rather than physiological: almost all of our early variance came from cuff placement and from participants talking during the baseline window. Fixing the protocol did more for signal quality than any filter we wrote afterward.

That work became *Endo-MASS*, presented at IEEE ICIIS 2023, where it received the Best Paper Award. The next question — the one I'm taking to Melbourne — is whether the recovery dynamics across these four channels can be modelled well enough to stand in for the ultrasound reading, not just correlate with it.
