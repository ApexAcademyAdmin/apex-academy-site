import { PageHeader } from "@/components/PageHeader";

// ═══════════════════════════════════════
// TABLE OF CONTENTS
// ═══════════════════════════════════════

const TOC = [
  { id: "1", title: "Format & Season" },
  { id: "2", title: "Playing Conditions" },
  { id: "3", title: "Umpires" },
  { id: "4", title: "Rosters & Uniforms" },
  { id: "5", title: "Game Rules" },
  { id: "6", title: "Pitching" },
  { id: "7", title: "Mercy Rule" },
  { id: "8", title: "Forfeits" },
  { id: "9", title: "Re-Entry" },
  { id: "10", title: "Postponements & Weather" },
  { id: "11", title: "Protests" },
  { id: "12", title: "Code of Conduct" },
  { id: "13", title: "Playoffs & Championship" },
  { id: "14", title: "Tiebreakers" },
  { id: "15", title: "Additional Rules" },
];

// ═══════════════════════════════════════
// RULE SECTION COMPONENT
// ═══════════════════════════════════════

function RuleSection({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <div id={`section-${id}`} className="mb-10">
      <h2 className="text-base md:text-lg font-bold uppercase tracking-wide text-white mb-4 pb-2 border-b border-white/[0.06]">
        <span className="text-[#17FC13]/60">{id}.0</span> {title}
      </h2>
      <div className="space-y-3 text-[13px] text-white leading-relaxed">
        {children}
      </div>
    </div>
  );
}

function Rule({ num, children }: { num: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3">
      <span className="text-[12px] text-white font-mono flex-shrink-0 w-8 pt-0.5">{num}</span>
      <div className="flex-1">{children}</div>
    </div>
  );
}

function B({ children }: { children: React.ReactNode }) {
  return <strong className="text-white font-semibold">{children}</strong>;
}

// ═══════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════

export default function RulesPage() {
  return (
    <main>
      <PageHeader
        title="League"
        accent="Rules"
        subtitle="Apex League Special Rules and Regulations. All games governed by MLB rules as supplemented below."
        breadcrumb={[{ label: "League", href: "/league" }]}
      />

      <div className="max-w-[860px] mx-auto px-6 md:px-10 pb-16">
        {/* Header block */}
        <div>
          <div className="text-center mb-10 pb-6 border-b border-white/[0.06]">
            <div className="text-xl md:text-2xl font-bold uppercase tracking-wide mb-1">Apex League</div>
            <div className="text-[11px] text-white uppercase tracking-[0.2em] mb-3">Special Rules and Regulations</div>
            <div className="text-[10px] text-white">www.apexacademyofficial.com &middot; Updated June 2026</div>
          </div>
        </div>

        {/* Table of Contents */}
        <div>
          <div className="mb-10">
            <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#17FC13]/40 mb-3">Table of Contents</div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-1">
              {TOC.map(t => (
                <a key={t.id} href={`#section-${t.id}`} className="text-[12px] text-white hover:text-[#17FC13]/60 no-underline transition-colors py-0.5">
                  <span className="text-white font-mono mr-1.5">{t.id}.0</span> {t.title}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── RULES ── */}
        <div>

          <RuleSection id="1" title="Format & Season">
            <Rule num="1.1">The league will consist of five (5) age divisions: <B>10U</B> (ages 9-10), <B>12U</B> (ages 11-12), <B>14U</B> (ages 13-14), <B>16U</B> (ages 15-16), and <B>18U</B> (ages 17-18). Age is determined by the <B>school year cutoff date (September 1)</B> to align with the college recruiting classification process. A player's age as of September 1 of the current year determines their division.</Rule>
            <Rule num="1.2">Each age division will have <B>Division A</B> and <B>Division B</B> to balance competition levels. Division placement is determined by the league based on team strength and coach input.</Rule>
            <Rule num="1.3">All league games are scheduled on <B>Wednesday, Thursday, and Friday</B> evenings only. Weekends are kept free to avoid conflicts with travel baseball tournaments.</Rule>
            <Rule num="1.4">At the conclusion of the regular season, the top two (2) teams from each division will qualify for the <B>Playoff Championship</B> held in August.</Rule>
            <Rule num="1.5">The regular season runs from <B>mid-June through mid-August</B>. Championship weekend is held the final weekend of August.</Rule>
          </RuleSection>

          <RuleSection id="2" title="Playing Conditions">
            <Rule num="2.1">The home team is responsible for the condition of the field. The field should be properly prepared and lined before game time.</Rule>
            <Rule num="2.2">The home team shall have the choice of dugouts.</Rule>
            <Rule num="2.3">All on-field base coaches (adults and/or players) are <B>required to wear a protective helmet</B>. Batting helmets with extended ear flaps covering both ears must be worn by all batters, base runners, on-deck batters, and base coaches.</Rule>
            <Rule num="2.4"><B>10U-12U:</B> 60-foot basepaths, 46-foot (10U) or 50-foot (12U) pitching distance. <B>14U-18U:</B> 90-foot basepaths, 60 feet 6 inches pitching distance.</Rule>
          </RuleSection>

          <RuleSection id="3" title="Umpires">
            <Rule num="3.1">The league is responsible for assigning umpires to all games.</Rule>
            <Rule num="3.2">The cost of umpires during the regular season and postseason will be split equally between the two teams playing. Each team is responsible for their share of umpire fees for every game.</Rule>
            <Rule num="3.3">The home team is responsible for providing game baseballs for the duration of the game.</Rule>
          </RuleSection>

          <RuleSection id="4" title="Rosters & Uniforms">
            <Rule num="4.1">Each team must submit a complete roster through the league website before the team's first game.</Rule>
            <Rule num="4.2">Rosters are limited to a maximum of <B>twenty (20) players</B> and a minimum of <B>twelve (12) players</B>. Open or unlimited rosters are not permitted.</Rule>
            <Rule num="4.3">A team's roster shall remain open until <B>July 15</B>. On that date, rosters will be locked for the remainder of the season including playoffs.</Rule>
            <Rule num="4.4">No player will be allowed to participate who is not on a roster. <B>Use of a player not on the roster will result in a two-game suspension of the head coach and forfeit of the game.</B></Rule>
            <Rule num="4.5">A player cannot be listed on more than one (1) roster in the same division.</Rule>
            <Rule num="4.6">Players may play up one age division with approval from both coaches and the league commissioner. See Rule 1.1 for age determination.</Rule>
            <Rule num="4.7">To be eligible for playoffs, a player must have participated in not less than <B>fifty percent (50%)</B> of the games played by the team.</Rule>
            <Rule num="4.8">All teams must be properly uniformed and all jerseys must be numbered.</Rule>
            <Rule num="4.9">Teams may use up to <B>two (2) guest players</B> per game with 24-hour advance notice to the commissioner. Guest players may not pitch.</Rule>
          </RuleSection>

          <RuleSection id="5" title="Game Rules">
            <Rule num="5.1"><B>10U-12U:</B> Games are six (6) innings. <B>14U-18U:</B> Games are seven (7) innings. No new inning shall start after <B>two (2) hours</B> from first pitch.</Rule>
            <Rule num="5.2"><B>10U-12U</B> use a continuous batting order — all rostered players bat. <B>14U-18U</B> use a nine (9) player lineup with optional designated hitter (DH).</Rule>
            <Rule num="5.3">A tenth player may be added as an extra hitter. If a team starts with ten players in the batting order, it must finish with ten unless a player is injured or ejected.</Rule>
            <Rule num="5.4">A DH may be used in all divisions. The DH hits for any one defensive player. If the DH enters the field, the team loses the DH for the remainder of the game.</Rule>
            <Rule num="5.5"><B>Dropped third strike</B> is enforced in 12U and above. Not enforced in 10U.</Rule>
            <Rule num="5.6"><B>Infield fly rule</B> is enforced in all divisions.</Rule>
            <Rule num="5.7"><B>10U:</B> No leadoffs. Runners may steal only after the pitch crosses the plate. <B>12U-18U:</B> Full leadoffs and stealing are permitted. Balks are enforced with one warning per pitcher in 12U.</Rule>
            <Rule num="5.8">Courtesy runners are allowed for the catcher and pitcher at any time. The courtesy runner must be the last recorded out.</Rule>
            <Rule num="5.9">Regular season games may end in a tie after regulation innings. Playoff games use the <B>international tiebreaker rule</B> (runner placed on second base) beginning in the extra inning.</Rule>
          </RuleSection>

          <RuleSection id="6" title="Pitching">
            <Rule num="6.1"><B>Pitch count limits by division:</B></Rule>
            <div className="ml-11 mb-3">
              <div className="bg-[#0d1117] rounded-lg border border-white/[0.04] overflow-hidden text-[12px]">
                <div className="grid grid-cols-3 border-b border-white/[0.06] text-[9px] font-bold uppercase tracking-wider text-white">
                  <div className="px-3 py-2">Division</div><div className="px-3 py-2">Max Pitches Per Day</div><div className="px-3 py-2">Weekly Maximum</div>
                </div>
                {[
                  { div: "10U", max: "75", weekly: "105" },
                  { div: "12U", max: "85", weekly: "105" },
                  { div: "14U", max: "95", weekly: "105" },
                  { div: "16U", max: "105", weekly: "105" },
                  { div: "18U", max: "105", weekly: "105" },
                ].map(r => (
                  <div key={r.div} className="grid grid-cols-3 border-b border-white/[0.02] text-white">
                    <div className="px-3 py-2 font-bold">{r.div}</div>
                    <div className="px-3 py-2 font-bold text-[#17FC13]/60">{r.max}</div>
                    <div className="px-3 py-2">{r.weekly}</div>
                  </div>
                ))}
              </div>
            </div>

            <Rule num="6.2"><B>Required rest by pitches thrown:</B></Rule>
            <div className="ml-11 mb-3">
              <div className="bg-[#0d1117] rounded-lg border border-white/[0.04] overflow-hidden text-[12px]">
                <div className="grid grid-cols-2 border-b border-white/[0.06] text-[9px] font-bold uppercase tracking-wider text-white">
                  <div className="px-3 py-2">Pitches Thrown</div><div className="px-3 py-2">Required Rest</div>
                </div>
                {[
                  { pitches: "1-20", rest: "0 Days" },
                  { pitches: "21-35", rest: "1 Day" },
                  { pitches: "36-50", rest: "2 Days" },
                  { pitches: "51-65", rest: "3 Days" },
                  { pitches: "66+", rest: "4 Days" },
                ].map(r => (
                  <div key={r.pitches} className="grid grid-cols-2 border-b border-white/[0.02] text-white">
                    <div className="px-3 py-2">{r.pitches}</div>
                    <div className="px-3 py-2 font-bold">{r.rest}</div>
                  </div>
                ))}
              </div>
            </div>

            <Rule num="6.3"><B>Additional pitching restrictions:</B></Rule>
            <div className="ml-11 mb-3 space-y-1.5 text-[13px] text-white">
              <div>No pitcher may exceed the division maximum in a single calendar day.</div>
              <div><B>No pitcher can throw more than 105 pitches within a seven day span</B>, regardless of age division.</div>
              <div>Intentional violations result in <B>forfeiture and league review</B>.</div>
              <div>Pitch counts from suspended games carry over when the game resumes.</div>
              <div>Warm-up pitches do not count toward weekly totals.</div>
              <div>Every pitch thrown in a game counts toward weekly totals.</div>
            </div>

            <Rule num="6.4">If a pitcher reaches the limit mid-batter, they may finish the current batter only.</Rule>
            <Rule num="6.5">Pitch counts must be tracked by both teams. The winning coach must report all pitchers and pitch counts within 24 hours.</Rule>
            <Rule num="6.6"><B>Any violation of pitching rules results in automatic forfeit</B> of the game in which the violation occurred and possible suspension of the head coach.</Rule>
            <Rule num="6.7">A pitcher removed from the mound may re-enter as a pitcher later in the game provided they have not been removed from the game entirely.</Rule>
            <Rule num="6.8">The second trip to the mound to the same pitcher in the same inning shall result in the removal of that pitcher from pitching for the remainder of the game.</Rule>

            <div className="ml-11 mt-4 bg-[#17FC13]/[0.03] rounded-lg border border-[#17FC13]/10 p-4">
              <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#17FC13]/50 mb-2">League Philosophy</div>
              <div className="text-[13px] text-white leading-relaxed">
                The Apex League prioritizes <B>long-term player development</B>, <B>arm health</B>, <B>injury prevention</B>, and <B>proper workload management</B>. Winning games should never come at the expense of a player's future development.
              </div>
            </div>
          </RuleSection>

          <RuleSection id="7" title="Mercy Rule">
            <Rule num="7.1"><B>10U-12U:</B> The game ends if one team leads by <B>fifteen (15) runs after 3 innings</B> or <B>ten (10) runs after 4 innings</B>.</Rule>
            <Rule num="7.2"><B>14U-18U:</B> The game ends if one team leads by <B>ten (10) runs after 5 innings</B>. The home team must have had equal at-bats or be in the lead.</Rule>
          </RuleSection>

          <RuleSection id="8" title="Forfeits">
            <Rule num="8.1">If a team cannot field nine (9) rostered players within <B>fifteen (15) minutes</B> of the scheduled start time, a forfeit shall be declared.</Rule>
            <Rule num="8.2">The score of forfeited games will be recorded as <B>7-0</B>.</Rule>
            <Rule num="8.3">If a team forfeits more than twice in a season, they may be removed from the league at the discretion of the commissioner.</Rule>
          </RuleSection>

          <RuleSection id="9" title="Re-Entry">
            <Rule num="9.1">Any original starting player may withdraw and re-enter <B>once</B>, provided they occupy the same batting position.</Rule>
            <Rule num="9.2">A substitute who is withdrawn may not re-enter.</Rule>
            <Rule num="9.3">A starting player withdrawn more than once cannot re-enter.</Rule>
          </RuleSection>

          <RuleSection id="10" title="Postponements & Weather">
            <Rule num="10.1">The home team manager is responsible for notifying the visiting team, umpires, and commissioner if weather does not permit a game to start. Notification should be made at least <B>2 hours</B> before the scheduled start.</Rule>
            <Rule num="10.2">Once the game has started, the umpires have control of the game and shall decide when to stop or suspend play.</Rule>
            <Rule num="10.3">Games shortened by rain or darkness revert to the last complete inning and are official if at least <B>4½ innings</B> have been played (home team ahead) or <B>5 innings</B> (visiting team ahead).</Rule>
            <Rule num="10.4">All play stops immediately when lightning is detected within 10 miles. <B>30-minute wait</B> after last strike before play resumes.</Rule>
            <Rule num="10.5">Rainouts are rescheduled by the league within 7 days. Both teams are notified at least 24 hours in advance.</Rule>
          </RuleSection>

          <RuleSection id="11" title="Protests">
            <Rule num="11.1">The umpire's judgment calls (balls, strikes, safe, out) are final and <B>cannot be protested</B>. Only rule interpretations may be protested.</Rule>
            <Rule num="11.2">Protests must be submitted in writing to the commissioner <B>within 24 hours</B> of the game's conclusion.</Rule>
            <Rule num="11.3">The commissioner will review and issue a decision within 48 hours. All decisions are final.</Rule>
          </RuleSection>

          <RuleSection id="12" title="Code of Conduct">
            <Rule num="12.1">Coaches are responsible for the conduct of their players, parents, and themselves at all times.</Rule>
            <Rule num="12.2">Any player, coach, or manager ejected from a game shall leave the field and facility immediately. <B>Minimum penalty: suspension from the next game.</B></Rule>
            <Rule num="12.3">Second ejection in a season: <B>one-week suspension</B>. Third ejection: <B>suspension for the remainder of the season</B> including playoffs.</Rule>
            <Rule num="12.4">Any parent or fan asked to leave must comply immediately. Failure to leave results in game suspension until the individual departs.</Rule>
            <Rule num="12.5">Commissioners must be notified within 24 hours of any ejection, including the name and number of the person ejected.</Rule>
            <Rule num="12.6">No player shall harass opposing players, coaches, or umpires. Such action is cause for immediate ejection.</Rule>
          </RuleSection>

          <RuleSection id="13" title="Playoffs & Championship">
            <Rule num="13.1">The top <B>two (2) teams</B> from each division (A and B) qualify for the playoffs — four teams per age group.</Rule>
            <Rule num="13.2">Seeding is determined by: 1) Win percentage 2) Head-to-head record 3) Run differential 4) Coin flip.</Rule>
            <Rule num="13.3">The higher seed is the home team throughout the playoffs. Championship game home team is determined by coin flip.</Rule>
            <Rule num="13.4"><B>Semifinals:</B> Single elimination. Held on the first day of championship weekend (Saturday).</Rule>
            <Rule num="13.5"><B>Championship:</B> Single game. Held on Sunday. No time limit. International tiebreaker applies if tied after regulation.</Rule>
          </RuleSection>

          <RuleSection id="14" title="Tiebreakers">
            <Rule num="14.1">Ties in the standings for playoff qualification are broken by: <B>1) Head-to-head record 2) Run differential 3) Total runs allowed 4) Coin flip.</B></Rule>
            <Rule num="14.2">In-game ties after regulation: regular season games may end in a tie. Playoff games use the international tiebreaker (runner on 2nd) starting in the first extra inning.</Rule>
          </RuleSection>

          <RuleSection id="15" title="Additional Rules">
            <Rule num="15.1"><B>Collision rule:</B> A runner shall be called out when they do not slide or attempt to avoid a fielder who has the ball or is about to receive the throw. Contact must be made for the rule to apply.</Rule>
            <Rule num="15.2"><B>Bat regulations:</B> All non-wood bats must have the USA Bat marking or be BBCOR certified. 14U and above: BBCOR .50, 2⅝" barrel, drop 3. 12U and below: USA Bat approved.</Rule>
            <Rule num="15.3"><B>Playing time (10U-12U):</B> Every rostered player must bat (continuous order) and play a minimum of 3 defensive innings per game.</Rule>
            <Rule num="15.4"><B>Playing time (14U-18U):</B> Coach discretion. No mandatory playing time at older divisions.</Rule>
            <Rule num="15.5"><B>Winning coach responsibilities:</B> The winning coach must report the score, all pitchers, and pitch counts to the commissioner within 24 hours.</Rule>
            <Rule num="15.6">The MLB Official Baseball Rules, as supplemented by these rules, shall govern all play.</Rule>
          </RuleSection>

        </div>

        {/* Footer */}
        <div>
          <div className="mt-6 pt-6 border-t border-white/[0.06] text-center text-[10px] text-white">
            Questions? Contact the commissioner at <a href="mailto:apexsportsgg@gmail.com" className="text-[#17FC13]/30 hover:text-[#17FC13]/50 no-underline">apexsportsgg@gmail.com</a>
          </div>
        </div>
      </div>
    </main>
  );
}
