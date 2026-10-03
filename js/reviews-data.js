/* =========================================================
   REVIEWS & RATINGS — edit only this file to update the site.
   1. Open the Google profile and the JustDial listing.
   2. Copy the star rating (e.g. 4.9) and the number of reviews (e.g. 187).
   3. Put them in "rating" and "count" below. Use numbers, no quotes.
   4. Update "lastUpdated".
   While rating is null, the site shows a "Read reviews" link instead
   of a number, so nothing wrong is ever displayed.
   ========================================================= */

window.SITE_REVIEWS = {
  lastUpdated: "October 2026",
  fallbackTotalText: "200+ reviews",

  platforms: [
    {
      name: "Google",
      color: "#4285F4",
      rating: null,   // e.g. 4.9
      count: null,    // e.g. 150
      readUrl: "https://maps.app.goo.gl/6dDtMRfNZ4pt89AZ9",
      writeUrl: "https://maps.app.goo.gl/6dDtMRfNZ4pt89AZ9"
    },
    {
      name: "JustDial",
      color: "#FF6F00",
      rating: null,   // e.g. 4.8
      count: null,    // e.g. 60
      readUrl: "https://jsdl.in/DT-59XBVADXF6V",
      writeUrl: "https://jsdl.in/DT-59XBVADXF6V"
    }
  ],

  /* Paste real reviews here. Example:
     { name: "Rakesh Patel", place: "Vadodara", platform: "Google",
       rating: 5, text: "Pandit ji explained every step clearly...", date: "August 2026" },
  */
  testimonials: [
  ]
};