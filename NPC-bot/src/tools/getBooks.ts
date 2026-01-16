import { Autonomous, z } from "@botpress/runtime";

// Auto-generated from /src/pages/library/reading-list.ts
// Run: npx tsx scripts/sync-bot-data.ts
const BOOKS = [
  {
    "title": "Foundation",
    "author": "Isaac Asimov",
    "status": "Reading"
  },
  {
    "title": "An Elegant Puzzle: Systems of Engineering Management",
    "author": "Will Larson",
    "status": "Finished"
  },
  {
    "title": "The Dark Forest",
    "author": "Cixin Liu",
    "status": "Finished"
  },
  {
    "title": "My years at general motors",
    "author": "Alfred P. Sloan",
    "status": "Have not started"
  },
  {
    "title": "Thinking Fast and Slow",
    "author": "Daniel Kahneman",
    "status": "Finished"
  },
  {
    "title": "Permutation City",
    "author": "Greg Egan",
    "status": "Postponed"
  },
  {
    "title": "One, Two, Three...Infinity",
    "author": "George Gamow",
    "status": "Have not started"
  },
  {
    "title": "The Game: Penetrating the Secret Society of Pickup Artists",
    "author": "Neil Strauss",
    "status": "Finished"
  },
  {
    "title": "The Black Swan: The Impact of the Highly Improbable",
    "author": "Nassim Nicholas Taleb",
    "status": "Finished"
  },
  {
    "title": "Fooled by Randomness: The Hidden Role of Chance in Life and in the Markets",
    "author": "Nassim Nicholas Taleb",
    "status": "Later"
  },
  {
    "title": "Anti-fragile",
    "author": "Nassim Nicholas Taleb",
    "status": "Postponed"
  },
  {
    "title": "Love and Math: The Heart of Hidden Reality",
    "author": "Edward Frenkel",
    "status": "Postponed"
  },
  {
    "title": "FLOW",
    "author": "Mihaly Csikszentmihalyi",
    "status": "Later"
  },
  {
    "title": "Neural network and deep learning",
    "author": "Nielsen",
    "status": "Later"
  },
  {
    "title": "The Neatest Little Guide to Stock Market Investing",
    "author": "Unknown",
    "status": "Later"
  },
  {
    "title": "Influence",
    "author": "Robert B. Cialdini",
    "status": "Finished"
  },
  {
    "title": "Mans search for meaning",
    "author": "Victor E Frankl",
    "status": "Finished"
  },
  {
    "title": "The Almanack of Naval Ravikant: A Guide to Wealth and Happiness",
    "author": "Eric Jorgenson",
    "status": "Have not started"
  },
  {
    "title": "The origin of species",
    "author": "Charles Darwin",
    "status": "Postponed"
  },
  {
    "title": "The lessons of history",
    "author": "Ariel Durant, Will Durant",
    "status": "Finished"
  },
  {
    "title": "Surely You’re Joking, Mr. Feynman!”: Adventures of a Curious Character",
    "author": "Richard Feynman",
    "status": "Finished"
  },
  {
    "title": "The beginning of infinity",
    "author": "David Deutsch",
    "status": "Have not started"
  },
  {
    "title": "Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones",
    "author": "James Clear",
    "status": "Finished"
  },
  {
    "title": "The Pillars of the Earth",
    "author": "Ken Follett",
    "status": "Have not started"
  },
  {
    "title": "Letting Go: The Pathway of Surrender",
    "author": "David R. Hawkins",
    "status": "Have not started"
  },
  {
    "title": "The Art of Manipulation: How to Get Anybody to Do ..",
    "author": "Omar Johnson",
    "status": "Have not started"
  },
  {
    "title": "Hold Me Tight",
    "author": "Sue Johnson",
    "status": "Have not started"
  },
  {
    "title": "Creativity, Inc.: Overcoming the Unseen Forces That Stand in the Way of True Inspiration",
    "author": "Amy Wallace, Edwin Catmull",
    "status": "Have not started"
  },
  {
    "title": "Anything You Want: 40 Lessons for a New Kind of Entrepreneur",
    "author": "Derek Sivers",
    "status": "Have not started"
  },
  {
    "title": "Tales from Both Sides of the Brain: A Life in Neuroscience",
    "author": "Michael Gazzaniga",
    "status": "Have not started"
  },
  {
    "title": "Awaken the Giant Within",
    "author": "Tony Robbins",
    "status": "Have not started"
  },
  {
    "title": "Seeking Wisdom: From Darwin to Munger",
    "author": "Peter Bevelin",
    "status": "Have not started"
  },
  {
    "title": "Without Their Permission: How the 21st Century Will Be Made, Not Managed",
    "author": "Alexis Ohanian",
    "status": "Have not started"
  },
  {
    "title": "Stumbling on Happiness",
    "author": "Daniel Gilbert",
    "status": "Have not started"
  },
  {
    "title": "Words That Work: It's Not What You Say, It's What People Hear",
    "author": "Frank Luntz",
    "status": "Have not started"
  },
  {
    "title": "The Biggest Bluff: How I Learned to Pay Attention, Master Myself, and Win",
    "author": "Maria Konnikova",
    "status": "Have not started"
  },
  {
    "title": "Tools of Titans",
    "author": "Tim Ferris",
    "status": "Postponed"
  },
  {
    "title": "The Beak of the Finch: A Story of Evolution in Our Time",
    "author": "Jonathan Weiner",
    "status": "Have not started"
  },
  {
    "title": "Biology as ideology: The doctrine of DNA",
    "author": "Richard Lewontin",
    "status": "Have not started"
  },
  {
    "title": "The Triple Helix",
    "author": "Unknown",
    "status": "Have not started"
  },
  {
    "title": "How Emotions Are Made: The Secret Life of the Brain",
    "author": "Lisa Feldman Barett",
    "status": "Have not started"
  },
  {
    "title": "Ikigai: The Japanese Secret to a Long and Happy Life",
    "author": "Albert Liebermann, Hector Garcia",
    "status": "Postponed"
  },
  {
    "title": "Homo Deus",
    "author": "Yuval Noah Harari",
    "status": "Finished"
  },
  {
    "title": "Brave new world",
    "author": "Unknown",
    "status": "Finished"
  },
  {
    "title": "21 Lessons for the 21st century",
    "author": "Yuval Noah Harari",
    "status": "Finished"
  },
  {
    "title": "In the Realm of Hungry Ghosts: Close Encounters with Addiction",
    "author": "Gabor Mate",
    "status": "Have not started"
  },
  {
    "title": "Dhammapada",
    "author": "Scripture",
    "status": "Have not started"
  },
  {
    "title": "Making sense",
    "author": "Sam Harris",
    "status": "Have not started"
  },
  {
    "title": "The Drama of the Gifted Child",
    "author": "Alice Miller",
    "status": "Have not started"
  },
  {
    "title": "Make good art",
    "author": "Neil Gaiman",
    "status": "Finished"
  },
  {
    "title": "Death’s end",
    "author": "Cixin Liu",
    "status": "Finished"
  },
  {
    "title": "Extreme Ownership",
    "author": "Jocko Willink",
    "status": "Later"
  },
  {
    "title": "Zero to one",
    "author": "Peter Thiel",
    "status": "Finished"
  },
  {
    "title": "The Rational Optimist: How Prosperity Evolves",
    "author": "Matt Ridley",
    "status": "Finished"
  },
  {
    "title": "The Thoughts of the Emperor M. Aurelius Antoninus",
    "author": "Marcus Aurelius",
    "status": "Postponed"
  },
  {
    "title": "Reality Is Not What It Seems",
    "author": "Carlo Rovelli",
    "status": "Have not started"
  },
  {
    "title": "Wind, Sand and Stars",
    "author": "Antoine de Saint-Exupéry",
    "status": "Finished"
  },
  {
    "title": "Love Yourself Like Your Life Depends on It",
    "author": "Kamal Ravikant",
    "status": "Have not started"
  },
  {
    "title": "Economics in One Lesson",
    "author": "Harper & Brothers",
    "status": "Have not started"
  },
  {
    "title": "The Elephant in the Brain",
    "author": "Kevin Simler, Robin Hanson",
    "status": "Finished"
  },
  {
    "title": "This is water",
    "author": "David Foster Wallace",
    "status": "Finished"
  },
  {
    "title": "Sum: Forty Tales from the Afterlives",
    "author": "David Eagleman",
    "status": "Have not started"
  },
  {
    "title": "The Book Thief",
    "author": "Markus Zusak",
    "status": "Finished"
  },
  {
    "title": "How the Internet Happened: From Netscape to the IPhone",
    "author": "Brian McCullough",
    "status": "Have not started"
  },
  {
    "title": "What I Learned Losing a Million Dollars",
    "author": "Jim Paul",
    "status": "Finished"
  },
  {
    "title": "Orwell's revenge",
    "author": "Peter W. Huber",
    "status": "Have not started"
  },
  {
    "title": "Men, machines, and modern times",
    "author": "Elting E. Morison",
    "status": "Have not started"
  },
  {
    "title": "The Ancient City: A Study on the Religion, Laws, and Institutions of Greece and Rome",
    "author": "Prof Numa Denis Fustel De Coulanges",
    "status": "Have not started"
  },
  {
    "title": "The WEIRDest People in the World",
    "author": "Joseph Henrich",
    "status": "Later"
  },
  {
    "title": "The Machiavellians, defenders of freedom",
    "author": "James Burnham",
    "status": "Have not started"
  },
  {
    "title": "The Revolt of the Public and the Crisis of Authority",
    "author": "Martin Gurri",
    "status": "Have not started"
  },
  {
    "title": "The Cold Start Problem",
    "author": "Andrew Chen",
    "status": "Finished"
  },
  {
    "title": "Snow Crash",
    "author": "Neal Stephenson",
    "status": "Finished"
  },
  {
    "title": "Dream Physocology",
    "author": "Sigmund Freud",
    "status": "Have not started"
  },
  {
    "title": "The Art of War",
    "author": "Sun Tzu",
    "status": "Have not started"
  },
  {
    "title": "How to win friends and influence people",
    "author": "Dale Carnegie",
    "status": "Later"
  },
  {
    "title": "The right stuff",
    "author": "Tom wolfe",
    "status": "Have not started"
  },
  {
    "title": "One hundred years of solitude",
    "author": "Gabriel García Márquez",
    "status": "Have not started"
  },
  {
    "title": "The Truce",
    "author": "Primo Levi",
    "status": "Have not started"
  },
  {
    "title": "If this is a man",
    "author": "Primo Levi",
    "status": "Have not started"
  },
  {
    "title": "The Most Important Thing: Uncommon Sense for the Thoughtful Investor",
    "author": "Howard S. Marks",
    "status": "Have not started"
  },
  {
    "title": "The begining of infinity",
    "author": "David Deutsch",
    "status": "Have not started"
  },
  {
    "title": "The Fourth Turning: An American Prophecy - What the Cycles of History Tell Us About America's Next Rendezvous with Destiny",
    "author": "Neil Howe, William Strauss",
    "status": "Have not started"
  },
  {
    "title": "As a Man Thinketh",
    "author": "James Allen",
    "status": "Have not started"
  },
  {
    "title": "Leave it to Psmith",
    "author": "P. G. Wodehouse",
    "status": "Have not started"
  },
  {
    "title": "Turbo Capitalism: Winners and Losers in the Global Economy",
    "author": "Edward Luttwak",
    "status": "Have not started"
  },
  {
    "title": "The War of Art: Break Through the Blocks and Win Your Inner Creative Battles",
    "author": "Steven Pressfield",
    "status": "Finished"
  },
  {
    "title": "10% Happier: How I Tamed the Voice in My Head, Reduced Stress Without Losing My Edge, and Found Self-Help That Actually Works--A True Story",
    "author": "Dan Harris",
    "status": "Finished"
  },
  {
    "title": "Build: An Unorthodox Guide to Making Things Worth Making",
    "author": "Tony Fadell",
    "status": "Have not started"
  },
  {
    "title": "The Scout Mindset: Why Some People See Things Clearly and Others Don't",
    "author": "Julia Galef",
    "status": "Finished"
  },
  {
    "title": "Inadequate Equilibria: Where and How Civilizations Get Stuck",
    "author": "Eliezer Yudkowsky",
    "status": "Have not started"
  },
  {
    "title": "Awareness",
    "author": "Anthony de Mello",
    "status": "Have not started"
  },
  {
    "title": "Three body problem",
    "author": "Cixin Liu",
    "status": "Finished"
  },
  {
    "title": "Dune",
    "author": "Frank Herbert",
    "status": "Have not started"
  },
  {
    "title": "a hitchhiker's guide to the galaxy",
    "author": "Douglas Adams, Eoin Colfer, Thomas Tidholm",
    "status": "Finished"
  },
  {
    "title": "The illustrated man",
    "author": "Ray Bradbury",
    "status": "Finished"
  },
  {
    "title": "Fahrenheit 451",
    "author": "Ray Bradbury",
    "status": "Finished"
  },
  {
    "title": "The Symposium",
    "author": "Plato",
    "status": "Have not started"
  },
  {
    "title": "Creative Selection: Inside Apple's Design Process During the Golden Age of Steve Jobs",
    "author": "Ken Kocienda",
    "status": "Have not started"
  },
  {
    "title": "Reality Is Not What It Seems",
    "author": "Carlo Rovelli",
    "status": "Have not started"
  },
  {
    "title": "Why Greatness Cannot Be Planned: The Myth of the Objective",
    "author": "Joel Lehman, Kenneth O. Stanley",
    "status": "Have not started"
  },
  {
    "title": "The Things You Can See Only When You Slow Down: How to Be Calm in a Busy World",
    "author": "Haemin Sunim",
    "status": "Have not started"
  },
  {
    "title": "More Money Than God",
    "author": "Sebastian Mallaby",
    "status": "Have not started"
  },
  {
    "title": "Hiroshima diary",
    "author": "Michihiko Hachiya",
    "status": "Have not started"
  },
  {
    "title": "The Wayfinders",
    "author": "Wade Davis",
    "status": "Have not started"
  },
  {
    "title": "The Pleasure Of Finding Things Out",
    "author": "Richard Feynman",
    "status": "Have not started"
  },
  {
    "title": "The Third Door: The Wild Quest to Uncover How the World's Most Successful People Launched Their Careers",
    "author": "Alex Banayan",
    "status": "Finished"
  },
  {
    "title": "Maker of Patterns: An Autobiography Through Letters",
    "author": "Freeman Dyson",
    "status": "Have not started"
  },
  {
    "title": "Total Immersion: A Revolutionary Way to Swim Better and Faster",
    "author": "John Delves, Terry Laughlin",
    "status": "Have not started"
  },
  {
    "title": "The Fine Art of Small Talk: How to Start a Conversation, Keep It Going, Build Networking Skills – and Leave a Positive Impression!",
    "author": "Debra Fine",
    "status": "Have not started"
  },
  {
    "title": "The Phoenix Project: A Novel About IT, DevOps, and Helping Your Business Win",
    "author": "Gene Kim, George Spafford, Kevin Behr",
    "status": "Have not started"
  },
  {
    "title": "Love for Imperfect Things: How to Accept Yourself in a World Striving for Perfection",
    "author": "Haemin Sunim",
    "status": "Have not started"
  },
  {
    "title": "The Things You Can See Only When You Slow Down: Guidance on the Path to Mindfulness from a Spiritual Leader",
    "author": "Haemin Sunim",
    "status": "Have not started"
  },
  {
    "title": "Principles For Dealing With the Changing World Order: Why Nations Succeed and Fail",
    "author": "Ray Dalio",
    "status": "Later"
  },
  {
    "title": "Shoe Dog: A Memoir by the Creator of Nike",
    "author": "Phil Knight",
    "status": "Finished"
  },
  {
    "title": "The selfish gene",
    "author": "Richard Dawkins",
    "status": "Have not started"
  },
  {
    "title": "Contact",
    "author": "Carl Sagan",
    "status": "Later"
  },
  {
    "title": "The google story",
    "author": "David A. Vise",
    "status": "Finished"
  },
  {
    "title": "Unreasonable Hospitality: The Remarkable Power of Giving People More Than They Expect",
    "author": "Will Guidara",
    "status": "Have not started"
  },
  {
    "title": "Deep Simplicity: Bringing Order to Chaos and Complexity",
    "author": "John Gribbin",
    "status": "Have not started"
  },
  {
    "title": "Einstein's Dreams",
    "author": "Alan Lightman",
    "status": "Finished"
  },
  {
    "title": "Albert Einstein: The Man, the Genius, and the Theory of Relativity",
    "author": "Walter Isaacson",
    "status": "Have not started"
  },
  {
    "title": "Steve Jobs",
    "author": "Walter Isaacson",
    "status": "Finished"
  },
  {
    "title": "Creative Act: A Method of Being",
    "author": "Barbara R Connell",
    "status": "Have not started"
  },
  {
    "title": "Wanting: The Power of Mimetic Desire in Everyday Life",
    "author": "Luke Burgis",
    "status": "Finished"
  },
  {
    "title": "The Idiot",
    "author": "Fyodor Dostoyevsky",
    "status": "Have not started"
  },
  {
    "title": "Night dawn the accident",
    "author": "Elie Wiesel",
    "status": "Finished"
  },
  {
    "title": "Logical chess, move by move",
    "author": "I. Chernev",
    "status": "Postponed"
  },
  {
    "title": "Just kids",
    "author": "Patti Smith",
    "status": "Finished"
  },
  {
    "title": "Outliers",
    "author": "Malcolm Gladwell",
    "status": "Have not started"
  },
  {
    "title": "Enlightenment now",
    "author": "Steven Pinker",
    "status": "Have not started"
  },
  {
    "title": "How to stop worrying and start living",
    "author": "Dale Carnegie",
    "status": "Have not started"
  },
  {
    "title": "The paradox of choice",
    "author": "Schwartz Barry",
    "status": "Have not started"
  },
  {
    "title": "The fantasy bond",
    "author": "Robert W Firestone",
    "status": "Have not started"
  },
  {
    "title": "Excellent advice for living",
    "author": "Kevin Kelly",
    "status": "Have not started"
  },
  {
    "title": "Mother of God: An extraordinary Journey into the Uncharted Tributaries of the Western Amazon",
    "author": "Paul Rosolie",
    "status": "Have not started"
  },
  {
    "title": "What Do You Care What Other People Think?: Further Adventures of a Curious Character",
    "author": "Richard Feynman",
    "status": "Finished"
  },
  {
    "title": "Stories of your life and others",
    "author": "Ted Chiang",
    "status": "Finished"
  },
  {
    "title": "The story of philosophy",
    "author": "Will Durant",
    "status": "Have not started"
  },
  {
    "title": "The undercover economist",
    "author": "Tim Harford",
    "status": "Finished"
  },
  {
    "title": "Perfectly reasonable deviations from the beaten track",
    "author": "Richard Feynman",
    "status": "Postponed"
  },
  {
    "title": "Genius: The Life and Science of Richard Feynman",
    "author": "Unknown",
    "status": "Have not started"
  },
  {
    "title": "Thinking in Systems: A Primer",
    "author": "Donella H. Meadows",
    "status": "Have not started"
  },
  {
    "title": "Thing Explainer",
    "author": "Randall Munroe",
    "status": "Have not started"
  },
  {
    "title": "Thinking Physics is Gedanken Physics",
    "author": "Lewis C. Epstein",
    "status": "Have not started"
  },
  {
    "title": "Diaspora",
    "author": "Greg Egan",
    "status": "Later"
  },
  {
    "title": "Elon Musk",
    "author": "Walter Isaacson",
    "status": "Finished"
  },
  {
    "title": "The E-Myth Revisited: Why Most Small Businesses Don't Work and What to Do about It",
    "author": "Michael E. Gerber",
    "status": "Finished"
  },
  {
    "title": "Vagabonding: An Uncommon Guide to the Art of Long-Term World Travel",
    "author": "Rolf Potts",
    "status": "Have not started"
  },
  {
    "title": "The Magic of Thinking Big",
    "author": "David J. Schwartz",
    "status": "Have not started"
  },
  {
    "title": "Greenlights",
    "author": "Matthew McConaughey",
    "status": "Have not started"
  },
  {
    "title": "Gödel, Escher, Bach: an Eternal Golden Braid",
    "author": "Douglas Hofstadter",
    "status": "Have not started"
  },
  {
    "title": "The Soul of a New Machine",
    "author": "Tracy Kidder",
    "status": "Have not started"
  },
  {
    "title": "Radical Candor",
    "author": "Kim Scott",
    "status": "Have not started"
  },
  {
    "title": "Rocket Surgery Made Easy",
    "author": "Steve Krug",
    "status": "Have not started"
  },
  {
    "title": "Don't Make Me Think",
    "author": "Steve Krug",
    "status": "Have not started"
  },
  {
    "title": "30 Lessons for Living",
    "author": "Karl Pillemer",
    "status": "Have not started"
  },
  {
    "title": "Clear Thinking",
    "author": "Shane Parrish",
    "status": "Finished"
  },
  {
    "title": "Why Has Nobody Told Me This Before",
    "author": "Julie Smith",
    "status": "Finished"
  },
  {
    "title": "Poor Charlie’s Almanack: The Essential Wit and Wisdom of Charles T. Munger",
    "author": "Charles T. Munger",
    "status": "Finished"
  },
  {
    "title": "Scaling People: Tactics for Management and Company Building",
    "author": "Claire Hughes Johnson",
    "status": "Have not started"
  },
  {
    "title": "Heroes of History: A Brief History of Civilization from Ancient Times to the Dawn of the Modern Age",
    "author": "Will Durant",
    "status": "Finished"
  },
  {
    "title": "Fallen leaves : last words on life, love, war, and God",
    "author": "Will Durant",
    "status": "Finished"
  },
  {
    "title": "300 Arguments",
    "author": "Sarah Manguso",
    "status": "Finished"
  },
  {
    "title": "Cryptonomicon",
    "author": "Neal Stephenson",
    "status": "Postponed"
  },
  {
    "title": "The morality of happiness",
    "author": "Unknown",
    "status": "Have not started"
  },
  {
    "title": "Stubborn Attachments",
    "author": "Tyler Cowen",
    "status": "Finished"
  },
  {
    "title": "Theory of Games and Economic behaviour",
    "author": "Von Neumann",
    "status": "Have not started"
  },
  {
    "title": "Thinking Strategically",
    "author": "Avinash Dixit, Barry Nalebuff",
    "status": "Have not started"
  },
  {
    "title": "The meaning of human existence",
    "author": "E. O. Wilson",
    "status": "Finished"
  },
  {
    "title": "The Diamond Age",
    "author": "Neal Stephenson",
    "status": "Finished"
  },
  {
    "title": "1984",
    "author": "George Orwell",
    "status": "Finished"
  },
  {
    "title": "Animal Farm",
    "author": "George Orwell",
    "status": "Finished"
  },
  {
    "title": "Wheres my flying car",
    "author": "J. Storrs Hall",
    "status": "Finished"
  },
  {
    "title": "Men and Rubber: The Story of Business",
    "author": "Harvey S. Firestone",
    "status": "Have not started"
  },
  {
    "title": "Act of god",
    "author": "Kanan Gill",
    "status": "Finished"
  }
];

export const getBooksTool = new Autonomous.Tool({
  name: "getBooks",
  description: "Get AJ's reading list. Use this when asked about books.",
  input: z.object({
    status: z.enum(["Reading", "Finished", "Postponed", "Have not started", "Later", "all"]).optional().describe("Filter by status"),
  }),
  output: z.object({
    books: z.array(z.object({
      title: z.string(),
      author: z.string(),
      status: z.string(),
    })),
  }),
  handler: async ({ status }) => {
    const filter = status || "all";
    const filtered = filter === "all" ? BOOKS : BOOKS.filter(b => b.status === filter);
    return { books: filtered };
  },
});
