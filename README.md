# Thesis Presentation
This repository contains my thesis' presentation.

A demo is available [here](https://tdopierre.github.io/thesis-presentation/). For a better experience, use fullscreen!

## Animations
The main animation of the presentation is a demo of my hierarchical pseudo-labeling method. It is made in a separated file: [pages/hierarchical-clustering.html](pages/hierarchical-clustering.html)

Smooth animations explaining the meta-learning framework are made using reveal.js's [auto-animate](https://revealjs.com/auto-animate/) feature. 

## Automatic bibliography & references
The bibliography at the end of the slides is created automatically by the [js/handle-references.js](js/handle-references.js) script. In this script, copy/paste your bibliography by removing line breaks from your favorite `.bib` file, and place it in the `bibtex` variable. Then, to add a citation in your presentation, use the following html block, with the appropriate `citation-ref` value:
```html
<span class="citation" citation-ref="tfidf"></span>
```

If the `citation-ref` is unmatched, it will display as `[??]`. You can also cite multiple references at once using multiple values in `citation-ref` separated by commas. You can **hover** the reference to have a quick look at the details.

This script also creates dynamic values for both `Table` and `Figure`. When you add a figure / table to your presentation, simply name it using the following piece of html:
```html
<span class="ref-figure"></span> My favorite figure
<!-- or -->
<span class="ref-table"></span> My favorite table
```
The inner HTML of the span will be updated with a proper number automaticall incremented at each new figure / table. 


