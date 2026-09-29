// Blog posts at /blog/<slug>. Body text understands **bold** and [links](/path).
// Keep claims factual: no invented statistics. Where we describe Google's rules, link to
// or paraphrase Google's own help pages, and say it's general information.

export type Section = { h2: string; body?: string[]; list?: string[]; steps?: string[]; quote?: string; callout?: string; figure?: 'signs' | 'tv' | 'compare' };

export type Post = {
  slug: string;
  nav: string;
  title: string;
  description: string;
  kicker: string;
  h1: string;
  intro: string;
  date: string;
  mins: number;
  sections: Section[];
  faq: [string, string][];
  related: string[];
  tv?: boolean; // show the digital signage band
};

export const POSTS: Post[] = [
  {
    slug: 'how-to-find-your-google-review-link',
    nav: 'Find your Google review link',
    title: 'How to Find Your Google Review Link (and Make a QR Code) | NZ Guide',
    description: 'Step-by-step: find your Google review link from your Business Profile or Place ID, test it, and turn it into a print-ready QR code sign for your counter.',
    kicker: 'How-to',
    h1: 'How to find your Google review link (and turn it into a QR code)',
    intro: 'Your Google review link is a web address that opens your “write a review” box directly, with the stars ready to tap. It’s the single most useful link a local business can share, and it only takes a minute to find.',
    date: '2026-09-29', mins: 5,
    sections: [
      {
        h2: 'Before you start: you need a Google Business Profile',
        body: ['The review link belongs to your **Google Business Profile**, the free listing that shows your business on Google Search and Maps. If you’ve claimed and verified it, you’re ready. If not, search “Google Business Profile” and follow Google’s steps to claim your business first.'],
      },
      {
        h2: 'Option 1: from your Business Profile (easiest)',
        steps: [
          'Sign in to the Google account that manages your business.',
          'Search for your business name on Google. Your profile tools appear at the top of the results.',
          'Look for **Ask for reviews** (sometimes shown as **Get more reviews** or **Share review form**).',
          'Copy the link. It usually looks like **g.page/r/…/review**.',
          'Paste it into our form. That’s it.',
        ],
        callout: 'Google moves its buttons around from time to time. If you can’t see “Ask for reviews”, try the Google Maps app: open your business, tap the share or promote options, and look for the review link there.',
      },
      {
        h2: 'Option 2: build it from your Place ID',
        body: ['Every business on Google Maps has a Place ID. Search “Google Place ID finder”, look up your business, and copy the ID (it starts with “ChIJ”). Then put it on the end of this address:'],
        quote: 'https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID',
      },
      {
        h2: 'Test your link before you print',
        list: [
          'Open it on your phone while signed in to a personal Google account. It should open your business with the stars ready to tap.',
          'Check it’s your business, not one with a similar name down the road.',
          'Don’t use a link to Google search results or your Maps listing. Those make people hunt for the review button, and many give up.',
        ],
      },
      {
        h2: 'Turn it into a QR code sign',
        body: ['Paste your link into the [order form](/#create), pick a design and see a live preview. You can even scan the preview with your phone to check it opens the right page. After you pay $5.99 you get a print-ready PDF (A4, A5 and A6 sizes), a TV slide and the QR code on its own, emailed in about a minute.'],
        figure: 'signs',
      },
    ],
    faq: [
      ['What does a Google review link look like?', 'Usually g.page/r/ followed by a code and /review, or search.google.com/local/writereview?placeid= followed by your Place ID.'],
      ['Does the review link ever change?', 'It stays the same as long as your Business Profile exists. If you move or rebrand, check it still opens the right business.'],
      ['Can customers leave a review without a Google account?', 'They need to be signed in to Google. Most Android users are, and many iPhone users are through Gmail or YouTube.'],
    ],
    related: ['direct-review-link-vs-find-us-on-google', 'static-vs-dynamic-qr-codes', 'where-to-put-your-review-qr-code'],
  },
  {
    slug: 'google-reviews-for-cafes',
    nav: 'Google reviews for cafés',
    title: 'How Cafés Can Get More Google Reviews (Without Being Pushy) | NZ',
    description: 'Practical ways for NZ cafés to get more Google reviews: where to put a QR code, what to say at the counter, and how replies turn customers into regulars.',
    kicker: 'Hospitality',
    h1: 'How cafés can get more Google reviews (without being pushy)',
    intro: 'Most happy café customers never leave a review. Not because they don’t want to, but because nobody asked and it felt like effort. Fix those two things and reviews start arriving on their own.',
    date: '2026-09-29', mins: 6,
    sections: [
      {
        h2: 'Why reviews matter so much for cafés',
        body: ['When someone searches “coffee near me”, Google shows a map of nearby cafés with their star ratings and review counts. People compare them in seconds. Google’s own advice to businesses is that high-quality, positive reviews can improve your visibility, and a healthy number of recent reviews makes you the safe choice for someone new to the area.', 'Reviews also do something quieter: they tell your regulars that you’re listening.'],
      },
      {
        h2: 'Make it effortless: one scan, straight to the stars',
        body: ['Every extra step loses people. “Find us on Google” means searching, choosing the right listing, scrolling to reviews and finding the button. A QR code with your direct review link skips all of it: scan, tap the stars, write a line, done.', 'That’s the whole idea behind [Review QR](/#create): a good-looking sign with your own direct review link, ready to print.'],
        figure: 'compare',
      },
      {
        h2: 'Where to put it in a café',
        list: [
          '**The coffee pick-up.** The best spot by far. People wait a few minutes with their phone already out.',
          '**Tables.** A6 cards in small stands or napkin holders.',
          '**The cabinet.** Where people choose their food, at eye level.',
          '**Your menu TV.** Add the TV slide between specials, if you use [digital signage](https://digitalsignage.myqr.co.nz).',
          '**Takeaway bags.** A card in the bag gets scanned later, at home.',
        ],
      },
      {
        h2: 'What to say (and what not to)',
        body: ['A sign on its own works. A sign plus one friendly line works much better. Try: **“If you enjoyed it, a Google review would really help us. The code’s right there.”** Keep it light and ask everyone, not just the people who seem thrilled.', 'Don’t offer a free coffee or discount for reviews. Google’s rules don’t allow rewards for reviews, and it makes every review look less trustworthy. More on that in our guide to [what’s allowed](/blog/google-review-rules-nz).'],
      },
      {
        h2: 'Reply to every review',
        body: ['A short, personal reply to every review shows you care, turns a one-off visitor into a regular, and shows future customers how you handle feedback. A thoughtful reply to a critical review often impresses people more than a row of five stars. Our [reply guide](/blog/how-to-reply-to-google-reviews) has templates.'],
      },
    ],
    faq: [
      ['How many Google reviews does a café need?', 'There’s no magic number. What matters is a steady flow of recent, genuine reviews and a good average.'],
      ['Should I ask for reviews in person?', 'Yes, briefly and in a friendly way, with a sign that makes it one scan. Ask everyone, not only the happy faces.'],
      ['Can I put the QR code on my coffee cups?', 'Yes. Your pack includes the QR code on its own (PNG and SVG) for stickers, cups and bags.'],
    ],
    related: ['google-reviews-build-customer-loyalty', 'where-to-put-your-review-qr-code', 'how-to-reply-to-google-reviews'],
    tv: true,
  },
  {
    slug: 'google-reviews-build-customer-loyalty',
    nav: 'How reviews build loyalty',
    title: 'Why Google Reviews Build Customer Loyalty in Hospitality | myQR',
    description: 'Reviews aren’t just for new customers. How asking for, reading and replying to Google reviews builds loyalty with regulars in cafés, restaurants and bars.',
    kicker: 'Hospitality',
    h1: 'Why Google reviews build loyalty, not just new customers',
    intro: 'Most people think of reviews as a way to attract new customers. They are. But in hospitality they do something just as valuable: they turn satisfied guests into loyal regulars.',
    date: '2026-09-29', mins: 5,
    sections: [
      {
        h2: 'Being asked makes people feel valued',
        body: ['When you ask for someone’s opinion, you’re telling them it matters. A friendly sign that says “How did we do?” is a small signal that you care about the experience, not just the transaction. That’s the start of a relationship.'],
      },
      {
        h2: 'Writing a review makes it stick',
        body: ['When someone puts into words why they loved your place, they remember it. The customer who wrote “best eggs benny in town” has told the world (and themselves) that you’re their spot. People like to stay consistent with what they’ve said publicly.'],
      },
      {
        h2: 'Your replies are a conversation',
        body: ['A personal reply (“Thanks Sarah, glad the new cabinet food hit the spot, see you Saturday!”) turns a review into a conversation. Regulars notice when you remember them, and so does everyone else reading.', 'Replying to a critical review with grace can win that customer back, and shows everyone else that problems get fixed here.'],
      },
      {
        h2: 'Reviews are free advice',
        body: ['Patterns in reviews tell you what to keep and what to fix: the dish everyone raves about, the slow service on Sunday mornings, the music that’s too loud. Acting on feedback, and saying so in your replies, is one of the strongest loyalty builders there is.'],
      },
      {
        h2: 'Proof for the people who haven’t met you yet',
        body: ['A steady stream of recent, genuine reviews gives new customers confidence. Google also says positive reviews can improve your visibility in local search. More visibility brings more first visits, and great service turns them into regulars.'],
      },
      {
        h2: 'Make it effortless to join in',
        body: ['None of this happens if leaving a review is a chore. A QR code that opens your review form directly takes the effort out. Put it where people naturally pause: the counter, the table, the bill folder, your TV screens.'],
        figure: 'signs',
      },
    ],
    faq: [
      ['Do reviews really bring people back?', 'Being asked, being heard and seeing a thoughtful reply all strengthen how people feel about a place. That’s what brings them back.'],
      ['Should I reply to every review?', 'Yes, if you can. Short and personal is better than long and generic.'],
      ['What’s the easiest way to ask for reviews?', 'A QR code that opens your Google review form, placed where customers pause, plus a friendly word from your team.'],
    ],
    related: ['how-to-reply-to-google-reviews', 'google-reviews-for-cafes', 'google-reviews-for-restaurants'],
    tv: true,
  },
  {
    slug: 'where-to-put-your-review-qr-code',
    nav: 'Where to put your QR code',
    title: 'Where to Put Your Google Review QR Code: 12 Spots That Work',
    description: 'The best places for a Google review QR code in cafés, restaurants, shops and services: counters, tables, bill folders, windows, receipts, TVs and more.',
    kicker: 'Ideas',
    h1: 'Where to put your review QR code: 12 spots that work',
    intro: 'A review sign works best where people naturally pause with their phone in hand, right after a good experience. Here are twelve places that tick both boxes.',
    date: '2026-09-29', mins: 4,
    sections: [
      {
        h2: 'Inside the business',
        list: [
          '**The counter or till.** Everyone passes it, and most people have their phone out to pay.',
          '**Coffee or order pick-up.** A few minutes of waiting is the perfect moment.',
          '**Tables.** A6 or A5 cards in a small stand.',
          '**The bill folder.** Slip an A6 card in with the bill.',
          '**Reception and waiting areas.** Salons, clinics, motels, gyms.',
          '**Mirrors.** Salons and changing rooms, where people linger.',
        ],
      },
      {
        h2: 'On the way out and after they leave',
        list: [
          '**The front window or door.** The A4 poster, at eye level.',
          '**In the bag.** An A6 card goes home with the purchase.',
          '**Receipts and invoices.** Add the QR code image to your template.',
          '**Follow-up emails.** Use the link, or the QR code image, in your signature.',
        ],
      },
      {
        h2: 'On screens',
        list: [
          '**Your venue’s TVs.** Show the TV slide between specials or sport with [myQR Digital Signage](https://digitalsignage.myqr.co.nz).',
          '**Your socials.** Share the sign image on Instagram or Facebook stories.',
        ],
        figure: 'tv',
      },
      {
        h2: 'Tips for any spot',
        list: [
          'Eye level beats low down. Keep the code at least 2.5 cm wide, and bigger for walls and windows.',
          'Avoid glare. Matte lamination scans better than gloss under bright lights.',
          'Test it with your own phone in the actual spot, in the actual lighting.',
          'Swap signs when they get tatty. You can re-download and re-print any time.',
        ],
      },
    ],
    faq: [
      ['How big should a review QR code be?', 'At least 2.5 cm wide for close-up spots like tables. For walls and windows, go bigger: the A4 poster’s code is about 9 cm.'],
      ['How many signs should I put up?', 'Two or three well-placed signs beat ten scattered ones. Start with the counter, tables and the TV.'],
      ['Can I use the same QR code everywhere?', 'Yes. It always opens the same review form, whether it’s printed, on a screen or in an email.'],
    ],
    related: ['printing-your-review-qr-sign', 'review-qr-code-on-tv-digital-signage', 'google-reviews-for-restaurants'],
    tv: true,
  },
  {
    slug: 'direct-review-link-vs-find-us-on-google',
    nav: 'Why a direct review link matters',
    title: 'Why a Direct Google Review Link Beats “Find Us on Google” | myQR',
    description: '“Find us on Google” loses customers at every step. Why a QR code that opens your review form directly gets more reviews, and how to set one up.',
    kicker: 'Strategy',
    h1: 'Why a direct review link beats “find us on Google”',
    intro: 'Plenty of businesses have a sign that says “Review us on Google!”. It feels like asking, but it quietly hands the customer a job to do. Here’s why a direct link makes all the difference.',
    date: '2026-09-29', mins: 4,
    sections: [
      {
        h2: 'Count the steps',
        body: ['Without a direct link, a customer has to open Google, type your name, pick the right listing (hopefully not the similarly named place across town), scroll to the reviews, find “Write a review”, then tap the stars. With a QR code, they scan and tap the stars. Every step you remove is a chance for them to get distracted, give up, or never start.'],
        figure: 'compare',
      },
      {
        h2: 'Intent fades fast',
        body: ['The warm feeling after a great meal or a perfect haircut is real, but it doesn’t last. By the time someone gets home, the moment has passed. A direct link turns good intentions into a review on the spot.'],
      },
      {
        h2: 'It avoids the wrong listing',
        body: ['Businesses with common names, franchises and duplicate listings are easy to mix up. A direct link goes to the right profile every time.'],
      },
      {
        h2: 'It works everywhere',
        body: ['The same link works as a QR code on a sign, a TV slide, in an email signature or on a receipt. Set it up once and use it everywhere.'],
      },
      {
        h2: 'Set it up in two minutes',
        body: ['[Find your review link](/blog/how-to-find-your-google-review-link), paste it into [our form](/#create), pick a design and download a print-ready sign. The QR code links straight to Google, so it never expires.'],
      },
    ],
    faq: [
      ['Is a QR code better than a link?', 'For signs, yes: nobody types a long link. For emails and messages, use the link itself. Your pack gives you both.'],
      ['Does the QR code open the Google Maps app?', 'It opens your review form in the phone’s browser or Google app, with the stars ready to tap.'],
      ['Will it work on iPhone and Android?', 'Yes. Both scan QR codes with the built-in camera app.'],
    ],
    related: ['how-to-find-your-google-review-link', 'static-vs-dynamic-qr-codes', 'where-to-put-your-review-qr-code'],
  },
  {
    slug: 'google-review-rules-nz',
    nav: 'What’s allowed when asking for reviews',
    title: 'Asking for Google Reviews: What’s Allowed (and What Isn’t) | NZ',
    description: 'Can you offer a discount for a Google review? Can you only ask happy customers? A plain-English guide to Google’s review rules for NZ businesses.',
    kicker: 'Rules',
    h1: 'Asking for Google reviews: what’s allowed, and what isn’t',
    intro: 'Asking customers for reviews is completely fine, and Google encourages it. But a few common tactics break Google’s rules and can get reviews removed. Here’s a plain-English summary. It’s general information, not legal advice.',
    date: '2026-09-29', mins: 5,
    sections: [
      {
        h2: 'What’s fine',
        list: [
          'Asking every customer for an honest review, in person, on a sign, or by email.',
          'Making it easy with a direct link or QR code.',
          'Replying to reviews, positive and negative.',
          'Reporting reviews that break Google’s policies (for example spam or off-topic content).',
        ],
      },
      {
        h2: 'What’s not allowed',
        list: [
          '**Rewards for reviews.** No discounts, freebies, prize draws or loyalty points in exchange for a review. Google’s policies prohibit incentives, even for honest reviews.',
          '**Review gating.** Only asking happy customers, or sending unhappy ones somewhere else first. Google says not to selectively ask for positive reviews or discourage negative ones.',
          '**Fake reviews.** Reviews from staff, friends posing as customers, or paid review services.',
          '**Reviewing yourself** or your competitors.',
        ],
        callout: 'Google’s policies change from time to time. For the current wording, search for Google’s “Prohibited and restricted content” policy for Maps user-generated content.',
      },
      {
        h2: 'The New Zealand angle',
        body: ['Fake or misleading reviews can also create problems under the Fair Trading Act, which prohibits misleading conduct in trade. The Commerce Commission has published guidance for businesses on online reviews. The simple rule: only real customers, sharing their honest experience, with no strings attached.'],
      },
      {
        h2: 'How a QR sign fits in',
        body: ['A sign that invites everyone to share an honest review is exactly what Google’s rules expect. It asks everyone equally, offers nothing in return, and opens your real review form. That’s how every [Review QR](/#create) sign is worded: “Scan to leave us a Google review.”'],
      },
    ],
    faq: [
      ['Can I offer a discount for a Google review?', 'No. Google’s rules prohibit incentives for reviews, even if you don’t ask for a positive one.'],
      ['Can I only ask customers who were happy?', 'No. Selectively asking for positive reviews (review gating) is against Google’s policies. Ask everyone.'],
      ['Can my staff leave reviews?', 'No. Reviews should come from genuine customers, not people connected to the business.'],
    ],
    related: ['how-to-reply-to-google-reviews', 'google-reviews-for-cafes', 'google-reviews-build-customer-loyalty'],
  },
  {
    slug: 'how-to-reply-to-google-reviews',
    nav: 'How to reply to reviews',
    title: 'How to Reply to Google Reviews: Templates for Hospitality | myQR',
    description: 'How to reply to positive and negative Google reviews, with copy-and-adapt templates for cafés, restaurants, bars, salons and other local businesses.',
    kicker: 'How-to',
    h1: 'How to reply to Google reviews (with templates)',
    intro: 'Replying to reviews is one of the easiest ways to build loyalty and show new customers what you’re like. Keep it short, personal and calm. Here’s how, with templates to adapt.',
    date: '2026-09-29', mins: 6,
    sections: [
      {
        h2: 'The basics',
        list: [
          'Reply to every review you can, ideally within a few days.',
          'Use their first name and mention something specific they said.',
          'Keep it short. Two to four sentences is plenty.',
          'Sign off as a real person (“Ngā mihi, Sam”).',
          'Never share private details, like a booking or a treatment, even if they did.',
        ],
      },
      {
        h2: 'Replying to a positive review',
        quote: 'Thanks so much, Aroha! So glad you loved the lemon slice, it’s Mere’s recipe and she’ll be chuffed. See you next time. Ngā mihi, Sam',
        body: ['Specific beats generic. “Thanks for your review!” on every reply looks automated. Mention the dish, the stylist, the room or the occasion.'],
      },
      {
        h2: 'Replying to a critical review',
        steps: [
          'Thank them for the feedback, and mean it.',
          'Acknowledge the problem without arguing the details in public.',
          'Say what you’re doing about it, if anything.',
          'Offer a way to talk it through privately (a phone number or email).',
        ],
        quote: 'Hi Mark, thanks for letting us know, and I’m sorry the wait was so long on Saturday. We’ve added another barista on weekend mornings. I’d love to hear more, please email me at hello@… Sam',
      },
      {
        h2: 'Replying to an unfair or fake review',
        body: ['Stay calm and factual. A short, polite reply (“We can’t find a record of this visit, please get in touch so we can look into it”) reads well to others. If a review breaks Google’s policies, you can report it from your Business Profile.'],
      },
      {
        h2: 'Keep new reviews coming',
        body: ['Replies work best with a steady stream of new reviews to reply to. A [review QR sign](/#create) at the counter and on your tables makes it one scan for customers to leave one.'],
      },
    ],
    faq: [
      ['Should I reply to every Google review?', 'Yes, if you can. It shows you’re listening, and other customers read your replies.'],
      ['How fast should I reply to a bad review?', 'Within a day or two if you can, once you’ve calmed down. A thoughtful reply beats a fast, defensive one.'],
      ['Can I delete a bad review?', 'No. You can reply to it, and you can report it if it breaks Google’s policies.'],
    ],
    related: ['google-reviews-build-customer-loyalty', 'google-review-rules-nz', 'google-reviews-for-restaurants'],
  },
  {
    slug: 'review-qr-code-on-tv-digital-signage',
    nav: 'Show your review QR on your TVs',
    title: 'Put Your Google Review QR Code on Your Venue’s TVs | myQR',
    description: 'How to show a Google review QR code on your venue’s TVs with digital signage: slide timing, size, placement and how to mix it with your specials.',
    kicker: 'Digital signage',
    h1: 'Put your review QR code on your venue’s TVs',
    intro: 'If you’ve got TVs in your café, bar, gym or waiting room, you’ve got the biggest review sign in the building. A QR code on screen is visible from across the room, and it costs nothing extra to show.',
    date: '2026-09-29', mins: 4,
    tv: true,
    sections: [
      {
        h2: 'Why TVs work so well',
        body: ['Screens catch the eye, and people look at them while they wait: for coffee, for the next game, for their appointment. That idle moment is perfect for a quick scan. Every Review QR pack includes a **1920 × 1080 TV slide** made for exactly this.'],
        figure: 'tv',
      },
      {
        h2: 'How to show it',
        list: [
          '**With myQR Digital Signage.** Upload the TV slide to [Digital Signage](https://digitalsignage.myqr.co.nz) and it plays on every TV in your venue alongside your specials. It runs in the TV’s web browser, with no app or player box, and you can update it from your phone.',
          '**From a USB stick.** Many smart TVs can show a photo slideshow from USB. It’s fiddly to update, but it works.',
          '**On a screen you already run.** Any signage system or menu board that plays images can show the PNG.',
        ],
      },
      {
        h2: 'Make it scannable from a seat',
        list: [
          'Show it for 10 to 15 seconds at a time, every few minutes, so people have time to get their phone out.',
          'Put it on the screens nearest to where people sit or wait, not the one above the door.',
          'Pair it with a moment: after the quiz, at half-time, at the end of a class.',
          'Test it from the furthest seat. If it won’t scan there, show it on a closer screen.',
        ],
      },
      {
        h2: 'Mix it with your specials',
        body: ['Your review slide works best as part of a playlist: happy hour, tonight’s event, the new menu, then the review QR. Customers see what’s on and get a gentle nudge to share what they thought. With Digital Signage you can even schedule it, for example only after the lunch rush.'],
      },
    ],
    faq: [
      ['Can people scan a QR code on a TV?', 'Yes, from a reasonable distance, as long as the code is big enough on screen and there’s no glare. The TV slide gives the code nearly half the screen height.'],
      ['What size is the TV slide?', '1920 × 1080 pixels (Full HD, 16:9), which suits nearly every TV and signage system.'],
      ['How much is myQR Digital Signage?', 'See digitalsignage.myqr.co.nz for current pricing. It covers every TV in one venue.'],
    ],
    related: ['where-to-put-your-review-qr-code', 'google-reviews-for-cafes', 'google-reviews-build-customer-loyalty'],
  },
  {
    slug: 'printing-your-review-qr-sign',
    nav: 'Printing your review sign',
    title: 'Printing a Google Review QR Sign: Sizes, Paper & Stands (NZ Guide)',
    description: 'How to print your Google review QR code sign at home or at a print shop: A4, A5 and A6 sizes, paper, lamination, stands, and testing the code.',
    kicker: 'How-to',
    h1: 'Printing your review QR sign: sizes, paper and stands',
    intro: 'Your print pack is a PDF built for ordinary A4 paper, so you can print it at home, at work or at any print shop. Here’s how to get a sharp, long-lasting result.',
    date: '2026-09-29', mins: 4,
    sections: [
      {
        h2: 'What’s in the PDF',
        list: [
          '**Page 1: A4 poster** for windows, walls and noticeboards.',
          '**Page 2: two A5 table signs** on one A4 sheet (cut down the middle).',
          '**Page 3: four A6 counter cards** on one A4 sheet (cut into quarters).',
          '**Page 4: the QR code on its own**, for menus and your own designs.',
        ],
        figure: 'signs',
      },
      {
        h2: 'Printer settings',
        list: [
          'Print at **100% / Actual size**, not “Fit to page”.',
          'Choose the best quality setting.',
          'Home printers leave a thin white edge. That’s normal, and the design allows for it.',
        ],
      },
      {
        h2: 'Paper and finish',
        list: [
          '**Card stock (200–300 gsm)** makes signs stand up and last. Most home printers handle up to about 200 gsm.',
          '**Matte, not gloss.** Glossy lamination can reflect lights and make the code harder to scan.',
          '**Laminate** anything on a counter, table or outdoors. It wipes clean.',
        ],
      },
      {
        h2: 'Stands and frames',
        body: ['Clear acrylic sign holders are cheap and widely available in A4, A5 and A6 sizes from stationery shops and online. A T-shaped stand suits tables and counters, and a wall frame suits the A4 poster. Print shops can print, laminate and trim the pages for you, usually while you wait.'],
      },
      {
        h2: 'Always test before you put it up',
        body: ['Scan the printed sign with your own phone, in the spot where it will live. It should open your Google review form. If a sign gets worn or scratched, download and print a fresh one: your download link keeps working.'],
      },
    ],
    faq: [
      ['Can I print it bigger than A4?', 'Yes. Everything is vector, so print shops can scale it to A3 or larger with no loss of quality.'],
      ['Where can I print it in New Zealand?', 'Any home or office printer, or a print shop such as Warehouse Stationery or a local printer.'],
      ['Can I get a PNG instead?', 'Yes. Your pack includes the sign as a high-resolution PNG, a TV slide PNG, and the QR code as PNG and SVG.'],
    ],
    related: ['where-to-put-your-review-qr-code', 'static-vs-dynamic-qr-codes', 'how-to-find-your-google-review-link'],
  },
  {
    slug: 'google-reviews-for-restaurants',
    nav: 'Google reviews for restaurants',
    title: 'Google Reviews for Restaurants: A Practical NZ Guide | myQR',
    description: 'How restaurants can get more Google reviews: timing the ask with the bill, table signs, staff scripts, replying well, and learning from feedback.',
    kicker: 'Hospitality',
    h1: 'Google reviews for restaurants: a practical guide',
    intro: 'For restaurants, reviews do the job that word of mouth used to. Here’s a simple system that gets more of them, without turning your team into salespeople.',
    date: '2026-09-29', mins: 5,
    sections: [
      {
        h2: '1. Ask at the right moment',
        body: ['The best time is when the bill arrives. The meal is fresh in their mind, they’re relaxed, and their phone is often already out to pay. An A6 card in the bill folder does the asking for you.'],
      },
      {
        h2: '2. Make it one scan',
        body: ['A QR code that opens your Google review form directly means no searching and no scrolling. Table talkers and a poster at the host stand cover everyone else.'],
        figure: 'signs',
      },
      {
        h2: '3. Give your team one line',
        body: ['No scripts or pressure, just one friendly line when the bill goes down: **“If you enjoyed tonight, we’d really appreciate a Google review. There’s a code in the folder.”** Ask every table, not just the happy ones. That’s fairer, and it’s what Google’s rules expect.'],
      },
      {
        h2: '4. Reply to everything',
        body: ['Thank people by name and mention what they enjoyed. For critical reviews, stay calm, own what went wrong and invite them to get in touch. Our [reply templates](/blog/how-to-reply-to-google-reviews) help.'],
      },
      {
        h2: '5. Learn from the patterns',
        body: ['Every month, skim your recent reviews for repeats: the dish everyone mentions, the table by the door that’s always cold, the wait on Friday nights. It’s the cheapest customer research you’ll ever get.'],
      },
      {
        h2: 'Don’t do this',
        list: [
          'Don’t offer a free dessert or discount for a review.',
          'Don’t hand the code only to tables that seem happy.',
          'Don’t ask staff, friends or family to post reviews.',
        ],
      },
    ],
    faq: [
      ['What’s the best way for a restaurant to get Google reviews?', 'Ask every table when the bill arrives, with a QR code in the bill folder that opens your review form directly.'],
      ['Should the QR code be on the menu?', 'It can be, but the bill folder and the table work better: people review after the meal, not before.'],
      ['Which sign design suits a restaurant?', 'Midnight Gold for most dining rooms, Clean & Simple for modern spaces.'],
    ],
    related: ['how-to-reply-to-google-reviews', 'google-reviews-build-customer-loyalty', 'google-review-rules-nz'],
    tv: true,
  },
  {
    slug: 'static-vs-dynamic-qr-codes',
    nav: 'Static vs dynamic QR codes',
    title: 'Static vs Dynamic QR Codes: Why Your Review QR Shouldn’t Expire',
    description: 'Some “free” QR codes stop working when a trial ends. The difference between static and dynamic QR codes, and why a review sign should use a static code.',
    kicker: 'Explainer',
    h1: 'Static vs dynamic QR codes: why your review QR code shouldn’t expire',
    intro: 'Ever scanned a QR code on a café table and landed on a “this code has expired” page? That’s a dynamic QR code whose subscription ran out. Here’s the difference, and why it matters for a sign you’ll print and leave up for years.',
    date: '2026-09-29', mins: 4,
    sections: [
      {
        h2: 'Static QR codes',
        body: ['A static QR code contains your web address itself. Your phone reads the address straight out of the pattern and opens it. There’s no middleman, nothing to renew and nothing that can switch off. As long as the address works, the code works.'],
      },
      {
        h2: 'Dynamic QR codes',
        body: ['A dynamic QR code contains a short link to someone else’s server, which then redirects to your page. That lets you change the destination later and count scans, which is useful for marketing campaigns. But if the service shuts down, changes its prices or your plan lapses, the redirect stops and every printed code stops working with it.'],
      },
      {
        h2: 'Why review signs should be static',
        list: [
          'Your Google review link doesn’t change, so there’s nothing to update.',
          'Signs stay up for years, often long after anyone remembers where the code came from.',
          'No subscription means no surprise “expired” page in front of customers.',
          'Fewer hops means the page opens faster.',
        ],
      },
      {
        h2: 'How Review QR codes work',
        body: ['Every [Review QR](/#create) code is static: it opens your Google review form directly, with no redirect through us. Pay $5.99 once and the code works for as long as your Google Business Profile does.'],
        figure: 'signs',
      },
    ],
    faq: [
      ['Do static QR codes expire?', 'No. They contain the web address itself, so they work as long as that address does.'],
      ['Can I change where a static QR code goes?', 'No, you’d print a new one. For a Google review link that’s rarely needed.'],
      ['Why did my free QR code stop working?', 'It was probably a dynamic code from a service that needs a subscription to keep redirecting.'],
    ],
    related: ['how-to-find-your-google-review-link', 'direct-review-link-vs-find-us-on-google', 'printing-your-review-qr-sign'],
  },
];

export const getPost = (slug: string) => POSTS.find((p) => p.slug === slug);
