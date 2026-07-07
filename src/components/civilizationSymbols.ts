/**
 * Raw SVG markup for the three civilization emblems shown on the
 * home page. Kept as strings and rendered via dangerouslySetInnerHTML
 * because they are static, author-controlled decorative assets whose
 * embedded CSS animation hooks (class names referenced from main.css)
 * are easiest to preserve verbatim from the original artwork.
 */

export const persiaSymbol = `<svg aria-label="Achaemenid Persian Griffin, Shirdal" fill="none" viewbox="0 0 200 130" xmlns="http://www.w3.org/2000/svg">
<defs>
<lineargradient id="gs-body" x1="0" x2="0" y1="0" y2="1">
<stop offset="0%" stop-color="#d4a040"></stop>
<stop offset="50%" stop-color="#a87828"></stop>
<stop offset="100%" stop-color="#7a5518"></stop>
</lineargradient>
<lineargradient gradientunits="userSpaceOnUse" id="gs-wing" x1="100" x2="100" y1="20" y2="80">
<stop offset="0%" stop-color="#f0cc6a"></stop>
<stop offset="60%" stop-color="#c9920e"></stop>
<stop offset="100%" stop-color="#7a5518" stop-opacity="0.5"></stop>
</lineargradient>
<radialgradient cx="45%" cy="55%" id="gs-glow" r="50%">
<stop offset="0%" stop-color="#f5deb3" stop-opacity="0.2"></stop>
<stop offset="100%" stop-color="#c96820" stop-opacity="0"></stop>
</radialgradient>
<filter id="gs-relief">
<fegaussianblur in="SourceAlpha" result="b" stddeviation="0.5"></fegaussianblur>
<feoffset dx="0.4" dy="0.7" result="o"></feoffset>
<fecomposite in="SourceGraphic" in2="o" operator="over"></fecomposite>
</filter>
</defs>
<!-- ══ LION BODY ══ -->
<!-- Main torso + haunches — long horizontal lion form -->
<g filter="url(#gs-relief)">
<!-- Upper back / spine line -->
<path d="M52,62 C80,58 120,56 155,60 C160,62 162,65 160,68" fill="none" opacity="0.3" stroke="#7a5518" stroke-width="0.5"></path>
<!-- Body mass -->
<path d="M55,65 C80,60 125,58 155,62 C162,67 162,80 155,85
                            C130,90 90,90 60,88 C48,85 45,78 48,70 Z" fill="url(#gs-body)" opacity="0.95"></path>
<!-- Belly line -->
<path d="M60,88 C90,93 130,93 155,88" fill="none" opacity="0.4" stroke="#7a5518" stroke-width="0.5"></path>
<!-- Rib/flank muscle lines (bas-relief carving detail) -->
<path d="M90,60 Q92,74 90,88" fill="none" opacity="0.4" stroke="#7a5518" stroke-width="0.7"></path>
<path d="M105,59 Q107,73 105,88" fill="none" opacity="0.35" stroke="#7a5518" stroke-width="0.6"></path>
<path d="M120,58 Q122,73 120,88" fill="none" opacity="0.3" stroke="#7a5518" stroke-width="0.6"></path>
<!-- Haunch muscle (lion's powerful rear quarter) -->
<path d="M138,60 C148,60 158,64 160,72 C161,78 158,84 155,85" fill="none" opacity="0.5" stroke="#9a6c20" stroke-width="1"></path>
</g>
<!-- ══ EAGLE TALONS — front feet ══ -->
<g filter="url(#gs-relief)" opacity="0.9">
<!-- Front left leg -->
<path d="M65,88 L62,100 L60,108" fill="none" stroke="#a07428" stroke-linecap="round" stroke-width="2.5"></path>
<!-- Three talons left -->
<path d="M60,108 C55,111 50,112 48,110" fill="none" stroke="#8a6020" stroke-linecap="round" stroke-width="1.4"></path>
<path d="M60,108 C57,113 56,117 56,117" fill="none" stroke="#8a6020" stroke-linecap="round" stroke-width="1.4"></path>
<path d="M60,108 C63,112 65,116 64,117" fill="none" stroke="#8a6020" stroke-linecap="round" stroke-width="1.4"></path>
<!-- Front right leg -->
<path d="M85,88 L84,100 L83,108" fill="none" stroke="#a07428" stroke-linecap="round" stroke-width="2.5"></path>
<!-- Three talons right -->
<path d="M83,108 C78,111 73,112 71,110" fill="none" stroke="#8a6020" stroke-linecap="round" stroke-width="1.4"></path>
<path d="M83,108 C80,113 79,117 79,117" fill="none" stroke="#8a6020" stroke-linecap="round" stroke-width="1.4"></path>
<path d="M83,108 C86,112 88,116 87,117" fill="none" stroke="#8a6020" stroke-linecap="round" stroke-width="1.4"></path>
</g>
<!-- ══ LION PAWS — rear feet ══ -->
<g filter="url(#gs-relief)" opacity="0.85">
<!-- Rear left leg -->
<path d="M130,88 C128,96 126,103 124,110" fill="none" stroke="#a07428" stroke-linecap="round" stroke-width="3"></path>
<!-- Paw toes left (blunt, not talons) -->
<path d="M124,110 C120,113 117,114 116,112" fill="none" stroke="#8a6020" stroke-linecap="round" stroke-width="1.3"></path>
<path d="M124,110 C122,114 121,117 121,117" fill="none" stroke="#8a6020" stroke-linecap="round" stroke-width="1.3"></path>
<path d="M124,110 C126,114 128,116 127,117" fill="none" stroke="#8a6020" stroke-linecap="round" stroke-width="1.3"></path>
<!-- Rear right leg -->
<path d="M148,86 C148,95 148,102 148,110" fill="none" stroke="#a07428" stroke-linecap="round" stroke-width="3"></path>
<!-- Paw toes right -->
<path d="M148,110 C144,113 141,114 140,112" fill="none" stroke="#8a6020" stroke-linecap="round" stroke-width="1.3"></path>
<path d="M148,110 C146,114 145,117 145,117" fill="none" stroke="#8a6020" stroke-linecap="round" stroke-width="1.3"></path>
<path d="M148,110 C151,114 153,116 152,117" fill="none" stroke="#8a6020" stroke-linecap="round" stroke-width="1.3"></path>
</g>
<!-- ══ LION TAIL — curled upward with tuft ══ -->
<g class="griffin-tail" filter="url(#gs-relief)">
<!-- Tail curves up then curls into Persepolis volute -->
<path d="M157,70 C165,65 172,60 175,52 C177,46 174,41 169,42 C164,43 162,49 164,56" fill="none" stroke="#c9920e" stroke-linecap="round" stroke-width="2.8"></path>
<!-- Volute curl at tip -->
<path d="M164,56 C166,50 170,48 172,51 C174,54 171,59 167,59 C164,59 162,56 164,53" fill="none" opacity="0.9" stroke="#e8b84b" stroke-linecap="round" stroke-width="1.3"></path>
<!-- Lion tail tuft (hair bristles at very end) -->
<path d="M175,52 C177,48 179,45 178,42" fill="none" opacity="0.7" stroke="#e8c060" stroke-linecap="round" stroke-width="1.2"></path>
<path d="M175,52 C178,49 181,47 181,44" fill="none" opacity="0.6" stroke="#c9920e" stroke-linecap="round" stroke-width="1"></path>
<path d="M175,52 C177,52 180,52 181,50" fill="none" opacity="0.55" stroke="#b8832a" stroke-linecap="round" stroke-width="0.9"></path>
</g>
<!-- ══ EAGLE WINGS — sprout from lion's shoulder/back ══ -->
<!-- Upper wing: sweeping back over body -->
<g class="griffin-wings-left" filter="url(#gs-relief)">
<!-- Primary wing layer — large broad sweep upward -->
<path d="M72,64 C62,52 44,40 22,30 C8,24 2,26 4,32
                            C14,28 28,32 50,44 C68,54 76,64 78,68 Z" fill="url(#gs-wing)" opacity="0.92"></path>
<!-- Secondary feather row -->
<path d="M72,68 C60,58 42,48 22,38 C10,32 4,34 6,40
                            C16,36 30,40 52,52 C68,60 74,68 78,72 Z" fill="#c9920e" opacity="0.7"></path>
<!-- Tertiary row -->
<path d="M74,73 C64,65 50,57 36,52 C24,47 14,48 12,53
                            C20,50 34,52 50,58 C64,64 72,72 76,76 Z" fill="#e8b84b" opacity="0.5"></path>
<!-- Covert row -->
<path d="M75,78 C67,72 56,67 46,64 C36,61 28,62 26,66
                            C34,63 44,64 56,68 C68,72 74,78 76,80 Z" fill="#f0cc6a" opacity="0.32"></path>
<!-- Primary feather tip engravings -->
<line opacity="0.85" stroke="#6a4810" stroke-linecap="round" stroke-width="1" x1="6" x2="2" y1="32" y2="40"></line>
<line opacity="0.8" stroke="#6a4810" stroke-linecap="round" stroke-width="0.9" x1="14" x2="10" y1="30" y2="38"></line>
<line opacity="0.75" stroke="#7a5518" stroke-linecap="round" stroke-width="0.9" x1="22" x2="18" y1="29" y2="37"></line>
<line opacity="0.7" stroke="#7a5518" stroke-linecap="round" stroke-width="0.8" x1="30" x2="26" y1="30" y2="38"></line>
<line opacity="0.65" stroke="#8a6520" stroke-linecap="round" stroke-width="0.8" x1="38" x2="35" y1="32" y2="40"></line>
<line opacity="0.6" stroke="#9a7028" stroke-linecap="round" stroke-width="0.7" x1="46" x2="43" y1="36" y2="44"></line>
<line opacity="0.55" stroke="#9a7028" stroke-linecap="round" stroke-width="0.7" x1="54" x2="52" y1="40" y2="48"></line>
<line opacity="0.5" stroke="#b8832a" stroke-linecap="round" stroke-width="0.6" x1="62" x2="60" y1="46" y2="54"></line>
<!-- Feather scallop quill rows -->
<path d="M10,38 Q28,36 46,40 Q62,44 72,52" fill="none" opacity="0.45" stroke="#6a4810" stroke-width="0.6"></path>
<path d="M16,46 Q34,44 50,48 Q64,52 74,58" fill="none" opacity="0.38" stroke="#7a5518" stroke-width="0.5"></path>
<path d="M24,54 Q40,52 56,56 Q68,59 76,65" fill="none" opacity="0.3" stroke="#8a6020" stroke-width="0.5"></path>
</g>
<!-- ══ EAGLE NECK ══ -->
<g filter="url(#gs-relief)">
<!-- Neck arching forward and upward, strong eagle posture -->
<path d="M58,65 C54,56 52,46 54,38 C56,31 61,28 64,31
                            C67,35 66,46 64,64 Z" fill="url(#gs-body)" opacity="0.95"></path>
<!-- Neck feather rows -->
<path d="M58,60 Q61,57 64,60" fill="none" opacity="0.5" stroke="#7a5518" stroke-width="0.6"></path>
<path d="M57,54 Q61,51 64,54" fill="none" opacity="0.45" stroke="#7a5518" stroke-width="0.6"></path>
<path d="M57,48 Q61,46 64,48" fill="none" opacity="0.4" stroke="#7a5518" stroke-width="0.5"></path>
<!-- Neck-body feather ruff -->
<path d="M54,65 Q62,61 70,65 Q65,70 58,69 Z" fill="#c9920e" opacity="0.55"></path>
</g>
<!-- ══ EAGLE HEAD — profile facing right ══ -->
<g filter="url(#gs-relief)">
<!-- Head mass -->
<ellipse cx="66" cy="28" fill="url(#gs-body)" opacity="0.95" rx="13" ry="10"></ellipse>
<!-- Fierce hooked eagle beak — the defining feature -->
<!-- Upper mandible: curves sharply down -->
<path d="M76,24 C83,21 91,21 93,24 C93,28 89,31 83,30 C87,28 88,25 84,25 Z" fill="#c9920e" opacity="0.92"></path>
<path d="M76,24 C82,21 88,21 93,24" fill="none" opacity="0.7" stroke="#7a5518" stroke-width="0.8"></path>
<!-- Lower mandible (slightly open) -->
<path d="M77,28 C82,30 87,30 90,28" fill="none" opacity="0.6" stroke="#9a6c20" stroke-width="0.7"></path>
<!-- Mouth gap line -->
<path d="M77,27 C82,27 87,27 90,26" fill="none" opacity="0.5" stroke="#5a3808" stroke-width="0.5"></path>
<!-- Eagle eye — large, fierce, with pronounced orbital brow -->
<ellipse cx="70" cy="25" fill="#1a0c00" opacity="0.92" rx="4" ry="3"></ellipse>
<ellipse cx="70" cy="25" fill="#e8b84b" opacity="0.5" rx="2" ry="1.5"></ellipse>
<circle cx="71" cy="24.5" fill="#fff" opacity="0.35" r="0.6"></circle>
<!-- Brow ridge: prominent sharp angle = fierce eagle expression -->
<path d="M66,22 L72,21 L75,23" fill="none" opacity="0.75" stroke="#5a3808" stroke-linecap="round" stroke-width="1"></path>
<path d="M66,22 L72,21 L75,23" fill="none" opacity="0.3" stroke="#e8b84b" stroke-linecap="round" stroke-width="0.4"></path>
<!-- ══ CREST PLUMES — CSS griffin-crest-a/b/c ══ -->
<path class="griffin-crest-a" d="M60,22 C58,15 56,9 55,4 C57,8 59,14 60,21 Z" fill="#e8b84b" opacity="0.88"></path>
<path class="griffin-crest-b" d="M63,21 C62,14 61,8 61,3 C62,7 63,13 63,20 Z" fill="#f0cc6a" opacity="0.8"></path>
<path class="griffin-crest-c" d="M66,20 C66,13 67,7 67,2 C67,6 67,12 67,20 Z" fill="#c9920e" opacity="0.72"></path>
<!-- Crest base volute -->
<path d="M58,24 C56,21 55,18 57,17 C59,16 62,18 61,21" fill="none" opacity="0.65" stroke="#e8b84b" stroke-linecap="round" stroke-width="1"></path>
<!-- Ear tuft (Achaemenid griffins have pointed ear tufts) -->
<path d="M58,20 C56,16 55,12 57,10 C58,14 58,17 58,20 Z" fill="#c9920e" opacity="0.6"></path>
</g>
<!-- ══ TORCH-LIGHT GLOW — CSS griffin-glow ══ -->
<ellipse class="griffin-glow" cx="95" cy="72" fill="url(#gs-glow)" rx="85" ry="50"></ellipse>
<!-- ══ STONE GRAIN TEXTURE ══ -->
<g fill="#f5deb3" opacity="0.1">
<circle cx="72" cy="72" r="0.8"></circle><circle cx="90" cy="68" r="0.7"></circle>
<circle cx="110" cy="65" r="0.8"></circle><circle cx="128" cy="66" r="0.7"></circle>
<circle cx="145" cy="68" r="0.8"></circle><circle cx="80" cy="80" r="0.6"></circle>
<circle cx="98" cy="79" r="0.7"></circle><circle cx="116" cy="79" r="0.8"></circle>
<circle cx="134" cy="78" r="0.7"></circle><circle cx="152" cy="75" r="0.6"></circle>
<circle cx="60" cy="76" r="0.7"></circle><circle cx="70" cy="85" r="0.8"></circle>
</g>
</svg>`;

export const egyptSymbol = `<svg fill="none" height="60" viewbox="0 0 60 60" width="60" xmlns="http://www.w3.org/2000/svg">
<!-- Pyramid silhouette, static base -->
<polygon fill="none" opacity="0.55" points="30,36 50,54 10,54" stroke="#d4a017" stroke-width="0.7"></polygon>
<line opacity="0.2" stroke="#d4a017" stroke-width="0.3" x1="30" x2="30" y1="36" y2="54"></line>
<line opacity="0.2" stroke="#d4a017" stroke-width="0.3" x1="10" x2="50" y1="54" y2="54"></line>
<!-- Nile horizon line -->
<line opacity="0.35" stroke="#d4a017" stroke-width="0.5" x1="6" x2="54" y1="54" y2="54"></line>
<!-- Sun disc: orbits in an arc above the pyramid -->
<g>
<!-- Sun halo glow -->
<circle fill="none" opacity="0.2" r="5" stroke="#d4a017" stroke-width="0.4">
<animatemotion calcmode="spline" dur="8s" keypoints="0;0.5;1" keysplines="0.4 0 0.6 1;0.4 0 0.6 1" keytimes="0;0.5;1" repeatcount="indefinite">
<mpath href="#ra-path"></mpath>
</animatemotion>
</circle>
<!-- Sun disc core -->
<circle class="ra-disc-core" fill="#d4a017" opacity="0.9" r="3.5">
<animatemotion calcmode="spline" dur="8s" keypoints="0;0.5;1" keysplines="0.4 0 0.6 1;0.4 0 0.6 1" keytimes="0;0.5;1" repeatcount="indefinite">
<mpath href="#ra-path"></mpath>
</animatemotion>
</circle>
<!-- Sun rays: 8 short lines emanating, travelling with sun -->
<g opacity="0.6">
<line stroke="#d4a017" stroke-linecap="round" stroke-width="0.7" x1="-6" x2="-8" y1="0" y2="0"></line>
<line stroke="#d4a017" stroke-linecap="round" stroke-width="0.7" x1="6" x2="8" y1="0" y2="0"></line>
<line stroke="#d4a017" stroke-linecap="round" stroke-width="0.7" x1="0" x2="0" y1="-6" y2="-8"></line>
<line stroke="#d4a017" stroke-linecap="round" stroke-width="0.7" x1="0" x2="0" y1="6" y2="8"></line>
<line stroke="#d4a017" stroke-linecap="round" stroke-width="0.6" x1="-4.2" x2="-5.7" y1="-4.2" y2="-5.7"></line>
<line stroke="#d4a017" stroke-linecap="round" stroke-width="0.6" x1="4.2" x2="5.7" y1="-4.2" y2="-5.7"></line>
<line stroke="#d4a017" stroke-linecap="round" stroke-width="0.6" x1="4.2" x2="5.7" y1="4.2" y2="5.7"></line>
<line stroke="#d4a017" stroke-linecap="round" stroke-width="0.6" x1="-4.2" x2="-5.7" y1="4.2" y2="5.7"></line>
<animatemotion calcmode="spline" dur="8s" keypoints="0;0.5;1" keysplines="0.4 0 0.6 1;0.4 0 0.6 1" keytimes="0;0.5;1" repeatcount="indefinite">
<mpath href="#ra-path"></mpath>
</animatemotion>
</g>
</g>
<!-- Ra's arc path: rises left, peaks centre-top, sets right -->
<defs>
<path d="M 8,33 Q 30,4 52,33" id="ra-path"></path>
</defs>
<!-- Faint arc trail -->
<path d="M 8,33 Q 30,4 52,33" fill="none" opacity="0.18" stroke="#d4a017" stroke-dasharray="2 3" stroke-width="0.4"></path>
<!-- Eye of Ra / Wadjet — subtle, centred in pyramid -->
<g opacity="0.5" transform="translate(30,46)">
<ellipse cx="0" cy="0" fill="none" rx="5" ry="2.5" stroke="#d4a017" stroke-width="0.5"></ellipse>
<circle cx="0" cy="0" fill="#d4a017" opacity="0.7" r="1.2"></circle>
<path d="M0,2.5 Q2,4.5 4,3" fill="none" stroke="#d4a017" stroke-linecap="round" stroke-width="0.5"></path>
</g>
</svg>`;

export const greekSymbol = `<svg fill="none" height="60" viewbox="0 0 60 60" width="60" xmlns="http://www.w3.org/2000/svg">
<!-- Greek meander / key border (static) -->
<path d="M4,4 L56,4 L56,56 L4,56 Z" fill="none" opacity="0.2" stroke="#a8c4e0" stroke-width="0.5"></path>
<!-- Meander top -->
<path d="M4,4 L12,4 L12,10 L20,10 L20,4 L28,4" fill="none" opacity="0.35" stroke="#a8c4e0" stroke-linecap="square" stroke-width="0.6"></path>
<path d="M32,4 L40,4 L40,10 L48,10 L48,4 L56,4" fill="none" opacity="0.35" stroke="#a8c4e0" stroke-linecap="square" stroke-width="0.6"></path>
<!-- Meander bottom -->
<path d="M4,56 L12,56 L12,50 L20,50 L20,56 L28,56" fill="none" opacity="0.35" stroke="#a8c4e0" stroke-linecap="square" stroke-width="0.6"></path>
<path d="M32,56 L40,56 L40,50 L48,50 L48,56 L56,56" fill="none" opacity="0.35" stroke="#a8c4e0" stroke-linecap="square" stroke-width="0.6"></path>
<!-- Thunderbolt shape: classic winged Zeus bolt -->
<g>
<!-- Main bolt body -->
<path class="bolt-body" d="M34,6 L22,30 L30,30 L26,54 L38,28 L30,28 Z" fill="#a8c4e0" opacity="0.85"></path>
<!-- Bolt bright core -->
<path class="bolt-core" d="M33,10 L24,29 L31,29 L27,50 L36,30 L30.5,30 Z" fill="white" opacity="0"></path>
</g>
<!-- Electric arc sparks emanating from bolt tip -->
<g class="bolt-sparks" opacity="0">
<line stroke="#a8c4e0" stroke-linecap="round" stroke-width="0.8" x1="26" x2="20" y1="54" y2="58"></line>
<line stroke="#a8c4e0" stroke-linecap="round" stroke-width="0.8" x1="26" x2="32" y1="54" y2="58"></line>
<line stroke="#a8c4e0" stroke-linecap="round" stroke-width="0.8" x1="26" x2="26" y1="54" y2="59"></line>
</g>
<!-- Top wing left -->
<path class="bolt-wing" d="M34,6 L28,10 L26,16 L30,14 Z" fill="#a8c4e0" opacity="0.4"></path>
<!-- Top wing right -->
<path class="bolt-wing" d="M34,6 L40,10 L42,16 L38,14 Z" fill="#a8c4e0" opacity="0.4"></path>
<!-- Glow halo behind bolt -->
<ellipse class="bolt-halo" cx="30" cy="30" fill="none" opacity="0" rx="10" ry="22" stroke="#a8c4e0" stroke-width="3"></ellipse>
</svg>`;
