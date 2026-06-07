export type Player = {
  number: string;
  name: string;
  pos: string;
  secondaryPos?: string;
  year: string;
  bats: string;
  throws: string;
  ht: string;
  wt: string;
  hometown: string;
  school?: string;
  gpa?: string;
  committed?: string;
  recruitingStatus?: "uncommitted" | "committed" | "signed";
  bio?: string;
  exitVelo?: string;
  pitchingVelo?: string;
  sixtyYard?: string;
  popTime?: string;
  instagram?: string;
  twitter?: string;
  highlightUrl?: string;
  achievements?: string[];
};

export type Coach = {
  name: string;
  role: string;
  bio: string;
};

export type GameResult = {
  date: string;
  opponent: string;
  result: string;
  score: string;
  tournament?: string;
};

export type TeamData = {
  id: string;
  age: string;
  name: string;
  tagline: string;
  record: string;
  ranking: string;
  description: string;
  roster: Player[];
  coaches: Coach[];
  schedule: GameResult[];
  battingLeaders: { name: string; stat: string; value: string }[];
  pitchingLeaders: { name: string; stat: string; value: string }[];
  comingSoon?: boolean;
  launchDate?: string;
};

const ROSTER_18U: Player[] = [
  { number: "1", name: "Marcus Rivera", pos: "RHP", year: "2025", bats: "R", throws: "R", ht: "6'2\"", wt: "195", hometown: "Boston, MA", school: "Boston Latin", gpa: "3.8", committed: "Boston College", recruitingStatus: "committed", bio: "Marcus is the ace of the Apex Premier staff and one of the top right-handed pitchers in New England. His fastball sits 91-93 with late life, complemented by a sharp slider and developing changeup. A 3-year varsity starter with a fierce competitive edge, Marcus embodies the Apex standard on and off the mound.", exitVelo: "91", pitchingVelo: "93", sixtyYard: "6.8", instagram: "@marcusrivera_01", highlightUrl: "https://youtube.com", achievements: ["PBR Top 50 NE 2024", "All-State 2024", "WWBA All-Tournament", "Boston College Commit"] },
  { number: "2", name: "James O'Brien", pos: "SS", secondaryPos: "2B", year: "2025", bats: "R", throws: "R", ht: "5'11\"", wt: "175", hometown: "Brockton, MA", school: "Brockton High", gpa: "3.5", committed: "UMass Amherst", recruitingStatus: "committed", bio: "James is a premier defensive shortstop with soft hands, plus range, and a cannon arm. At the plate, he's a disciplined hitter who uses the whole field and consistently barrels the ball. A natural leader in the dugout and on the field.", exitVelo: "89", sixtyYard: "6.6", instagram: "@jamesobrien_ss", achievements: ["All-State SS 2024", "PBR NE Showcase Invite", "UMass Amherst Commit"] },
  { number: "5", name: "Tyler Chen", pos: "C", secondaryPos: "1B", year: "2025", bats: "R", throws: "R", ht: "6'0\"", wt: "200", hometown: "Newton, MA", school: "Newton North", gpa: "3.9", committed: "Northeastern", recruitingStatus: "committed", bio: "Tyler is the heartbeat of the Apex defense. An outstanding game-caller with a 1.95 pop time and the ability to shut down the running game. At the plate, he drives the ball with authority to all fields. Academic excellence matches his on-field production.", exitVelo: "93", popTime: "1.95", sixtyYard: "7.1", instagram: "@tylerchen_c5", achievements: ["PG All-American Nominee", "Gold Glove Award 2024", "Northeastern Commit", "3.9 GPA"] },
  { number: "7", name: "Derek Williams", pos: "CF", secondaryPos: "RF", year: "2026", bats: "L", throws: "L", ht: "6'1\"", wt: "180", hometown: "Quincy, MA", school: "North Quincy", gpa: "3.4", recruitingStatus: "uncommitted", bio: "Derek is the fastest player in the Apex system with exceptional range in center field and game-changing speed on the bases. A left-handed bat with gap power and a knack for putting the ball in play. Projected as a top 2026 prospect in the Northeast.", exitVelo: "88", sixtyYard: "6.5", instagram: "@dwilliams_7", achievements: ["28 SB in 2024 Season", "PBR Top 100 NE 2026", "All-Conference CF"] },
  { number: "9", name: "Anthony Russo", pos: "LHP", year: "2026", bats: "L", throws: "L", ht: "6'3\"", wt: "190", hometown: "Medford, MA", school: "Medford High", gpa: "3.6", recruitingStatus: "uncommitted", bio: "Anthony is a projectable left-handed pitcher with a high ceiling. His fastball sits 86-88 with room to grow, backed by a plus curveball and improving changeup. At 6'3\" with a lean frame, scouts love his projectability and ability to spin the ball.", pitchingVelo: "88", sixtyYard: "7.0", instagram: "@ant_russo9", achievements: ["8-2 Record 2024", "PBR Showcase Invite", "Prospect Watch 2026"] },
  { number: "10", name: "Kevin Park", pos: "2B", secondaryPos: "SS", year: "2025", bats: "R", throws: "R", ht: "5'9\"", wt: "165", hometown: "Cambridge, MA", school: "Cambridge R&L", gpa: "4.0", committed: "Holy Cross", recruitingStatus: "committed", bio: "Kevin is the most disciplined hitter in the Apex lineup with an exceptional eye at the plate and the ability to control the strike zone. A fundamentally sound middle infielder with reliable hands and a quick release. Academic All-American candidate.", exitVelo: "84", sixtyYard: "6.9", instagram: "@kpark_10", achievements: ["4.0 GPA", ".380 BA 2024", "Holy Cross Commit", "Academic All-American"] },
  { number: "12", name: "Michael Santos", pos: "RF", secondaryPos: "LF", year: "2026", bats: "R", throws: "R", ht: "6'0\"", wt: "185", hometown: "Dorchester, MA", school: "Boston College High", gpa: "3.3", recruitingStatus: "uncommitted", bio: "Michael combines raw power with an aggressive approach at the plate. A corner outfielder with a strong arm and developing defensive instincts. His bat speed and exit velocity numbers project well for the college level.", exitVelo: "90", sixtyYard: "6.8", instagram: "@msantos_12", achievements: ["90+ Exit Velo", "All-Conference OF 2024"] },
  { number: "14", name: "Ryan Murphy", pos: "3B", year: "2025", bats: "R", throws: "R", ht: "6'1\"", wt: "205", hometown: "Weymouth, MA", school: "Weymouth High", gpa: "3.2", committed: "Bentley", recruitingStatus: "committed", bio: "Ryan is the power bat in the Apex lineup. A 12-HR senior season cemented his status as one of the top power hitters in Massachusetts. Strong hands, quick bat, and the ability to drive the ball out of any park. A reliable third baseman with soft hands.", exitVelo: "96", sixtyYard: "7.0", instagram: "@rmurph_14", highlightUrl: "https://youtube.com", achievements: ["12 HR Senior Season", "96 mph Exit Velo", "Bentley Commit", "All-State 3B"] },
  { number: "17", name: "Carlos Diaz", pos: "1B", secondaryPos: "DH", year: "2026", bats: "L", throws: "R", ht: "6'3\"", wt: "215", hometown: "Lawrence, MA", school: "Lawrence High", gpa: "3.1", recruitingStatus: "uncommitted", bio: "Carlos has the most raw power in the Apex system. A left-handed bat with towering home run potential and improving plate discipline. At 6'3\" and growing, his physical tools project to the college level and beyond.", exitVelo: "95", sixtyYard: "7.2", instagram: "@cdiaz_17", achievements: ["95 mph Exit Velo", "Power Showcase Winner", "2026 Watch List"] },
  { number: "21", name: "Isaiah Thompson", pos: "LF", year: "2026", bats: "L", throws: "L", ht: "5'10\"", wt: "170", hometown: "Roxbury, MA", school: "O'Bryant", gpa: "3.5", recruitingStatus: "uncommitted", bio: "Isaiah is a dynamic left-handed hitter with excellent bat control and gap-to-gap power. A smart baserunner who reads pitchers well and consistently puts pressure on defenses. Defensively reliable with good routes and a quick release.", exitVelo: "85", sixtyYard: "6.7", instagram: "@isaiah_t21", achievements: ["18 SB 2024", "All-Conference LF"] },
  { number: "24", name: "Jake Sullivan", pos: "RHP", year: "2026", bats: "R", throws: "R", ht: "6'4\"", wt: "200", hometown: "Brookline, MA", school: "Brookline High", gpa: "3.7", recruitingStatus: "uncommitted", bio: "Jake is the most projectable arm in the Apex system. At 6'4\" with a clean delivery, his fastball sits 87-89 and continues to climb. A power curveball and developing slider give him a three-pitch mix that projects to high-level college baseball.", pitchingVelo: "89", sixtyYard: "6.9", instagram: "@jsully_24", achievements: ["98 K's in 2024", "PBR Showcase Performer", "Top Prospect 2026"] },
  { number: "28", name: "Nate Kowalski", pos: "RHP", secondaryPos: "OF", year: "2025", bats: "R", throws: "R", ht: "6'2\"", wt: "190", hometown: "Plymouth, MA", school: "Plymouth North", gpa: "3.4", committed: "Merrimack", recruitingStatus: "committed", bio: "Nate is a versatile two-way player who can impact the game from the mound and the outfield. His fastball sits 88-90 with a sharp slider, and his bat produces consistent hard contact. A true competitor who thrives in big moments.", exitVelo: "88", pitchingVelo: "90", sixtyYard: "6.7", instagram: "@nkowalski_28", achievements: ["Two-Way Player of Year", "Merrimack Commit", "PBR All-Tournament"] },
  { number: "33", name: "David Kim", pos: "LHP", year: "2026", bats: "L", throws: "L", ht: "6'0\"", wt: "175", hometown: "Wellesley, MA", school: "Wellesley High", gpa: "3.9", recruitingStatus: "uncommitted", bio: "David is a crafty left-hander with outstanding command and the ability to pitch deep into games. His fastball plays up with deception and his changeup is one of the best in the program. A high-IQ pitcher who outthinks hitters.", pitchingVelo: "84", instagram: "@dkim_33", achievements: ["6 Saves 2024", "3.9 GPA", "Lowest WHIP on Staff"] },
  { number: "44", name: "Andre Baptiste", pos: "C", secondaryPos: "1B", year: "2026", bats: "R", throws: "R", ht: "6'1\"", wt: "210", hometown: "Braintree, MA", school: "Braintree High", gpa: "3.3", recruitingStatus: "uncommitted", bio: "Andre is a physical presence behind the plate with the arm strength and receiving skills to control the running game. His bat generates impressive exit velocities and he has the power to change games with one swing. A developing leader who commands the pitching staff.", exitVelo: "92", popTime: "2.00", sixtyYard: "7.2", instagram: "@abaptiste_44", achievements: ["92 mph Exit Velo", "2.00 Pop Time", "All-Conference C"] },
];

const COACHES_18U: Coach[] = [
  { name: "Coach Mike Callahan", role: "Head Coach", bio: "15 years of coaching experience. Former Division I player at UMass. Specializes in hitting development and game strategy. 200+ players developed through the Apex system." },
  { name: "Coach Ray Torres", role: "Pitching Coach", bio: "Former minor league pitcher. Rapsodo-certified analyst. Focuses on arm care, pitch design, and velocity development. Known for producing college-ready arms." },
  { name: "Coach Devon Hall", role: "Defensive Coordinator", bio: "10 years of infield development experience. Emphasizes footwork, positioning, and game-speed decision-making. Former college shortstop at Northeastern." },
];

const SCHEDULE_18U: GameResult[] = [
  { date: "Mar 15", opponent: "Boston Bolts", result: "W", score: "8-3", tournament: "Spring Opener" },
  { date: "Mar 22", opponent: "New England Raptors", result: "W", score: "5-2" },
  { date: "Mar 29", opponent: "CT Capitals", result: "L", score: "3-4", tournament: "Northeast Classic" },
  { date: "Apr 5", opponent: "Rhode Island Thunder", result: "W", score: "12-1" },
  { date: "Apr 12", opponent: "NH Wildcats", result: "W", score: "6-0" },
  { date: "Apr 19", opponent: "Maine Lobsters", result: "W", score: "9-4", tournament: "PBR Regional" },
  { date: "Apr 26", opponent: "Worcester Warriors", result: "W", score: "7-2" },
  { date: "May 3", opponent: "South Shore Sharks", result: "W", score: "4-1", tournament: "WWBA Qualifier" },
];

export const ALL_TEAMS: Record<string, TeamData> = {
  "premier": {
    id: "premier", age: "Premier", name: "Apex Premier", tagline: "The Flagship", record: "0-0", ranking: "—",
    description: "Our flagship program. College-ready athletes competing in top national tournaments and showcase events. Direct recruiting exposure and professional-level development. The Premier program represents the peak of the Apex Academy development pathway.",
    roster: [
      { number: "4", name: "Joel Rojas", pos: "—", year: "2026", bats: "—", throws: "—", ht: "—", wt: "—", hometown: "—" },
      { number: "9", name: "Devin Milonopoulos", pos: "—", year: "2028", bats: "—", throws: "—", ht: "—", wt: "—", hometown: "—" },
      { number: "11", name: "Shawn Fusco", pos: "—", year: "2027", bats: "—", throws: "—", ht: "—", wt: "—", hometown: "—" },
      { number: "12", name: "Conor Brown", pos: "—", year: "2027", bats: "—", throws: "—", ht: "—", wt: "—", hometown: "—" },
      { number: "13", name: "Oliver Song", pos: "—", year: "2028", bats: "—", throws: "—", ht: "—", wt: "—", hometown: "—" },
      { number: "15", name: "Donovan O'Brien", pos: "—", year: "2028", bats: "—", throws: "—", ht: "—", wt: "—", hometown: "—" },
      { number: "16", name: "Preston Ardolino", pos: "—", year: "2027", bats: "—", throws: "—", ht: "—", wt: "—", hometown: "—" },
      { number: "20", name: "Henry Kelsey", pos: "—", year: "2028", bats: "—", throws: "—", ht: "—", wt: "—", hometown: "—" },
      { number: "22", name: "Campbell Callahan", pos: "—", year: "2028", bats: "—", throws: "—", ht: "—", wt: "—", hometown: "—" },
      { number: "24", name: "Josh Silber", pos: "—", year: "2028", bats: "—", throws: "—", ht: "—", wt: "—", hometown: "—" },
      { number: "28", name: "Hugh Speer", pos: "—", year: "2028", bats: "—", throws: "—", ht: "—", wt: "—", hometown: "—" },
      { number: "34", name: "Kayleb McCormick", pos: "—", year: "2027", bats: "—", throws: "—", ht: "—", wt: "—", hometown: "—" },
    ],
    coaches: [
      { name: "Gary Meskell", role: "Head Coach", bio: "" },
      { name: "Brandon McMahon", role: "Assistant Coach", bio: "" },
    ],
    schedule: [],
    battingLeaders: [],
    pitchingLeaders: [],
  },
  "prospects": {
    id: "prospects", age: "Prospects", name: "Apex Prospects", tagline: "Next Up", record: "0-0", ranking: "—",
    description: "High-level competition and recruiting preparation. Building the bridge between development and showcase-level play.",
    roster: [
      { number: "1", name: "Nick Young", pos: "—", year: "2029", bats: "—", throws: "—", ht: "—", wt: "—", hometown: "—" },
      { number: "2", name: "Rafi Crane", pos: "—", year: "2029", bats: "—", throws: "—", ht: "—", wt: "—", hometown: "—" },
      { number: "3", name: "Van Easter", pos: "—", year: "2028", bats: "—", throws: "—", ht: "—", wt: "—", hometown: "—" },
      { number: "5", name: "Jack Alexandrov", pos: "—", year: "2029", bats: "—", throws: "—", ht: "—", wt: "—", hometown: "—" },
      { number: "6", name: "Colin Picardo", pos: "—", year: "2030", bats: "—", throws: "—", ht: "—", wt: "—", hometown: "—" },
      { number: "7", name: "Linus Henke", pos: "—", year: "2029", bats: "—", throws: "—", ht: "—", wt: "—", hometown: "—" },
      { number: "8", name: "Noah Sterman", pos: "—", year: "2030", bats: "—", throws: "—", ht: "—", wt: "—", hometown: "—" },
      { number: "14", name: "Luke Wood", pos: "—", year: "2029", bats: "—", throws: "—", ht: "—", wt: "—", hometown: "—" },
      { number: "17", name: "Asa Brown", pos: "—", year: "2029", bats: "—", throws: "—", ht: "—", wt: "—", hometown: "—" },
      { number: "23", name: "Justin Beerbohm", pos: "—", year: "2029", bats: "—", throws: "—", ht: "—", wt: "—", hometown: "—" },
      { number: "30", name: "Bobby Wolfe", pos: "—", year: "2028", bats: "—", throws: "—", ht: "—", wt: "—", hometown: "—" },
    ],
    coaches: [
      { name: "Gary Meskell", role: "Head Coach", bio: "" },
      { name: "Brandon McMahon", role: "Assistant Coach", bio: "" },
    ],
    schedule: [], battingLeaders: [], pitchingLeaders: [],
  },
  "14u": {
    id: "14u", age: "14U", name: "Apex 14U Youth", tagline: "The Future", record: "—", ranking: "—",
    description: "Advanced youth development where strong habits meet competitive play. Building complete players with the mechanics, baseball IQ, and competitive edge to prepare for showcase-level baseball.",
    roster: [], coaches: [], schedule: [],
    battingLeaders: [], pitchingLeaders: [],
    comingSoon: true, launchDate: "Fall 2026",
  },
  "12u": {
    id: "12u", age: "12U", name: "Apex 12U Youth", tagline: "Building Habits", record: "—", ranking: "—",
    description: "Where strong habits are built. Fundamental skill development, position training, and introduction to competitive travel baseball within a structured development system.",
    roster: [], coaches: [], schedule: [],
    battingLeaders: [], pitchingLeaders: [],
    comingSoon: true, launchDate: "Fall 2026",
  },
  "10u": {
    id: "10u", age: "10U", name: "Apex 10U Youth", tagline: "Day One", record: "—", ranking: "—",
    description: "The starting point. Age-appropriate training, love of the game, and building the athletic foundation for long-term development within the Apex Academy system.",
    roster: [], coaches: [], schedule: [],
    battingLeaders: [], pitchingLeaders: [],
    comingSoon: true, launchDate: "Fall 2026",
  },
};
