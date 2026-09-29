import type { DesignId } from './designs';

// Landing pages at /for/<slug>. Each one has its own advice, so they're genuinely useful
// (and don't read as copies of each other to Google).

export type Industry = {
  slug: string;
  name: string;      // "Cafés"
  icon: string;
  design: DesignId;  // the design the order form starts on
  headline: string;  // the sign headline the order form starts on
  title: string;
  description: string;
  h1: string;
  intro: string;
  spots: { t: string; d: string; icon: string }[];
  tips: string[];
  faq: [string, string][];
  posts: string[];
};

export const INDUSTRIES: Industry[] = [
  {
    slug: 'cafes', name: 'Cafés', icon: 'coffee', design: 'cafe', headline: 'Enjoyed your coffee?',
    title: 'Google Review QR Code Sign for Cafés NZ | Print-Ready, $5.99',
    description: 'A print-ready Google review QR code sign for your café. Put it by the till and on tables so happy regulars can leave a review in seconds. $5.99 NZD, no sign-up.',
    h1: 'Google review QR code signs for cafés',
    intro: 'Your regulars love your flat whites, but very few think to leave a review. A QR code sign by the coffee pick-up turns the few minutes they spend waiting into the easiest moment to do it.',
    spots: [
      { t: 'At the coffee pick-up', d: 'People wait a few minutes with their phone already in hand.', icon: 'coffee' },
      { t: 'On every table', d: 'A6 counter cards fit a small stand or a napkin holder.', icon: 'table' },
      { t: 'On the cabinet', d: 'Right where people choose their food.', icon: 'window' },
      { t: 'On your menu TV', d: 'Add the TV slide between your specials.', icon: 'tv' },
    ],
    tips: [
      'Say it out loud once: “If you enjoyed it, a review would really help us. The code’s right there.” A friendly ask next to a sign works far better than the sign alone.',
      'Reply to every review within a few days, good or bad. Other customers read the replies too.',
      'Use a sign-off your regulars will recognise. “Ngā mihi” or “Thanks for supporting local” feels like you, not a chain.',
    ],
    faq: [
      ['Where’s the best place for a review QR code in a café?', 'At the coffee pick-up point. People are standing still with their phone out for a few minutes, which is the easiest moment to scan and tap the stars.'],
      ['Can I give a free coffee for a review?', 'No. Google’s rules don’t allow rewards for reviews, and it can also mislead other customers. Just ask nicely and make it easy.'],
      ['What size should a café review sign be?', 'An A5 table sign on the counter and A6 cards on tables work well. Your pack includes both, plus an A4 poster for the window.'],
    ],
    posts: ['google-reviews-for-cafes', 'where-to-put-your-review-qr-code', 'google-reviews-build-customer-loyalty'],
  },
  {
    slug: 'restaurants', name: 'Restaurants', icon: 'utensils', design: 'midnight', headline: 'Enjoyed your meal?',
    title: 'Google Review QR Code for Restaurants NZ | Table & Bill Signs, $5.99',
    description: 'Get more Google reviews for your restaurant with a print-ready QR code sign for tables, the host stand and the bill folder. $5.99 NZD, delivered in a minute.',
    h1: 'Google review QR code signs for restaurants',
    intro: 'Diners decide where to eat by reading reviews, and the best time to ask for one is right after a great meal. A QR code in the bill folder or on the table makes it a ten-second job.',
    spots: [
      { t: 'In the bill folder', d: 'An A6 card slipped in with the bill or EFTPOS receipt.', icon: 'receipt' },
      { t: 'On the table', d: 'A5 table talkers in a clear stand.', icon: 'table' },
      { t: 'At the host stand', d: 'Guests see it on the way out, feeling good.', icon: 'users' },
      { t: 'In the front window', d: 'The A4 poster shows walkers-by you care what diners think.', icon: 'window' },
    ],
    tips: [
      'Time it with the bill. Guests are relaxed, full and already have their phone out to pay.',
      'Brief your team with one friendly line, and never ask only the happy tables. Asking everyone is fairer and it’s what Google’s rules expect.',
      'Read your reviews for patterns. If three people mention slow mains on Friday nights, that’s free advice.',
    ],
    faq: [
      ['When should a restaurant ask for a review?', 'When the bill arrives. The meal is fresh in their mind and their phone is already out.'],
      ['Should I put the QR code on the menu?', 'You can: your pack includes the QR code on its own (PNG and SVG) to add to menus. Keep it at least 2.5 cm wide.'],
      ['Which design suits a restaurant?', 'Midnight Gold looks at home in most dining rooms, and Clean & Simple suits modern spaces. You can see every design before you pay.'],
    ],
    posts: ['google-reviews-for-restaurants', 'how-to-reply-to-google-reviews', 'google-review-rules-nz'],
  },
  {
    slug: 'bars-and-pubs', name: 'Bars & pubs', icon: 'beer', design: 'chalk', headline: 'Loved your visit?',
    title: 'Google Review QR Code Sign for Bars & Pubs NZ | $5.99 Print-Ready',
    description: 'A chalkboard-style Google review QR code sign for your bar or pub. Put it on the bar, tables and TVs. Print-ready PDF and TV slide for $5.99 NZD.',
    h1: 'Google review QR code signs for bars and pubs',
    intro: 'Great nights out rarely become reviews because nobody remembers to write one the next day. Catch people while they’re still enjoying themselves, with a code on the bar and on your screens.',
    spots: [
      { t: 'On the bar', d: 'Where everyone waits for a drink.', icon: 'beer' },
      { t: 'Between the sport on your TVs', d: 'The TV slide works with digital signage.', icon: 'tv' },
      { t: 'Beer garden tables', d: 'A6 cards in holders survive the weather better laminated.', icon: 'table' },
      { t: 'By the door', d: 'The A4 poster catches people on their way out.', icon: 'window' },
    ],
    tips: [
      'Quiz nights, live music and big games are when you have the most happy people in one room. Put the code on screen during the break.',
      'Laminate outdoor signs with a matte finish so the code doesn’t glare under lights.',
      'Thank reviewers by name in your reply. Regulars notice.',
    ],
    faq: [
      ['Can I show the QR code on the pub TVs?', 'Yes. Every pack includes a 1920 × 1080 TV slide. Show it between the sport with myQR Digital Signage or any screen that plays images.'],
      ['Will the code scan in a dark bar?', 'Yes. The codes use high contrast and strong error correction. Put the sign where there’s some light, and bigger is better on walls.'],
      ['Can we run a review competition?', 'No. Prizes or drinks in exchange for reviews break Google’s rules. Ask everyone, reward no one, and let the reviews be honest.'],
    ],
    posts: ['review-qr-code-on-tv-digital-signage', 'where-to-put-your-review-qr-code', 'google-review-rules-nz'],
  },
  {
    slug: 'hair-and-beauty', name: 'Hair & beauty', icon: 'scissors', design: 'sunset', headline: 'Loved your new look?',
    title: 'Google Review QR Code for Hair & Beauty Salons NZ | $5.99',
    description: 'A bold, print-ready Google review QR code sign for hairdressers, barbers, nail and beauty salons. Put it at reception and the mirror. $5.99 NZD.',
    h1: 'Google review QR code signs for salons, barbers and beauty',
    intro: 'Clients leave your chair feeling their best, and that’s exactly when they’re happy to tell the world. A review sign at reception catches them while they’re still admiring the result.',
    spots: [
      { t: 'At reception', d: 'Right where clients pay and book their next visit.', icon: 'card' },
      { t: 'At the mirror stations', d: 'A6 cards are easy to scan while the finish goes on.', icon: 'scissors' },
      { t: 'With aftercare cards', d: 'Add the QR code image to cards you already print.', icon: 'sticker' },
      { t: 'On your Instagram', d: 'Share the sign image on your stories.', icon: 'phone' },
    ],
    tips: [
      'Ask as they admire the result in the mirror. A simple “If you love it, a review would mean a lot” is enough.',
      'Reviews that mention a stylist by name help that person build their book. Let your team know.',
      'Never offer discounts for reviews. It breaks Google’s rules and makes all your reviews look less trustworthy.',
    ],
    faq: [
      ['What’s the best review sign design for a salon?', 'Sunset Pop is bright and fun, and Clean & Simple suits minimal studios. Try both in the preview.'],
      ['Can I use the QR code on my booking cards?', 'Yes. Your pack includes the QR code on its own as a PNG and SVG to add to anything you print.'],
      ['Do I need a Google Business Profile?', 'Yes. The QR code opens your Google review form, which comes with your free Google Business Profile.'],
    ],
    posts: ['where-to-put-your-review-qr-code', 'how-to-reply-to-google-reviews', 'how-to-find-your-google-review-link'],
  },
  {
    slug: 'retail-shops', name: 'Retail shops', icon: 'bag', design: 'sunset', headline: 'Loved shopping with us?',
    title: 'Google Review QR Code Sign for Retail Shops NZ | $5.99',
    description: 'Get more Google reviews for your shop with a print-ready QR code sign for the counter, window and bags. Six designs, $5.99 NZD, no sign-up.',
    h1: 'Google review QR code signs for shops',
    intro: 'Shoppers check reviews before they visit, especially when they’re choosing between local stores and the big online retailers. A QR code at the counter helps your happy customers vouch for you.',
    spots: [
      { t: 'At the counter', d: 'An A5 sign next to the EFTPOS terminal.', icon: 'card' },
      { t: 'In the bag', d: 'Pop an A6 card in with each purchase.', icon: 'bag' },
      { t: 'In the window', d: 'The A4 poster tells walkers-by you’re well reviewed.', icon: 'window' },
      { t: 'On receipts and flyers', d: 'Add the QR code image to anything you print.', icon: 'receipt' },
    ],
    tips: [
      'Mention it at the counter after a good chat or a helpful fitting. Personal service is what online stores can’t match, and reviews prove it.',
      'An A6 card in the bag gets scanned later at home, when people have time.',
      'Reply to reviews that mention products. It helps other shoppers find you when they search for them.',
    ],
    faq: [
      ['Does a review QR code help my shop show up on Google?', 'Google says reviews can improve how visible your business is in local results. More reviews also make people more likely to choose you.'],
      ['Can I print the cards myself?', 'Yes. Page 3 of your print pack has four A6 cards on one A4 sheet with cut lines. Card stock works best.'],
      ['Do the codes expire?', 'Never. They link straight to Google, not through us, so they keep working with no subscription.'],
    ],
    posts: ['direct-review-link-vs-find-us-on-google', 'where-to-put-your-review-qr-code', 'static-vs-dynamic-qr-codes'],
  },
  {
    slug: 'tradies', name: 'Tradies & services', icon: 'wrench', design: 'minimal', headline: 'Happy with the job?',
    title: 'Google Review QR Code for Tradies NZ | Leave-Behind Cards, $5.99',
    description: 'Plumbers, sparkies, builders and cleaners: leave a Google review QR card after every job. Print-ready cards and QR code files for invoices. $5.99 NZD.',
    h1: 'Google review QR codes for tradies and home services',
    intro: 'When people need a plumber, electrician or builder, they pick the one with the best reviews. The job’s done and the customer is happy, but you’re already driving to the next one. A leave-behind card does the asking for you.',
    spots: [
      { t: 'A leave-behind card', d: 'Leave an A6 card on the bench when the job’s done.', icon: 'card' },
      { t: 'On your invoice', d: 'Add the QR code image to your invoice template.', icon: 'receipt' },
      { t: 'In your email signature', d: 'Use the QR code or link in follow-up emails.', icon: 'mail' },
      { t: 'In the van', d: 'Print the A4 on sticker paper for the rear window.', icon: 'sticker' },
    ],
    tips: [
      'Ask while you’re packing up, when the customer can see the finished job. “If you’re happy, a quick Google review really helps a small business like ours.”',
      'Put the code on your invoice too. People open it at their desk, when they have time.',
      'Mention the suburb in your replies (“Thanks for having us out in Karori”). It reads naturally and helps local searchers.',
    ],
    faq: [
      ['How do tradies get more Google reviews?', 'Ask every customer at the end of the job and make it one tap: a card with a QR code, and the same code on your invoice.'],
      ['Can I put the QR code on my invoices?', 'Yes. Your pack includes the QR code on its own as a PNG and an SVG, ready for invoice and quote templates.'],
      ['I work from home, can I still get reviews?', 'Yes, as long as you have a Google Business Profile, including service-area businesses without a shopfront.'],
    ],
    posts: ['how-to-find-your-google-review-link', 'direct-review-link-vs-find-us-on-google', 'how-to-reply-to-google-reviews'],
  },
  {
    slug: 'accommodation', name: 'Motels & stays', icon: 'bed', design: 'fern', headline: 'Loved your stay?',
    title: 'Google Review QR Code for Motels, B&Bs & Holiday Homes NZ | $5.99',
    description: 'Get more Google reviews from guests with a QR code sign for rooms, reception and your welcome book. Native Bush and five other designs. $5.99 NZD.',
    h1: 'Google review QR code signs for motels, B&Bs and holiday homes',
    intro: 'Travellers compare stays by their reviews, and a steady flow of recent ones matters. A QR code in each room and at check-out reminds guests while the stay is still fresh.',
    spots: [
      { t: 'In every room', d: 'An A6 card on the bedside or desk.', icon: 'bed' },
      { t: 'At check-out', d: 'An A5 sign on the reception counter.', icon: 'card' },
      { t: 'In the welcome book', d: 'Print the A4 poster as the last page.', icon: 'menu' },
      { t: 'On the room TV', d: 'Use the TV slide on your in-room channel or signage.', icon: 'tv' },
    ],
    tips: [
      'Ask at check-out, with a thank-you: “If you enjoyed your stay, we’d love a Google review.”',
      'Recent reviews matter to travellers. A card in every room keeps them coming in all year, not just after busy weekends.',
      'Reply to every review. Future guests read how you handle feedback before they book.',
    ],
    faq: [
      ['Do Google reviews matter if I’m on booking sites?', 'Yes. Many travellers look you up on Google Maps before they book, wherever they book.'],
      ['How many cards do I need?', 'One per room, plus reception. Page 3 of the pack prints four A6 cards per A4 sheet, so print as many sheets as you need.'],
      ['Can I change the headline to “Loved your stay?”', 'Yes. Pick a headline from the list or write your own (up to 30 characters).'],
    ],
    posts: ['google-reviews-build-customer-loyalty', 'printing-your-review-qr-sign', 'how-to-reply-to-google-reviews'],
  },
  {
    slug: 'health-clinics', name: 'Clinics & health', icon: 'heart', design: 'minimal', headline: 'How did we do?',
    title: 'Google Review QR Code for Clinics, Physios & Dentists NZ | $5.99',
    description: 'A clean, professional Google review QR code sign for physios, dentists, vets, GPs and clinics. Print-ready for reception and rooms. $5.99 NZD.',
    h1: 'Google review QR code signs for clinics and health practices',
    intro: 'New patients choose a physio, dentist or vet by reading reviews. A calm, professional sign at reception makes it easy for happy patients to share their experience, without anyone feeling pressured.',
    spots: [
      { t: 'At reception', d: 'Where patients pay and book their next appointment.', icon: 'card' },
      { t: 'In treatment rooms', d: 'A6 cards on the desk.', icon: 'heart' },
      { t: 'On appointment cards', d: 'Add the QR code image to cards you print.', icon: 'sticker' },
      { t: 'In follow-up emails', d: 'Link the review form after a course of treatment.', icon: 'mail' },
    ],
    tips: [
      'Keep it low-key: the sign does the asking, so staff don’t have to.',
      'When you reply, never confirm someone was a patient or mention their treatment. Thank them in general terms.',
      'Clean & Simple suits most practices. Native Bush works well for natural health and vets.',
    ],
    faq: [
      ['Is it OK for a clinic to ask for Google reviews?', 'Yes, as long as you ask everyone and offer nothing in return. Take care with privacy when you reply: don’t discuss anyone’s health or treatment.'],
      ['Which design suits a medical practice?', 'Clean & Simple: white, crisp and professional with one teal accent.'],
      ['Can the sign be wiped clean?', 'Laminate it, or put it in a clear acrylic stand. Both wipe clean.'],
    ],
    posts: ['how-to-reply-to-google-reviews', 'google-review-rules-nz', 'printing-your-review-qr-sign'],
  },
  {
    slug: 'gyms-and-fitness', name: 'Gyms & fitness', icon: 'dumbbell', design: 'sunset', headline: 'Loving your workouts?',
    title: 'Google Review QR Code for Gyms, Yoga & Fitness Studios NZ | $5.99',
    description: 'Get more Google reviews for your gym, yoga or fitness studio with a bold QR code sign for the front desk, changing rooms and screens. $5.99 NZD.',
    h1: 'Google review QR code signs for gyms and fitness studios',
    intro: 'Members who love your classes are your best marketing. A QR sign at the front desk and on your screens gives them a quick way to tell others, right after a great session.',
    spots: [
      { t: 'At the front desk', d: 'Where members check in and out.', icon: 'card' },
      { t: 'By the water station', d: 'People pause there between sets.', icon: 'clock' },
      { t: 'In the changing rooms', d: 'Laminated A5 signs on the mirror.', icon: 'window' },
      { t: 'On studio screens', d: 'Show the TV slide after classes.', icon: 'tv' },
    ],
    tips: [
      'Ask after a class, when the endorphins are high. Instructors can mention it in their cool-down.',
      'Show the TV slide on screens between classes.',
      'Reply to reviews that mention instructors or classes by name.',
    ],
    faq: [
      ['Can we give members a free class for a review?', 'No. Google doesn’t allow rewards for reviews. Just ask, and make it easy.'],
      ['Will it work on our gym TVs?', 'Yes. Your pack includes a 1920 × 1080 TV slide for any screen that shows images.'],
      ['Which design suits a gym?', 'Sunset Pop is bold and energetic. Midnight Gold suits boutique studios.'],
    ],
    posts: ['review-qr-code-on-tv-digital-signage', 'where-to-put-your-review-qr-code', 'google-review-rules-nz'],
  },
  {
    slug: 'tourism-and-activities', name: 'Tourism & activities', icon: 'mountain', design: 'fern', headline: 'Loved your adventure?',
    title: 'Google Review QR Code for Tours & Activities NZ | $5.99 Print-Ready',
    description: 'Tours, attractions and activity operators: get more Google reviews with a QR code sign at the finish line, on the bus and in the gift shop. $5.99 NZD.',
    h1: 'Google review QR code signs for tours and activities',
    intro: 'Visitors plan their trips around reviews, often on Google Maps. The end of a great tour is when people are buzzing, taking photos and holding their phones. That’s your moment.',
    spots: [
      { t: 'At the finish', d: 'An A4 poster where the tour ends.', icon: 'mountain' },
      { t: 'On the bus or boat', d: 'Laminated A5 signs on seat backs.', icon: 'users' },
      { t: 'At the ticket desk', d: 'An A5 sign by the EFTPOS.', icon: 'card' },
      { t: 'With photo pick-up', d: 'A6 cards handed out with photos or merch.', icon: 'camera' },
    ],
    tips: [
      'Guides can mention it at the end: “If you had a great day, a Google review helps us more than you’d think.”',
      'International visitors can scan the same code. The review form opens in their phone’s language.',
      'Reply to every review, and thank people for travelling to see you.',
    ],
    faq: [
      ['Do tourists use Google reviews?', 'Many visitors use Google Maps to find things to do nearby, and they compare by rating and review count.'],
      ['Can I put the sign outside?', 'Yes. Laminate it or put it in a weatherproof frame. Keep it out of direct glare so it scans easily.'],
      ['Which design suits a tourism business?', 'Native Bush has a proudly Kiwi feel. Sunset Pop suits fun activities.'],
    ],
    posts: ['google-reviews-build-customer-loyalty', 'printing-your-review-qr-sign', 'where-to-put-your-review-qr-code'],
  },
];

export const getIndustry = (slug: string) => INDUSTRIES.find((i) => i.slug === slug);
