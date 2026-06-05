"use client";

import { useState } from "react";
import { Section } from "@/components/Section";
import { PageHeader } from "@/components/PageHeader";

// ═══════════════════════════════════════
// FIELD DATA
// ═══════════════════════════════════════

type FieldEntry = { name: string; address: string; notes?: string };
type TownFields = { town: string; fields: FieldEntry[] };

const FIELD_LOCATIONS: TownFields[] = [
  { town: "Acton", fields: [
    { name: "Jones Field", address: "15 Stow Street, Acton, MA 01720" },
    { name: "Acton Boxboro High School", address: "96 Hayward Road, Acton, MA 01720" },
  ]},
  { town: "Arlington", fields: [
    { name: "Spy Pond Field", address: "Lombard Terrace, Arlington, MA 02474" },
    { name: "Summer Street", address: "422 Summer Street, Arlington, MA 02474" },
    { name: "Robbins Farm Field", address: "67 Eastern Avenue, Arlington, MA 02476" },
    { name: "North Union Field", address: "122 Everett Street, Arlington, MA 02474" },
    { name: "Pierce Field", address: "869 Massachusetts Avenue, Arlington, MA 02476" },
  ]},
  { town: "Ayer/Shirley", fields: [
    { name: "Burt Coffman Field", address: "Intersection of Harvard Road and School Street, Shirley, MA", notes: "Concessions and bathroom facilities available" },
    { name: "Pirone Park", address: "79 Bligh Street, Ayer, MA 01432" },
  ]},
  { town: "Bedford", fields: [
    { name: "Bedford High School (A Field)", address: "9 Mudge Way, Bedford, MA 01730" },
    { name: "Bedford Middle School (G Field)", address: "Railroad Avenue, Bedford, MA 01730" },
  ]},
  { town: "Belmont", fields: [
    { name: "Belmont High School (Brendan Grant Field)", address: "221 Concord Ave, Belmont, MA" },
    { name: "Town Field", address: "160 Waverley Street, Belmont, MA" },
  ]},
  { town: "Beverly", fields: [
    { name: "Cooney Field", address: "80 East Street, Beverly, MA 01915" },
  ]},
  { town: "Billerica", fields: [
    { name: "Billerica HS / Memorial High School", address: "35 River Street, Billerica, MA 01821" },
    { name: "Locke Middle School", address: "110 Allen Road, Billerica, MA 01821" },
    { name: "Marshall Middle School", address: "15 Floyd Street, Billerica, MA 01821" },
    { name: "Shawsheen Valley Technical High School", address: "100 Cook Street, Billerica, MA 01821" },
  ]},
  { town: "Boston / Dorchester", fields: [
    { name: "Town Casey (Doherty Playground)", address: "1565 Dorchester Ave, Dorchester, MA 02122" },
    { name: "Healy Field", address: "50 Firth Road, Boston, MA 02131" },
    { name: "Marcella Field", address: "46 Richie Street, Roxbury, MA 02119" },
    { name: "English Field", address: "144 McBride Street, Jamaica Plain, MA 02130" },
    { name: "Jim Rice Field", address: "1900 Washington Street, Boston, MA 02118" },
    { name: "Madison High School", address: "100 Cabot Street, Roxbury Crossing, MA" },
  ]},
  { town: "Brookline", fields: [
    { name: "Warren Field (Eliot Field)", address: "133 Eliot Street, Chestnut Hill, MA 02467" },
    { name: "Amory Field", address: "Freeman and Amory Street, Brookline, MA 02446" },
    { name: "Parsons Field", address: "150 Kent Street, Brookline, MA 02446" },
  ]},
  { town: "Burlington", fields: [
    { name: "Simonds Park", address: "Bedford Street and Church Lane, Burlington, MA 01803" },
    { name: "Center Field", address: "61 Center Street, Burlington, MA 01803" },
    { name: "Francis Wyman Field", address: "41 Terrace Hall Ave, Burlington, MA 01803" },
  ]},
  { town: "Cambridge", fields: [
    { name: "St. Peter's Field", address: "Sherman Street and Cadbury Rd, Cambridge, MA 02140" },
    { name: "Rindge Field", address: "Pemberton Street and Haskell St, Cambridge, MA 02140" },
  ]},
  { town: "Charlestown", fields: [
    { name: "Ryan Playground (JJ Ryan C)", address: "51 Alford Street, Charlestown, MA" },
  ]},
  { town: "Concord", fields: [
    { name: "Emerson 90", address: "110 Stow Street, Concord, MA 01742" },
    { name: "CCHS Field 1 and Field 2", address: "500 Thoreau Street, Concord, MA 01742" },
    { name: "Middlesex School", address: "1400 Lowell Road, Concord, MA 01742" },
    { name: "Fenn School", address: "516 Monument Street, Concord, MA 01742" },
    { name: "Sanborn Middle School", address: "835 Old Marlboro Rd, Concord, MA 01742" },
  ]},
  { town: "Dover Sherborn", fields: [
    { name: "Jameson 4", address: "Pine Hill Lane, Sherborn, MA 01770" },
    { name: "Dover-Sherborn High School Varsity", address: "9 Junction Street, Dover, MA 02030" },
  ]},
  { town: "Everett", fields: [
    { name: "30 Florence St. Park (Jacob Sharf Playground)", address: "Florence St, Everett, MA 02149" },
  ]},
  { town: "Framingham", fields: [
    { name: "Long Field Babe Ruth Complex", address: "701 Dudley Road, Framingham, MA 01702" },
    { name: "Winch / Framingham High School", address: "71 A Street, Framingham, MA 01701" },
    { name: "Bowditch Field", address: "490 Union Ave, Framingham, MA 01702" },
    { name: "Butterworth Park", address: "273 Grant Street, Framingham, MA 01702" },
  ]},
  { town: "Groton", fields: [
    { name: "Town Field", address: "99 Main Street, Groton, MA", notes: "Located behind the Groton library, access from Broadmeadow Road" },
  ]},
  { town: "Jamaica Plain", fields: [
    { name: "Jefferson Field", address: "1 Grotto Glen Road, Jamaica Plain, MA 02130", notes: "Corner of Day St & Grotto Glenn Rd" },
    { name: "Murphy Field", address: "20 Child Street, Jamaica Plain, MA 02130", notes: "Behind Agassiz Elementary School" },
  ]},
  { town: "Lawrence", fields: [
    { name: "South Lawrence East Field", address: "165 Crawford Street, Lawrence, MA 01843" },
    { name: "Mt. Vernon Field", address: "Mount Street, Lawrence, MA 01843" },
    { name: "Lawrence HS (Devlin Field)", address: "70 North Parrish Road, Lawrence, MA 01843" },
  ]},
  { town: "Lexington", fields: [
    { name: "Diamond Middle School", address: "Sedge Road, Lexington, MA" },
    { name: "Center 3 (High School JV Field)", address: "92 Worthen Road, Lexington, MA" },
    { name: "Clarke Middle School", address: "60 Stedman Road, Lexington, MA" },
    { name: "Lexington HS (Varsity Field)", address: "90 Worthen Road, Lexington, MA" },
  ]},
  { town: "Lowell", fields: [
    { name: "Hadley Field", address: "Baldwin Street and Middlesex Street, Lowell, MA" },
  ]},
  { town: "Lynnfield", fields: [
    { name: "Lynnfield High School", address: "275 Essex Street, Lynnfield, MA 01940" },
    { name: "Lynnfield Middle School", address: "505 Main Street, Lynnfield, MA 01940" },
  ]},
  { town: "Malden", fields: [
    { name: "Devir Park", address: "Davidson Way, Malden, MA" },
  ]},
  { town: "Marblehead", fields: [
    { name: "Seaside Park", address: "Atlantic Ave and Gerry Street, Marblehead, MA 01945" },
  ]},
  { town: "Marlboro", fields: [
    { name: "Stevens Field", address: "22 Martin St, Marlboro, MA 01752" },
    { name: "Bauks Field (Marlboro HS Varsity)", address: "431 Bolton Street, Marlboro, MA 01752" },
    { name: "Assabet Valley High School", address: "215 Fitchburg Street, Marlborough, MA 01752" },
  ]},
  { town: "Maynard", fields: [
    { name: "Crowe Park", address: "Great Road (Rt. 117), Maynard, MA 01754" },
    { name: "Fowler Middle School", address: "3 Tiger Drive, Maynard, MA 01754" },
  ]},
  { town: "Medford", fields: [
    { name: "Barry Park", address: "25 Marston St, Medford, MA 02155" },
    { name: "Brooks Playstead Park", address: "85 Playstead Road, Medford, MA 02155" },
    { name: "Hickey Park", address: "60 Brogan Road, Medford, MA 02155" },
    { name: "Morrison Park", address: "Central Ave and Spring, Medford, MA" },
  ]},
  { town: "Melrose", fields: [
    { name: "Morelli Field", address: "Lynn Fells Parkway and Tremont St, Melrose, MA 02176" },
    { name: "Pine Banks Field", address: "60 Main St, Melrose, MA 02176" },
  ]},
  { town: "Natick", fields: [
    { name: "Coolidge Field", address: "32 Sheridan Street, Natick, MA 01760" },
    { name: "Mahan Field (Natick High School)", address: "84 West Street, Natick, MA 01760" },
    { name: "Wilson Middle School", address: "22 Rutledge Road, Natick, MA 01760" },
  ]},
  { town: "Needham", fields: [
    { name: "Warner / DeFazio Field", address: "340 Dedham Ave (Rte 135), Needham, MA 02492" },
    { name: "Walker Gordon", address: "140 Charles River Street, Needham, MA 02492" },
  ]},
  { town: "Newton", fields: [
    { name: "Newton South High School", address: "150 Brandeis Road, Newton, MA 02459" },
    { name: "Officer Bobby Braceland Field", address: "1120 Chestnut Street, Newton Upper Falls, MA" },
    { name: "Albemarle Field", address: "Intersection of Albemarle Rd and Crafts St, Newton, MA" },
    { name: "West Newton Common", address: "51 Elm Street, Newton, MA 02465" },
    { name: "Newton Highlands", address: "10 Upland Ave, Newton, MA" },
  ]},
  { town: "North Andover", fields: [
    { name: "Grogans Field", address: "67 Baldwin Street, North Andover, MA 01845" },
    { name: "North Andover High School", address: "430 Osgood Street, North Andover, MA 01845" },
    { name: "North Andover MS", address: "495 Main Street, North Andover, MA 01845" },
  ]},
  { town: "North End / East Boston", fields: [
    { name: "Puopolo Park", address: "500 Commercial Street, Boston, MA 02109" },
    { name: "Bunker Hill College", address: "250 Rutherford Ave, Charlestown, MA 02129" },
    { name: "East Boston Memorial Park", address: "143 Porter Street, Boston, MA 02128" },
  ]},
  { town: "Northborough", fields: [
    { name: "Memorial Field", address: "50 East Main Street, Northborough, MA 01532" },
  ]},
  { town: "Parkway / West Roxbury", fields: [
    { name: "Billings Field", address: "Quinn Way, West Roxbury, MA 02132" },
    { name: "West Roxbury Education Complex", address: "1205 VFW Pkwy, West Roxbury, MA 02132" },
    { name: "Kelly Field", address: "18 Turtle Pond Parkway, Hyde Park, MA 02136" },
    { name: "Catholic Memorial High School", address: "250 Baker Street, West Roxbury, MA 02132" },
  ]},
  { town: "Reading", fields: [
    { name: "Burbank / Symonds", address: "90 Symonds Way, Reading, MA 01867" },
    { name: "Washington Park", address: "90 Warren Ave, Reading, MA 01867" },
    { name: "Morten Field", address: "246 Bancroft Ave, Reading, MA 01867" },
  ]},
  { town: "Revere", fields: [
    { name: "Garfield Middle School", address: "168 Garfield Ave, Revere, MA 02151" },
    { name: "Revere High School", address: "101 School Street, Revere, MA 02151" },
  ]},
  { town: "Roslindale", fields: [
    { name: "Healy Field", address: "50 Firth Road, Boston, MA 02131" },
  ]},
  { town: "Saugus", fields: [
    { name: "Stackpole Field", address: "82 Appleton Street, Saugus, MA 01906" },
    { name: "WS Park (World Series Park)", address: "Dow Street, Saugus, MA 01906" },
  ]},
  { town: "Stoneham", fields: [
    { name: "Recreation Park", address: "99 Dale Court, Stoneham, MA" },
    { name: "Stoneham High School", address: "149 Franklin Street, Stoneham, MA 02180" },
  ]},
  { town: "Sudbury", fields: [
    { name: "Feeley Field", address: "210 Raymond Road, Sudbury, MA 01776" },
    { name: "Curtis Middle School", address: "22 Pratts Mill Road, Sudbury, MA 01776" },
    { name: "Lincoln Sudbury High School", address: "390 Lincoln Road, Sudbury, MA 01776" },
    { name: "Haskell Field", address: "Hudson Rd and Fairbanks Rd, Sudbury, MA 01776" },
  ]},
  { town: "Swampscott", fields: [
    { name: "Jackson Park", address: "210 Essex Street, Swampscott, MA 01907" },
    { name: "Phillips Park", address: "601 Humphrey Street, Swampscott, MA 01907" },
    { name: "Nahant Rotary Field", address: "Intersection of Lynn Shore Dr and Nahant Rd, Nahant, MA" },
  ]},
  { town: "Wakefield", fields: [
    { name: "Wakefield HS / Walsh Field", address: "60 Farm Street, Wakefield, MA 01880" },
    { name: "Moulton Field", address: "4 Harrington Court, Wakefield, MA 01880" },
    { name: "Sullivan Park", address: "1 Tylers Lane, Wakefield, MA 01880" },
  ]},
  { town: "Waltham", fields: [
    { name: "Cacciatore Field", address: "10 Whitcomb Street, Waltham, MA" },
    { name: "Gann Academy Field", address: "333 Forest Street, Waltham, MA 02452" },
    { name: "Yetten Field", address: "190 Athletic Field Road, Waltham, MA 02451" },
  ]},
  { town: "Watertown", fields: [
    { name: "Moxley Field", address: "24 Westminster Ave, Watertown, MA" },
    { name: "Victory Field", address: "63 Orchard Street, Watertown, MA" },
  ]},
  { town: "Wayland", fields: [
    { name: "Wayland High School Varsity", address: "270 Old Connecticut Path, Wayland, MA 01778" },
  ]},
  { town: "Wellesley", fields: [
    { name: "Sprague Field", address: "80 Calvin Road, Wellesley, MA 02481" },
    { name: "Wellesley High School Varsity & JV", address: "50 Rice Street, Wellesley, MA 02481" },
    { name: "Hunnewell Fields", address: "50 Smith Street, Wellesley, MA 02482" },
  ]},
  { town: "Westford", fields: [
    { name: "VFW Field (Forge Field)", address: "8 West Prescott St, Westford, MA 01886" },
    { name: "Stony Brook Field", address: "9 Farmer's Way, Westford, MA 01886" },
    { name: "Robinson Field", address: "88 Robinson Road, Westford, MA 01886" },
    { name: "Westford Academy", address: "40 Patten Road, Westford, MA 01886" },
  ]},
  { town: "Weston", fields: [
    { name: "Weston High School", address: "350 Wellesley Street, Weston, MA 02493" },
    { name: "Cambridge School of Weston", address: "130 Georgian Road, Weston, MA 02493" },
    { name: "Middle School Field", address: "456 Wellesley St, Weston, MA 02493" },
  ]},
  { town: "Wilmington", fields: [
    { name: "Wilmington High School", address: "159 Church Street, Wilmington, MA 01887" },
  ]},
  { town: "Winchester", fields: [
    { name: "Manchester Field", address: "Mystic Valley Parkway, Winchester, MA 01890", notes: "Behind McCall Middle School" },
    { name: "Skillings Field", address: "Skillings Road, Winchester, MA 01890", notes: "Next to Commuter Rail line" },
    { name: "McDonald Field", address: "Wendell Street off Loring Ave, Winchester, MA 01890" },
    { name: "Lynch Field", address: "10 Brantwood Road, Winchester, MA 01890" },
  ]},
  { town: "Winthrop", fields: [
    { name: "Miller Field", address: "400 Main Street, Winthrop, MA 02152", notes: "Behind the High School" },
    { name: "Veterans Field", address: "400 Main Street, Winthrop, MA 02152", notes: "Behind the High School" },
    { name: "Ingleside Park Field", address: "Walden Ave, Winthrop, MA 02152", notes: "Behind the Larsen Skating Arena" },
  ]},
  { town: "Woburn", fields: [
    { name: "Leland Park", address: "87 Central Street, Woburn, MA 01801" },
    { name: "Ferullo Field", address: "875 Main Street, Woburn, MA 01801" },
  ]},
];

// ═══════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════

export default function FieldsPage() {
  const [search, setSearch] = useState("");
  const searchLower = search.toLowerCase();

  const filtered = search
    ? FIELD_LOCATIONS.filter(t =>
        t.town.toLowerCase().includes(searchLower) ||
        t.fields.some(f => f.name.toLowerCase().includes(searchLower) || f.address.toLowerCase().includes(searchLower))
      )
    : FIELD_LOCATIONS;

  const totalFields = FIELD_LOCATIONS.reduce((sum, t) => sum + t.fields.length, 0);

  return (
    <main>
      <PageHeader
        title="Field"
        accent="Locations"
        subtitle={`${totalFields} approved fields across ${FIELD_LOCATIONS.length} towns in Greater Boston.`}
        breadcrumb={[{ label: "League", href: "/league" }]}
      />

      <Section>
        {/* Search */}
        <div>
          <div className="mb-8">
            <input
              type="text"
              placeholder="Search by town, field name, or address..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full max-w-md bg-[#0d1117] border border-white/[0.06] rounded-lg px-4 py-2.5 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[#17FC13]/30 transition-all"
            />
          </div>
        </div>

        {/* Town list */}
        <div className="space-y-8">
          {filtered.map((town, ti) => (
            <div key={town.town}>
              <div>
                {/* Town header */}
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-lg font-bold uppercase tracking-wide">{town.town}</h3>
                  <div className="flex-1 h-px bg-gradient-to-r from-white/[0.06] to-transparent" />
                  <span className="text-[10px] font-mono text-white/40">{town.fields.length} field{town.fields.length > 1 ? "s" : ""}</span>
                </div>

                {/* Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {town.fields.map(f => {
                    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(f.name + ", " + f.address)}`;
                    return (
                      <div key={f.name} className="bg-[#0d1117] rounded-xl border border-white/[0.04] p-4 hover:border-[#17FC13]/10 transition-all">
                        <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-[#17FC13] hover:underline no-underline">{f.name}</a>
                        <div className="text-[12px] text-white/60 leading-relaxed mt-1">{f.address}</div>
                        {f.notes && (
                          <div className="text-[11px] text-[#17FC13]/50 mt-2 italic">{f.notes}</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-white/30 text-sm">No fields match your search.</div>
        )}
      </Section>
    </main>
  );
}
