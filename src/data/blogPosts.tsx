import type { BlogPost } from '@/types'

const denverNeighborhoods: BlogPost = {
  slug: 'best-neighborhoods-for-restaurants-in-denver',
  date: 'April 12, 2026',
  isoDate: '2026-04-12',
  title: "Denver's Best Neighborhoods for Restaurants",
  subtitle: "A city that grew up fast. Here's where the food kept pace.",
  coverImageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&auto=format&fit=crop&q=85',
  coverImageAlt: 'Vibrant restaurant interior with warm lighting and a busy open kitchen',
  body: (
    <article className="space-y-8">

      <p className="font-body text-lg text-bark leading-relaxed">
        Denver spent most of its life as a beef-and-beer city, and there's no shame in that. But somewhere between the cannabis dispensaries and the rooftop bars, something genuinely interesting happened to the food scene. The city now has a handful of neighborhoods where, block for block, the cooking is as good as anywhere in the country. The trick is knowing which ones.
      </p>

      <section>
        <h2 className="font-display text-2xl font-bold text-ink mb-3">RiNo (River North Art District)</h2>
        <img
          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=900&auto=format&fit=crop&q=80"
          alt="Vibrant restaurant interior with warm lighting and open kitchen"
          className="w-full rounded-lg mb-5 object-cover aspect-[16/9]"
        />
        <p className="font-body text-bark leading-relaxed mb-4">
          RiNo is the obvious answer, and the obvious answer is correct. What started as a warehouse district for artists has become Denver's most concentrated stretch of serious restaurants. The neighborhood earned its reputation quickly — almost too quickly, which means some of its oldest spots are still its best.
        </p>
        <p className="font-body text-bark leading-relaxed mb-4">
          The range here is the real draw. You can eat wood-fired Neapolitan pizza at one end of Brighton Boulevard and finish the night with omakase at the other. Tacos al pastor from a counter that's been there since before the galleries moved in sit two blocks from a cocktail bar with a James Beard-nominated beverage program. That kind of density takes years to accumulate.
        </p>
        <p className="font-body text-bark leading-relaxed">
          What to watch for: brunch crowds on weekends are brutal. RiNo restaurants earn their reputation on weeknight dinners, when the service has room to breathe and the chefs aren't buried.
        </p>
      </section>

      <section>
        <h2 className="font-display text-2xl font-bold text-ink mb-3">Highland (LoHi)</h2>
        <img
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&auto=format&fit=crop&q=80"
          alt="Elegant plated pasta dish at a fine dining restaurant"
          className="w-full rounded-lg mb-5 object-cover aspect-[16/9]"
        />
        <p className="font-body text-bark leading-relaxed mb-4">
          Lower Highland — LoHi to everyone who lives there — sits on the bluff above downtown with the kind of views that make even a mediocre meal feel better than it is. Fortunately, the restaurants here don't need the help.
        </p>
        <p className="font-body text-bark leading-relaxed mb-4">
          LoHi skews upscale without being stiff about it. The neighborhood's best places have a looseness to them — servers who know the menu cold and talk about it like they actually eat there, kitchens willing to let a dish run until it sells out rather than stretching it through a shift. The food feels considered rather than composed.
        </p>
        <p className="font-body text-bark leading-relaxed">
          Italian-leaning spots do particularly well here. The pasta programs at LoHi's top restaurants are among the best in the city — handmade, seasonal, not trying too hard. Show up hungry.
        </p>
      </section>

      <section>
        <h2 className="font-display text-2xl font-bold text-ink mb-3">Congress Park & Cheesman Park</h2>
        <img
          src="https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=900&auto=format&fit=crop&q=80"
          alt="Cozy neighborhood restaurant with low lighting and intimate tables"
          className="w-full rounded-lg mb-5 object-cover aspect-[16/9]"
        />
        <p className="font-body text-bark leading-relaxed mb-4">
          This is where Denver locals eat on a Tuesday. No views, no scene, no lines around the block — just good neighborhood restaurants that have been quietly excellent for years. Congress Park and Cheesman reward the kind of diner who does their homework.
        </p>
        <p className="font-body text-bark leading-relaxed mb-4">
          The stretch along 12th Avenue in particular has produced some of the city's most interesting cooking. Chefs who could open in RiNo or LoHi choose these blocks specifically because the rents let them cook without compromise. That calculus shows up on the plate.
        </p>
        <p className="font-body text-bark leading-relaxed">
          Expect BYO-friendly spots, tasting menus that punch above their price point, and wine lists curated by people who actually drink natural wine rather than just stock it. The neighborhood's low-key reputation is its greatest asset.
        </p>
      </section>

      <section>
        <h2 className="font-display text-2xl font-bold text-ink mb-3">Sunnyside</h2>
        <img
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&auto=format&fit=crop&q=80"
          alt="Colorful tacos and Mexican street food spread on a table"
          className="w-full rounded-lg mb-5 object-cover aspect-[16/9]"
        />
        <p className="font-body text-bark leading-relaxed mb-4">
          Sunnyside is what RiNo was five years ago: a working neighborhood in the early stages of being discovered, with a food scene that's still figuring out what it wants to be. That ambiguity is exactly what makes it worth watching right now.
        </p>
        <p className="font-body text-bark leading-relaxed mb-4">
          The Mexican and Central American spots along Tejon Street have been excellent for longer than any of the newer openings, and they remain the neighborhood's backbone. But the last two years have brought a small cluster of chef-driven restaurants to the area — places taking on real culinary ambition without the associated pricing.
        </p>
        <p className="font-body text-bark leading-relaxed">
          The risk of eating in Sunnyside is inconsistency. Some of the newer spots are still working out the kinks. The reward is stumbling into something genuinely great before it makes anyone's list — which, given the pace of the neighborhood, may not take long.
        </p>
      </section>

      <section>
        <h2 className="font-display text-2xl font-bold text-ink mb-3">Baker</h2>
        <img
          src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=900&auto=format&fit=crop&q=80"
          alt="A perfectly crafted smash burger with golden fries"
          className="w-full rounded-lg mb-5 object-cover aspect-[16/9]"
        />
        <p className="font-body text-bark leading-relaxed mb-4">
          Baker is where Denver's late-night food scene actually lives. South Broadway is a bar corridor, but some of the best cooking in the neighborhood happens well after 10 pm — late-night menus, after-service spots, and the kind of places that understand that sometimes you want a serious bowl of ramen at midnight.
        </p>
        <p className="font-body text-bark leading-relaxed mb-4">
          During normal hours, Baker's best restaurants lean toward comfort done with real craft: smashburgers that put the trendy ones to shame, barbecue that respects the smoke, brunch spots that don't have two-hour waits because the neighborhood hasn't been written up yet this month.
        </p>
        <p className="font-body text-bark leading-relaxed">
          Baker rewards loyalty. The best places here respond well to regulars — menus that flex slightly based on who's in the room, off-menu items that materialize when you've been enough times to ask. It's the most Denver thing about Denver's food scene.
        </p>
      </section>

      <section className="border-l-2 border-warm-border pl-6">
        <p className="font-body text-bark leading-relaxed">
          Denver isn't a food destination yet in the way that Chicago or Los Angeles is — but the gap is closing faster than most people realize. The neighborhoods above are where you'll find the evidence. Skip the hotel restaurant. Get on the highway, drive fifteen minutes, and eat somewhere that earns it.
        </p>
      </section>

    </article>
  ),
}

const denverRestaurantScene: BlogPost = {
  slug: 'state-of-denvers-restaurant-scene',
  date: 'April 12, 2026',
  isoDate: '2026-04-12',
  title: "The State of Denver's Restaurant Scene",
  subtitle: "More ambition, higher stakes, and a few things worth worrying about.",
  coverImageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&auto=format&fit=crop&q=85',
  coverImageAlt: 'Elegantly plated fine dining dish with delicate garnish',
  body: (
    <article className="space-y-8">

      <p className="font-body text-lg text-bark leading-relaxed">
        Denver's restaurant scene is at an inflection point. The city has spent the last decade building the infrastructure for a serious food culture — the chefs, the suppliers, the diners willing to spend — and the results are starting to show in meaningful ways. But growth at this pace creates its own set of problems, and it's worth being honest about both sides.
      </p>

      <section>
        <h2 className="font-display text-2xl font-bold text-ink mb-3">What's working</h2>
        <img
          src="https://images.unsplash.com/photo-1600891964092-4316c288032e?w=900&auto=format&fit=crop&q=80"
          alt="Chef plating a refined dish in an open kitchen"
          className="w-full rounded-lg mb-5 object-cover aspect-[16/9]"
        />
        <p className="font-body text-bark leading-relaxed mb-4">
          The talent pipeline is real. Denver used to lose its best young cooks to New York, San Francisco, and Chicago. That's still happening — but it's now happening in reverse too. Chefs with serious credentials are choosing Denver deliberately, drawn by lower real estate costs, a dining public that's grown more sophisticated, and the quality of life that the city genuinely offers.
        </p>
        <p className="font-body text-bark leading-relaxed mb-4">
          The local sourcing story has matured considerably. Colorado has always had excellent ranchers and some strong produce out of the San Luis Valley, but the network connecting farmers to restaurant kitchens is now dense enough to matter. The best restaurants in the city aren't just mentioning local sourcing on their menus — they're building dishes around what's available, changing with the seasons in ways that require real kitchen discipline.
        </p>
        <p className="font-body text-bark leading-relaxed">
          Diversity of cuisine has expanded in ways that weren't visible five years ago. The Ethiopian corridor on East Colfax is producing some of the best injera-based cooking outside of the coasts. The Vietnamese scene around Federal Boulevard has reached a level of quality that serious food travelers are starting to notice. These aren't new communities — they've been here for decades — but the broader dining culture is finally paying attention.
        </p>
      </section>

      <section>
        <h2 className="font-display text-2xl font-bold text-ink mb-3">The closures problem</h2>
        <img
          src="https://images.unsplash.com/photo-1555992336-03a23c7b20ee?w=900&auto=format&fit=crop&q=80"
          alt="Empty restaurant chairs stacked on tables"
          className="w-full rounded-lg mb-5 object-cover aspect-[16/9]"
        />
        <p className="font-body text-bark leading-relaxed mb-4">
          Denver has a closure rate problem. Restaurants are opening at a record pace, but so are the casualties. The city's commercial real estate market has tightened dramatically over the past three years, and landlords who were once willing to give a new restaurant time to find its footing are now running tighter leases with less patience.
        </p>
        <p className="font-body text-bark leading-relaxed mb-4">
          The restaurants most at risk aren't the bad ones. The bad ones close quickly and are forgotten. What's harder to watch is the good-but-not-discovered restaurant — the one that needed eighteen months to build a following and only got twelve. Denver has lost several places in this category recently, and the industry is aware of it.
        </p>
        <p className="font-body text-bark leading-relaxed">
          The response from some operators has been to open in less expensive neighborhoods and build slowly. Sunnyside, Globeville, and Elyria-Swansea are all seeing early-stage restaurant activity from chefs who've watched the RiNo model and decided to get ahead of the next wave rather than compete in the current one. It's a reasonable bet.
        </p>
      </section>

      <section>
        <h2 className="font-display text-2xl font-bold text-ink mb-3">The price question</h2>
        <img
          src="https://images.unsplash.com/photo-1578474846511-04ba529f0b88?w=900&auto=format&fit=crop&q=80"
          alt="An elegantly set restaurant table with wine glasses and candles"
          className="w-full rounded-lg mb-5 object-cover aspect-[16/9]"
        />
        <p className="font-body text-bark leading-relaxed mb-4">
          Entree prices at Denver's top restaurants have crossed a threshold that's starting to create friction. A dinner for two at a serious restaurant in RiNo or LoHi — with wine, tax, and a tip that reflects actual kitchen labor — now routinely clears $200. That's not San Francisco pricing, but it's not the Denver of five years ago either.
        </p>
        <p className="font-body text-bark leading-relaxed mb-4">
          The justification is real: labor costs have risen, ingredient costs have risen, and the economics of running a restaurant with any kind of quality control were never particularly forgiving. The chefs who are charging these prices are, mostly, delivering food that earns them. But the market for $85 tasting menus is smaller than the market for $25 pasta, and Denver is currently building faster toward the former.
        </p>
        <p className="font-body text-bark leading-relaxed">
          What balances this is the depth of the mid-range. Denver has a genuinely strong $40-to-$60 per-person tier — restaurants where serious cooking is happening without the ceremony of the high-end. This is where the city is most interesting right now, and most underreported.
        </p>
      </section>

      <section>
        <h2 className="font-display text-2xl font-bold text-ink mb-3">What to watch in 2026</h2>
        <p className="font-body text-bark leading-relaxed mb-4">
          Several chefs with significant national profiles are reported to be in lease negotiations for Denver spaces. Whether they open here matters less than what it signals: Denver has reached the size and spending power that attracts operators who have real options. That's new.
        </p>
        <p className="font-body text-bark leading-relaxed mb-4">
          The breakfast and lunch scene is overdue for a serious upgrade. Denver's dinner options have outpaced its daytime food culture by a considerable margin, and there's an obvious opportunity for chefs willing to build something exceptional around earlier hours. A few are starting to notice.
        </p>
        <p className="font-body text-bark leading-relaxed">
          The city's bar program — long an afterthought — has matured enough to start driving restaurant decisions. Several of the best new openings of the past year have been built around a beverage program first and a food menu second. It's a different kind of ambition, and it's producing some of the most interesting rooms in the city.
        </p>
      </section>

      <section className="border-l-2 border-warm-border pl-6">
        <p className="font-body text-bark leading-relaxed">
          Denver in 2026 is a city that has earned some of its own hype and is now figuring out how to be a real food destination rather than just a city with good restaurants. Those are different things. The next few years will determine which way it goes.
        </p>
      </section>

    </article>
  ),
}

const denverBestRestaurants: BlogPost = {
  slug: 'best-restaurants-in-denver-right-now',
  date: 'April 12, 2026',
  isoDate: '2026-04-12',
  title: 'The Best Restaurants in Denver Right Now',
  subtitle: "Not the most hyped. Not the newest. The ones actually worth your time.",
  coverImageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&auto=format&fit=crop&q=85',
  coverImageAlt: 'Overhead shot of a colorful spread of dishes on a table',
  body: (
    <article className="space-y-8">

      <p className="font-body text-lg text-bark leading-relaxed">
        Every few months, Denver gets a new crop of restaurant openings and the coverage machine dutifully covers them. Some of those places are excellent. Many are not. What follows is a different kind of list — restaurants that have proven themselves over time, that are genuinely great right now, and that are worth going out of your way for.
      </p>

      <section>
        <h2 className="font-display text-2xl font-bold text-ink mb-3">For a special occasion: Ultreia</h2>
        <img
          src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=900&auto=format&fit=crop&q=80"
          alt="Spanish pintxos and charcuterie board with wine at a fine dining restaurant"
          className="w-full rounded-lg mb-5 object-cover aspect-[16/9]"
        />
        <p className="font-body text-bark leading-relaxed mb-4">
          Ultreia in Union Station is one of those rare restaurants that pulls off both the food and the room equally well. The Spanish-influenced menu centers on pintxos, charcuterie, and wood-fired dishes that reward lingering. It's the kind of place that earns repeat visits — you're not going back because it's trendy, you're going back because there are still dishes you haven't tried.
        </p>
        <p className="font-body text-bark leading-relaxed">
          Book in advance. The dining room fills on weeknights and the bar, while excellent for solo dining, doesn't take reservations. The wine list leans heavily Iberian and is one of the better curated lists in the city.
        </p>
      </section>

      <section>
        <h2 className="font-display text-2xl font-bold text-ink mb-3">Best sushi in Denver: Sushi-Rama / Ototo</h2>
        <img
          src="https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=900&auto=format&fit=crop&q=80"
          alt="Fresh nigiri sushi arranged on a wooden board"
          className="w-full rounded-lg mb-5 object-cover aspect-[16/9]"
        />
        <p className="font-body text-bark leading-relaxed mb-4">
          Denver's sushi scene has matured considerably in recent years. Ototo in LoHi handles the omakase end with precision and a sourcing story that holds up — the fish quality is the conversation here, not the setting. For a more casual experience, Sushi-Rama's conveyor belt format is genuinely fun without sacrificing quality, which is a harder trick than it looks.
        </p>
        <p className="font-body text-bark leading-relaxed">
          If you're making a dedicated trip for sushi, Ototo is the right call. If you're with a group that has mixed enthusiasm for raw fish, Sushi-Rama keeps everyone engaged. Both are significantly better than anything in the tourist corridors downtown.
        </p>
      </section>

      <section>
        <h2 className="font-display text-2xl font-bold text-ink mb-3">Best tacos in Denver: El Taco de Mexico</h2>
        <img
          src="https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=900&auto=format&fit=crop&q=80"
          alt="Street-style tacos with fresh cilantro, onion, and lime"
          className="w-full rounded-lg mb-5 object-cover aspect-[16/9]"
        />
        <p className="font-body text-bark leading-relaxed mb-4">
          El Taco de Mexico on Santa Fe has been around for decades and would rank among the best taquerias in any American city. The green chile is the reason to go — thick, smoky, and built for the altitude — but the breakfast burritos have their own devoted following that is not wrong. Cash only, counter service, no frills. The line moves.
        </p>
        <p className="font-body text-bark leading-relaxed">
          Denver's Mexican food options along Santa Fe and Federal are collectively underrated by the food media, which tends to focus on the neighborhoods north of downtown. El Taco de Mexico is the easiest entry point and the one most locals point newcomers toward first.
        </p>
      </section>

      <section>
        <h2 className="font-display text-2xl font-bold text-ink mb-3">Best pizza in Denver: Blue Pan Pizza</h2>
        <img
          src="https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=900&auto=format&fit=crop&q=80"
          alt="Detroit-style deep dish pizza with crispy cheese edges"
          className="w-full rounded-lg mb-5 object-cover aspect-[16/9]"
        />
        <p className="font-body text-bark leading-relaxed mb-4">
          Blue Pan is making Detroit-style pizza — square, thick, with the cheese and sauce layered in the opposite order from what you expect — and doing it as well as anywhere in the country. The crust is the thing: crispy and almost caramelized at the edges from contact with the pan, soft and open-crumbed in the center. Order the Via Italia and don't apologize for the calories.
        </p>
        <p className="font-body text-bark leading-relaxed">
          There are multiple locations now, with the Jefferson Park original still the best experience. Takeout holds better than most pizzas, but eating in the room is worth doing at least once. The lunch specials are quietly one of the better deals in the city.
        </p>
      </section>

      <section>
        <h2 className="font-display text-2xl font-bold text-ink mb-3">Best brunch in Denver: Mercantile Dining & Provision</h2>
        <img
          src="https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=900&auto=format&fit=crop&q=80"
          alt="A seasonal brunch spread with eggs, toast, and fresh produce"
          className="w-full rounded-lg mb-5 object-cover aspect-[16/9]"
        />
        <p className="font-body text-bark leading-relaxed mb-4">
          Mercantile inside Union Station approaches brunch the way a serious chef should: seasonal ingredients, thoughtful technique, and a menu that changes with what's actually available rather than defaulting to the same eggs Benedict rotation all year. Alex Seidel's farm-to-table ethos isn't marketing here — it shows up in the food.
        </p>
        <p className="font-body text-bark leading-relaxed">
          The room is beautiful, which helps. Union Station's main hall remains one of the great public spaces in Denver, and Mercantile captures some of that energy without being overwhelmed by it. Make a reservation on weekends; walk-in availability is limited and the wait is real.
        </p>
      </section>

      <section className="border-l-2 border-warm-border pl-6">
        <p className="font-body text-bark leading-relaxed">
          The best restaurant in Denver is always a moving target — the city is opening too many genuinely good places for any single answer to stay current. But the restaurants above have earned their places over time, not just on opening night. That's a different kind of recommendation, and a more reliable one.
        </p>
      </section>

    </article>
  ),
}

const denverGreenChile: BlogPost = {
  slug: 'denver-green-chile-guide',
  date: 'April 12, 2026',
  isoDate: '2026-04-12',
  title: "Denver's Green Chile: A Guide to the City's Defining Dish",
  subtitle: "Colorado's most fiercely debated food, and where to find the best version of it.",
  coverImageUrl: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=1200&auto=format&fit=crop&q=85',
  coverImageAlt: 'Close-up of street tacos with fresh green salsa and cilantro',
  body: (
    <article className="space-y-8">

      <p className="font-body text-lg text-bark leading-relaxed">
        If you want to start an argument in Denver, bring up green chile. Not whether it's good — everyone agrees on that — but whose is best, whether pork belongs in it, and what exactly separates Colorado green chile from New Mexico's. These are the debates that matter here. This guide is not going to settle them. It is going to help you eat well while you form your own opinion.
      </p>

      <section>
        <h2 className="font-display text-2xl font-bold text-ink mb-3">What makes Colorado green chile different</h2>
        <img
          src="https://images.unsplash.com/photo-1601648764658-cf37e8c89b70?w=900&auto=format&fit=crop&q=80"
          alt="Fresh Hatch green chiles roasting over an open flame"
          className="w-full rounded-lg mb-5 object-cover aspect-[16/9]"
        />
        <p className="font-body text-bark leading-relaxed mb-4">
          Colorado green chile tends to be thicker and pork-forward compared to New Mexico's versions, which often run thinner and prioritize the chile itself above everything else. Colorado cooks typically build on a roux or flour base, add chunks of pork shoulder or green chile pork, and finish with roasted Pueblo or Hatch chiles. The result is closer to a stew than a sauce.
        </p>
        <p className="font-body text-bark leading-relaxed mb-4">
          The Pueblo chile is the local pride here. Grown in the Arkansas River Valley, Pueblo chiles have a fruitiness and moderate heat that holds up well to the long cooking times Colorado green chile requires. When a Denver restaurant advertises Pueblo chiles specifically, it usually means someone in the kitchen cares about the details.
        </p>
        <p className="font-body text-bark leading-relaxed">
          Hatch chiles from New Mexico are also common and are not a compromise — they're excellent. The difference is regional loyalty as much as flavor. Both produce great green chile. The debate is mostly theater, which is part of why it's so enjoyable.
        </p>
      </section>

      <section>
        <h2 className="font-display text-2xl font-bold text-ink mb-3">Where to eat green chile in Denver</h2>
        <img
          src="https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=900&auto=format&fit=crop&q=80"
          alt="A green chile smothered breakfast burrito on a plate"
          className="w-full rounded-lg mb-5 object-cover aspect-[16/9]"
        />
        <p className="font-body text-bark leading-relaxed mb-4">
          <strong className="font-semibold text-ink">My Brother's Bar</strong> on Platte Street has been serving green chile since the 1970s and remains one of the most consistent versions in the city. Order it smothered over a green chile cheeseburger and eat it at the bar. The room has no televisions, which is a feature.
        </p>
        <p className="font-body text-bark leading-relaxed mb-4">
          <strong className="font-semibold text-ink">El Taco de Mexico</strong> on Santa Fe is already listed in our best restaurants guide, and its green chile earns a second mention. The version here is closer to the traditional Colorado style — thick, porky, and with a smoke level that varies pleasantly by batch. It's best as a burrito smother or on the side as a dipping sauce.
        </p>
        <p className="font-body text-bark leading-relaxed mb-4">
          <strong className="font-semibold text-ink">Chubby's</strong> has multiple locations and a devoted following that has endured for decades. The green chile here is served around the clock at several locations, which matters when you want it at 2 am. Quality is high and consistent in a way that's hard to maintain at scale.
        </p>
        <p className="font-body text-bark leading-relaxed">
          <strong className="font-semibold text-ink">Santiago's</strong> is the chain that Denverites become evangelical about when they move away. The green chile is made in large batches and has a specific flavor profile — slightly tangy, moderately hot, with a texture that works particularly well in burritos — that is not replicated by its competitors. The locations are no-frills and fast. That's the point.
        </p>
      </section>

      <section>
        <h2 className="font-display text-2xl font-bold text-ink mb-3">How to order it</h2>
        <img
          src="https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=900&auto=format&fit=crop&q=80"
          alt="Green chile poured over a smothered burrito with sour cream and cheese"
          className="w-full rounded-lg mb-5 object-cover aspect-[16/9]"
        />
        <p className="font-body text-bark leading-relaxed mb-4">
          "Smothered" is the key word. Green chile in Denver is most commonly encountered as a smothering sauce — draped over a burrito, a breakfast plate, or a cheeseburger — rather than served in a bowl on its own. When you order something smothered, you're specifying that the green chile goes over the top with cheese on top of that. It's a commitment, and it's correct.
        </p>
        <p className="font-body text-bark leading-relaxed mb-4">
          Heat levels vary significantly by restaurant and by batch. "Hot" at one place might be mild at another. If you have a heat threshold, ask. Locals will tell you the heat level without being annoying about it. If someone is being annoying about it, you're probably in the wrong restaurant.
        </p>
        <p className="font-body text-bark leading-relaxed">
          Green chile as a bowl of soup — which some Denver places offer, particularly at brunch — is underrated as a format. A generous bowl with a side of warm flour tortillas is a complete meal and a better hangover cure than anything a pharmacy sells.
        </p>
      </section>

      <section>
        <h2 className="font-display text-2xl font-bold text-ink mb-3">The green chile burrito, ranked by neighborhood</h2>
        <p className="font-body text-bark leading-relaxed mb-4">
          Every Denver neighborhood has a green chile burrito it considers its own. Federal Boulevard has the density — block after block of Mexican restaurants with their own house chiles and their own loyal regulars. The competition keeps quality up. Santa Fe Drive overlaps with Federal geographically and in quality, with a slightly higher concentration of old-school Colorado-style spots.
        </p>
        <p className="font-body text-bark leading-relaxed mb-4">
          RiNo and LoHi have green chile on menus too, often in slightly elevated formats — house-made tortillas, heritage pork, small-batch chiles sourced from specific farms. The quality is real but the price reflects it. Whether that trade-off makes sense depends on how you feel about paying $18 for a burrito.
        </p>
        <p className="font-body text-bark leading-relaxed">
          The honest answer is that the best green chile burrito in Denver is probably at a counter-service spot on Federal that doesn't have a website, accepts cash only, and makes about forty of them before they sell out. Finding it is part of the experience.
        </p>
      </section>

      <section className="border-l-2 border-warm-border pl-6">
        <p className="font-body text-bark leading-relaxed">
          Green chile is the taste of Denver in a way that no other dish quite captures. It's comfort food with real heat, tied to a specific geography, and made differently by every cook who attempts it. If you're visiting the city, eating it is not optional. If you live here, you already know this.
        </p>
      </section>

    </article>
  ),
}

const denverSuburbs: BlogPost = {
  slug: 'best-denver-suburbs-for-food',
  date: 'April 12, 2026',
  isoDate: '2026-04-12',
  title: 'The Best Denver Suburbs for Food',
  subtitle: "You don't have to drive into the city for a great meal. Here's where to eat in the suburbs.",
  coverImageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&auto=format&fit=crop&q=85',
  coverImageAlt: 'Warm and busy restaurant dining room with hanging lights',
  body: (
    <article className="space-y-8">

      <p className="font-body text-lg text-bark leading-relaxed">
        Denver gets the attention, but the suburbs surrounding it have quietly developed food scenes that rival — and occasionally beat — what you'll find inside city limits. Whether you're based in the metro area or visiting with a rental car, these are the Denver suburbs most worth eating in, and the restaurants that make them worth the drive.
      </p>

      <section>
        <h2 className="font-display text-2xl font-bold text-ink mb-1">Lakewood</h2>
        <p className="font-body text-sm text-sand mb-4">West of Denver · 15–20 min from downtown</p>
        <img
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&auto=format&fit=crop&q=80"
          alt="Beautifully plated pasta dish with fresh herbs"
          className="w-full rounded-lg mb-5 object-cover aspect-[16/9]"
        />
        <p className="font-body text-bark leading-relaxed mb-4">
          Lakewood is the most underrated food suburb in the Denver metro. The Belmar district has evolved into a legitimate dining destination over the past five years, with a concentration of independent restaurants that punch well above what you'd expect from a suburban shopping district. The rents are lower than RiNo, which means chefs can take risks that aren't available to them closer to downtown.
        </p>
        <p className="font-body text-bark leading-relaxed mb-4">
          The Vietnamese and Korean options along Wadsworth Boulevard are among the best in the metro — long-established family restaurants that have been serving the same excellent food for decades without needing a food media write-up. Pho 79, in particular, has a broth program that rivals anything in the city.
        </p>
        <p className="font-body text-bark leading-relaxed">
          <strong className="text-ink">What to order in Lakewood:</strong> The pho at Pho 79, wood-fired pizza at Belmar, and the Korean barbecue options along the Wadsworth corridor. Saturday lunch is the move — crowds are lighter than weekend dinners and the kitchens are fresher.
        </p>
      </section>

      <section>
        <h2 className="font-display text-2xl font-bold text-ink mb-1">Littleton</h2>
        <p className="font-body text-sm text-sand mb-4">South of Denver · 20–25 min from downtown</p>
        <img
          src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=900&auto=format&fit=crop&q=80"
          alt="Intimate restaurant interior with exposed brick and warm candlelight"
          className="w-full rounded-lg mb-5 object-cover aspect-[16/9]"
        />
        <p className="font-body text-bark leading-relaxed mb-4">
          Historic downtown Littleton is one of the genuinely pleasant surprises in the Denver suburbs. The Main Street corridor has a walkable, small-town feel that supports independent restaurants rather than driving them out. Several chefs have chosen Littleton specifically because the neighborhood attracts a loyal local following that supports year-round consistency.
        </p>
        <p className="font-body text-bark leading-relaxed mb-4">
          The Italian and American dining options in downtown Littleton are the strongest category — a handful of places doing handmade pasta and wood-fired cooking at a quality level that would earn attention anywhere in Denver. The price points are also notably more reasonable, which is the suburban advantage at its clearest.
        </p>
        <p className="font-body text-bark leading-relaxed">
          <strong className="text-ink">What to order in Littleton:</strong> Handmade pasta at any of the Main Street Italian spots, craft burgers, and weekend brunch at the neighborhood restaurants that skip the wait times you'd face in LoHi. The area also has a strong coffee scene if you're starting your day here.
        </p>
      </section>

      <section>
        <h2 className="font-display text-2xl font-bold text-ink mb-1">Englewood</h2>
        <p className="font-body text-sm text-sand mb-4">South of Denver · 15 min from downtown</p>
        <img
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&auto=format&fit=crop&q=80"
          alt="Colorful spread of diverse food dishes on a restaurant table"
          className="w-full rounded-lg mb-5 object-cover aspect-[16/9]"
        />
        <p className="font-body text-bark leading-relaxed mb-4">
          Englewood doesn't have the reputation of some of its neighboring suburbs, but the South Broadway corridor — which bleeds between Denver proper and Englewood — contains some of the most interesting eating in the metro. The border is blurry enough that locals don't always distinguish between them, which works in Englewood's favor.
        </p>
        <p className="font-body text-bark leading-relaxed mb-4">
          The diversity of cuisine along South Broadway is the draw. Ethiopian, Mexican, Thai, and American comfort food coexist within blocks of each other at price points that reflect the neighborhood's character rather than its proximity to trendier areas. This is where Denver food people eat when they don't feel like performing.
        </p>
        <p className="font-body text-bark leading-relaxed">
          <strong className="text-ink">What to order in Englewood:</strong> Ethiopian platters along the South Broadway corridor, late-night bar food at the spots that stay open past midnight, and the green chile at any of the New Mexican-influenced diners that have anchored the neighborhood for years.
        </p>
      </section>

      <section>
        <h2 className="font-display text-2xl font-bold text-ink mb-1">Aurora</h2>
        <p className="font-body text-sm text-sand mb-4">East of Denver · 20–30 min from downtown</p>
        <img
          src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=900&auto=format&fit=crop&q=80"
          alt="A spread of international street food dishes with vibrant colors"
          className="w-full rounded-lg mb-5 object-cover aspect-[16/9]"
        />
        <p className="font-body text-bark leading-relaxed mb-4">
          Aurora is the most important food suburb in the Denver metro for anyone serious about eating well across cuisines. The city is home to one of the most ethnically diverse populations in Colorado, and that diversity has produced an extraordinary concentration of authentic international restaurants that the food media has been slow to cover.
        </p>
        <p className="font-body text-bark leading-relaxed mb-4">
          The stretch of Havana Street running through central Aurora is a destination in its own right. Somali, Burmese, Ethiopian, Vietnamese, and Mexican restaurants sit within blocks of each other, many of them family-run operations that have been feeding their communities for a decade or more without needing outside validation. The Burmese options in particular — tea leaf salads, mohinga, and the fermented dishes that don't appear on menus anywhere else in Colorado — are worth a dedicated trip.
        </p>
        <p className="font-body text-bark leading-relaxed">
          <strong className="text-ink">What to order in Aurora:</strong> Burmese tea leaf salad (laphet thoke) at any of the Burmese spots on Havana, Somali goat rice (bariis iskukaris), Vietnamese pho and banh mi from the Federal corridor, and the authentic Mexican birria that doesn't make it onto menus closer to downtown.
        </p>
      </section>

      <section>
        <h2 className="font-display text-2xl font-bold text-ink mb-1">Westminster</h2>
        <p className="font-body text-sm text-sand mb-4">Northwest of Denver · 20–25 min from downtown</p>
        <img
          src="https://images.unsplash.com/photo-1600891964092-4316c288032e?w=900&auto=format&fit=crop&q=80"
          alt="Chef presenting a refined plate at a suburban fine dining restaurant"
          className="w-full rounded-lg mb-5 object-cover aspect-[16/9]"
        />
        <p className="font-body text-bark leading-relaxed mb-4">
          Westminster has historically been suburban sprawl in the least interesting sense — chain restaurants and strip malls with a few independent spots scattered throughout. That's changing. The Orchard Town Center area and the older sections of Westminster near Federal Boulevard have attracted a newer generation of independent restaurants, and the results are starting to matter.
        </p>
        <p className="font-body text-bark leading-relaxed mb-4">
          The Indian food options in Westminster are the strongest case for the suburb's food credibility. A cluster of South Asian restaurants near Federal and 92nd Ave represents some of the most technically accomplished Indian cooking in the metro — dishes built for an audience that knows the cuisine rather than menus softened for the suburban mainstream.
        </p>
        <p className="font-body text-bark leading-relaxed">
          <strong className="text-ink">What to order in Westminster:</strong> Indian curries and biryanis from the Federal Boulevard corridor, dim sum on weekend mornings, and the newer farm-to-table spots near the Orchard area that are building the suburb's next chapter.
        </p>
      </section>

      <section>
        <h2 className="font-display text-2xl font-bold text-ink mb-3">The case for suburban eating</h2>
        <p className="font-body text-bark leading-relaxed mb-4">
          The argument for eating in Denver's suburbs isn't that the food is better than what's available in RiNo or LoHi. At the highest level, the city still has the edge. The argument is about value, authenticity, and access to cuisines that the city's food media has systematically ignored.
        </p>
        <p className="font-body text-bark leading-relaxed">
          A $14 bowl of Burmese tea leaf salad in Aurora represents a higher level of culinary craft than a $22 small plate in a RiNo restaurant optimized for Instagram. The Denver metro's best international eating is almost entirely in the suburbs, and that's worth knowing before you plan your next meal.
        </p>
      </section>

      <section className="border-l-2 border-warm-border pl-6">
        <p className="font-body text-bark leading-relaxed">
          The Denver suburbs don't need your discovery to keep being good. The restaurants in Aurora and Lakewood and Englewood have been feeding their communities for years without food media attention. But if you're looking for the most interesting eating in the metro — the kind that comes from real culinary traditions rather than trend cycles — the suburbs are where to look.
        </p>
      </section>

    </article>
  ),
}

export const blogPosts: BlogPost[] = [denverNeighborhoods, denverRestaurantScene, denverBestRestaurants, denverGreenChile, denverSuburbs]
