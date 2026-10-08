// The series stated in one line, in one place, so every surface says the same thing.
//
// THIS REPLACED components/publication-status.tsx ON 2026-10-07. That component existed to state
// the publication status: "Written. Not yet published", a note on every book and trilogy page, and
// a "Know when it lands" link into /contact. The operator ruled there is no plan to publish the
// series, so the status came down with it. What is left is the fact that does not depend on
// publication: the work exists and it is finished.
//
// NOTHING HERE SAYS "UNPUBLISHED" EITHER, and that is deliberate. Stating that the work is not
// published is still a publication frame, and it invites the question of when.
//
// THE SERIES LINE IS VERBATIM, by the operator's ruling of 2026-09-22: "four trilogies, twelve
// volumes, approximately one million words, complete." It reads the same in every place it
// appears, and test_the_series_line_is_used_verbatim checks it as a whole string. The measured
// figure behind "approximately one million" is 970,224 words across Books I-XII, counted from the
// manuscripts; it is deliberately not printed, because the phrase is the ruling.

export function SeriesNote() {
  return (
    <p className="text-sm leading-relaxed text-muted">
      Four trilogies, twelve volumes, approximately one million words, complete.
      Each theme is carried from the self to the community to the world, and
      every volume can be read on its own.
    </p>
  );
}
