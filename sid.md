Here are the extracted CLI prompts designed for modular execution in agentic coding environments (such as Claude Code, Cursor CLI, or Aider):

Prompt 0: Project Setup and Rules (CLAUDE.md)
Directory and File Boundaries:

index.html: Base semantic markup, Tailwind layout scaffolding, and UI containers.

css/custom.css: Specialized animations, clipping masks, range slider styling, and CRT retro effects.

js/audio.js: Programmatic Web Audio API synthesizer module (zero external audio files).

js/game.js: HTML5 Canvas degradation engine, entity management, and collision loops.

js/app.js: DOM manipulation, before/after slider event listeners, and roast quote arrays.

assets/: Reserved directory for photographic assets (bulk_car.jpg, thin_kurta.jpg, thin_dog.jpg, bulk_beach.jpg).

Behavioral Rules for the CLI Agent:

Never overwrite or refactor functional modules unless explicitly instructed.

Always run syntax verification (node -c <file>) following modifications.

Maintain strict separation of concerns; the game engine must not directly mutate UI DOM states outside its container callbacks.

<output_format>
Generate a raw, highly structured CLAUDE.md containing sections: Core Architecture, File Layout, Coding Standards, Terminal Verification Commands, and Safety Invariants.
</output_format>

Prompt 1: Parody Layout and Morph Slider
Hero Section ("The Physics of Displacement"):

Headline: "SIDDHANT SAGAR: MAXIMUM DISPLACEMENT."

Sub-headline: "A chronicle of caloric triumphs, heavy-duty fabrics, and the unstoppable emergence of BigFatHondu."

Metric Banner (4-column responsive grid):

"Current Mass Tier: Heavy Duty"

"0-100m Sprint: Eventually"

"Puma Hoodie Tensile Strain: 99.2%"

"Gravitational Orbit: Measurable"

The "Mass Spectrometer" Comparison Slider:

Container holding two overlapping images with identical aspect ratios:

Foreground Image: assets/thin_kurta.jpg (Vintage Era: Slim Siddhant)

Background Image: assets/bulk_car.jpg (Modern Era: BigFatHondu)

Implement horizontal mask division via CSS clip-path: polygon() or dynamic container width adjustments.

Centered draggable divider handle equipped with an SVG bi-directional indicator.

Native touch (touchstart, touchmove) and mouse (mousedown, mousemove) listener support.

Real-time text display showing "Mass Expansion Index: [X]%."

The Evolutionary Timeline:

Card 1: "The Aerodynamic Seed" (assets/thin_dog.jpg) — "Negligible wind resistance; effortlessly outpaced domestic canines."

Card 2: "The Tailored Kurta Era" (assets/thin_kurta.jpg) — "Structural fabric drape with zero tensile stress; distinct jawline profile."

Card 3: "The Shoreline Anchor" (assets/bulk_beach.jpg) — "Coastal breezes successfully diverted; solid low-center-of-gravity stance."

Card 4: "The Automotive Benchmark" (assets/bulk_car.jpg) — "Leaning against the SUV; suspension springs experience measurable compression."

Defensive Rendering:

Provide high-contrast SVG base64 fallbacks for image tags in the event local files are temporarily absent.

Prompt 2: Degradation Canvas Engine (game.js)
Morphological Character Engine:

Procedural rendering of the runner using Canvas 2D path methods (head, torso, legs, and oversized hoodie).

Dynamic sizing tiers:

Tier 1 (Slim): Width 28px, Height 60px. Agile stride, jump velocity vy = -14.0, gravity g = 0.55.

Tier 2 (Husky): Width 48px, Height 60px. Jump velocity vy = -11.0, gravity g = 0.72.

Tier 3 (BigFatHondu): Width 74px, Height 60px. Jump velocity vy = -7.5, gravity g = 0.98.

Tier 4 (Terminal Singularity): Width 96px, Height 60px. Jump velocity vy = -3.8, gravity g = 1.40.

Item and Hazard Generation:

Caloric Pickups (Samosas, Double Burgers, Thick Shakes):

Awards score (+150 pts), increments mass scalar (m = m + 0.2), expands sprite width by 6px, increases stamina burn rate.

Cardio Traps (Treadmills, Dumbbells, Salads):

Collision causes instant stumbling, inflicting 40% immediate stamina damage.

The Inevitable Stamina Burn Engine:

Stamina starts at 100%.

Continuous depletion equation: Stamina = Stamina - (lambda_base * (m^2.2) * dt).

Jump exertion cost: 8.0 * m.

Guaranteed Collapse: When stamina drops to 0, trigger character collapse animation, execute 500ms viewport shake, halt horizontal motion, and trigger modal:
"TERMINAL INERTIA REACHED: Hondu has succumbed to atmospheric drag and caloric density."

Display final metrics: Distance Traversed, Caloric Load Absorbed, and Mass Displacement Rating.

Input Handling:

Listeners for Spacebar, ArrowUp, and screen touchstart.

Provide an idempotent resetGame() function.

Prompt 3: Web Audio API Procedural Synthesizer (audio.js)
Programmatic Synthesis Methods:

playJumpSound(massTier):

If massTier == 1: Sine oscillator ramping rapidly from 320Hz to 640Hz over 90ms.

If massTier >= 3: Low triangle oscillator sweeping downwards from 140Hz to 50Hz over 280ms with gain saturation.

playEatSound():

Fast two-stage square arpeggio (C5 to G5) decaying within 100ms.

playHeavyThud():

Sub-bass sine pulse (65Hz decaying exponentially to 20Hz over 220ms) to accompany heavy landings.

playCardioDamageSound():

Dissonant, frequency-modulated sawtooth buzz indicating exercise contact.

playGameOverFanfare():

Descending brass-like chords using filtered sawtooth waves (G#3 -> G3 -> F#3 -> F3).

playUiClick():

Crisp 15ms high-frequency audio blip for DOM button presses.

Module Export:

Expose the entire engine under window.HonduAudio.

Prompt 4: Micro-Interactions, Roasts, and System Integration
The Roast Generation Engine:

Interactive container: "The Hondu Oracle: Automated Observations."

Button: "Request New Appraisal."

Cycles randomly through 12 curated roasts:

"Siddhant did not gain weight; he expanded his surface area to absorb more cosmic energy."

"In 2019, he could slide through turnstiles sideways. Today, turnstiles request advance notice."

"That Puma hoodie is no longer sportswear; it is an engineering marvel under structural tension."

"The parked SUV behind him is actually seeking shelter from his gravitational pull."

"His resting metabolic rate took early retirement in 2021."

"He does not jog; he merely forces the earth to rotate under his sneakers."

"A true gentleman: his shadow now shields three friends from the afternoon sun."

"His center of gravity is so low it borders on geological."

Live Tensile Monitor:

Dynamic progress bar representing "Puma Hoodie Fiber Strain."

Constantly oscillates between 97.5% and 99.9% with a red alert pulse.

Cross-Module Event Hooking:

Hook canvas game jump events directly to window.HonduAudio.playJumpSound(currentTier).

Hook item collection to window.HonduAudio.playEatSound().

Hook terminal collapse directly to window.HonduAudio.playGameOverFanfare().

Prompt 5: Verification and Local Testing Pipeline
<verification_steps>

Execute terminal syntax analysis across all scripts:
node -c js/audio.js
node -c js/game.js
node -c js/app.js

Verify file asset path mappings:

Ensure the image paths correctly point to assets/bulk_car.jpg, assets/thin_kurta.jpg, assets/thin_dog.jpg, and assets/bulk_beach.jpg.

Ensure embedded SVG fallbacks are active if the photographic assets are missing.

Verify Canvas Gameplay Logic:

Confirm player hitbox dynamically expands upon consuming snacks.

Confirm stamina drains quadratically with mass.

Confirm game over triggers reliably when stamina reaches zero.

