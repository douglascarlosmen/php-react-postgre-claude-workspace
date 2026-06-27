**PRODUCT REQUIREMENTS DOCUMENT (PRD) - PROJETO 78KG APP (CAPACITOR EDITION)**

## **1. Product Overview and Objectives**

The "Projeto 78kg" application is a personal, strictly offline tool designed for an Android tablet. Its primary objective is to guide, automatically and without friction, the daily execution of a combat preparation protocol lasting 161 days (23 weeks). The app manages the weight reduction from a starting point of 86 kg to a target of 78 kg, removing the mental burden of daily planning. Discipline is non-negotiable, and the app serves as the daily execution manual.

**Key Requirement:** The application must run **exclusively in landscape mode (horizontal)**. Vertical orientation must be disabled. All User Interface (UI) text, notifications, and content within the application must remain in **Brazilian Portuguese (PT-BR)** to facilitate the user's daily tracking.

---

## **2. Technical Specifications (Web-to-Native Stack)**

* **UI Framework:** React + Vite (or Next.js with static export) paired with Tailwind CSS for building fast, responsive layout components.
* **Native Wrapper:** **Capacitor**. It compiles the core web application codebase directly into an installable APK for the Android tablet.
* **Orientation Lock:** Strictly locked to `landscape` mode via `capacitor.config.ts` parameters or native modification in the `AndroidManifest.xml` file.


* **Storage (Local Database):** Official `@capacitor-community/sqlite` plugin for historical weight logs and daily metrics. The native Capacitor `Preferences` API will handle saving the current day's completed habits checklist. 100% offline, requiring zero external API integrations.


* **State Management:** Zustand for lightweight global state (e.g., current day of the week and checklist progress tracking).


* **Navigation:** React Router DOM (optimized for a landscape viewport, using bottom navigation Tabs or a prominent left-hand Sidebar/Drawer to seamlessly switch between *Painel*, *Diário*, *Nutrição*, *Treino*, and *Mental*).


* **QA & Automated Testing:** Cypress or Playwright for End-to-End (E2E) browser automation testing, validating all layouts and state logic before deploying the production build via Capacitor.
* **Build Pipeline:** Standard GitHub Actions for building web assets or Ionic Appflow to generate the Android APK in the cloud without local Android Studio maintenance.

---

## **3. Local Database Structure (Capacitor SQLite)**

* **Table `daily_logs`:**
* `id` (TEXT, PK): Date in YYYY-MM-DD format.


* `weight` (REAL): Weight recorded before sleeping.


* `fatigue_level` (INTEGER): Fatigue level noted at the end of the day.


* `lessons_learned` (TEXT): Notes on what was learned that day.


* `water_intake` (INTEGER): Daily water intake tracking (goal is 4 to 5 liters).




* **Table `habits_tracking`:**
* `id` (TEXT, PK): Date in YYYY-MM-DD format.


* `visualization_done` (BOOLEAN): 10 minutes of Neuromotor Visualization completed.


* `pre_workout_done` (BOOLEAN): Pre-workout anchoring routine executed.


* `post_workout_done` (BOOLEAN): Post-workout carbohydrate meal and 5g of creatine ingested.


* `reading_done` (BOOLEAN): Reading of 15 to 20 pages of mandatory books completed.





---

## **4. Interface Flow and Core Features (UI Text in PT-BR)**

### **Module 1: Main Dashboard (Painel Inicial)**

* **Dynamic Header:** Reads the tablet's system date. Includes a static countdown in days calculating the time remaining until the combat date: "5 de Dezembro de 2026". (Start date fixed at "27 de Junho de 2026").


* **Trend Chart:** A clean line chart (implemented with web libraries like Recharts or Chart.js) extracting `weight` data from the local SQLite table, displaying the descending line from "86 kg" to the "78 kg" target.


* **Daily Summary Card (Resumo do Dia):** A large, prominent banner that changes dynamically based on the current day of the week:


* Monday: "Corrida Leve (LISS) + Boxe (Técnica e Saco) + Treino Mental".


* Tuesday: "Musculação (Treino A - Força) + Exercícios Defensivos (Fita de Esquiva)".


* Wednesday: "Corrida (HIIT/Tiros) + Boxe (10 Rounds Saco Intenso)".


* Thursday: "Musculação (Treino B - Explosão) + Boxe (Movimentação/Footwork)".


* Friday: "Corrida Leve (LISS) + Agilidade/Alongamento (Recuperação para o Sparring)".


* Saturday: "Dia de Guerra - Treino na Academia (Regras do Mestre) + Sparring".


* Sunday: "Descanso Ativo (Caminhada leve) + Planejamento da Semana".





### **Module 2: Routine and Habits (Diário)**

* **Daily Checklist:** Landscape-optimized "Tap to Complete" toggle buttons for:


* "Visualização Neuromotora (10 min)".


* "Rotina Pré-Treino" (anchoring, hand wraps in the same order, specific music).


* "Pós-Treino" (Carbohydrate meal + 5g Creatine).


* "Leitura Noturna" (15 to 20 pages).




* **End of Day Log (Fechamento do Dia):** A full-width night-time form to input "Peso", "Nível de cansaço", and "O que aprendeu hoje" before sleeping.


* **Water/Creatine Tracker:** Simple counter UI to track cups/bottles aiming for "4 a 5 litros" along with a quick checkbox for the "3 a 5g de Creatina" daily intake.



### **Module 3: Smart Nutrition (O Combustível)**

The app checks the day of the week and displays *exclusively* the correct dietary scenario, hiding all others to eliminate decision fatigue.

* **Sundays (Cenário A - Foco na Recuperação):**
* Café: "2 ovos inteiros + 3 claras + 1 pão francês (50g) + 15g requeijão + 1 banana (100g) + 30g proteína de soja.".


* Almoço & Jantar: "100g arroz branco + 80g feijão + 100g carne magra + 100g legumes.".


* Lanche: "80g frango grelhado + 1 pão francês + 15g requeijão + 1 banana + 1 maçã.".




* **Mon, Tue, Thu, Fri (Cenário B - Foco no Equilíbrio):**
* Displays banner: "Atenção: A sexta-feira usa o cenário B para não estourar as calorias, mas garante nutrientes suficientes para poupar os músculos para o sábado.".


* Café: Increases macros to "35g" of soy protein and "20g" of requeijão.


* Almoço & Jantar: Increases to "140g arroz + 100g feijão + 110g carne + 120g legumes.".


* Lanche: Updates to "100g frango + 1 pão francês + 20g requeijão + 1 banana + 1 maçã.".




* **Wed and Sat (Cenário C - Foco na Energia e Explosão):**
* Displays banner: "Sábado é o dia em que o Mestre vai te testar. Você precisa desse combustível.".


* Café: Max macros with "2 ovos + 4 claras + 1,5 pão francês (75g) + 25g requeijão + 1 banana grande (150g) + 40g proteína soja.".


* Almoço & Jantar: "180g arroz + 120g feijão + 120g carne + 150g legumes.".


* Lanche (Pré-Treino de Sábado): "120g frango + 1,5 pão francês + 25g requeijão + 1 banana grande + 1 maçã grande.".





### **Module 4: Workout Execution (Condicionamento e Musculação)**

Conditional interface displaying only the current day's workout parameters.

* **Running Days (Roadwork):**
* Mondays & Fridays: Instructs "45 a 60 minutos" of LISS at "Horto Florestal".


* Fridays: Includes a post-run checklist for "Agilidade" (short running intervals, burpees, footwork) at "Parque Zilda Natel".


* Wednesdays: Built-in JavaScript web timer for "Represa Marcelo Pedroni" programmed with a "10 min" warm-up and 8 automatic cycles of "20 a 30 segundos" max effort / "1 a 2 minutos" walking rest.




* **Weightlifting Days (Musculação na Academia):**
* Tuesday (Treino A - Base): "Agachamento com Barra (4x 6-8), Supino Reto (4x 6-8), Barra Fixa (4x 8-10), Lunge com Halteres (3x 10), Prancha Lateral (3x 40 seg)".


* Thursday (Treino B - Explosão): "Levantamento Terra (4x 5), Arremesso de Slam Ball (3x 10-12), Kettlebell Swings (3x 12-15), Flexão Pliométrica (3x 6-8), Russian Twists (3x 20)".




* **Technical Training (Boxe):**
* Wednesdays: An interactive landscape layout timer for "Protocolo de 10 Rounds" (3 mins action / 1 min rest). The screen displays the current round's objective in massive fonts: R1 "Calibração", R2 "Base Invertida", R3 "Head Movement", R4-R6 "Ritmo de Combate", R7 "Inteligência e Fintas", R8 "Velocidade Tabata" (with 15s internal audio trigger beeps), R9 "Nocaute", R10 "Inside Fighting".


* Tuesdays & Thursdays: Checklists for "Fita de Esquiva (Slip Line)" and "Pular Corda (4 a 5 rounds)".


* Saturdays (O Domínio do Mestre): The screen locks out automated timers and displays: "Faça exatamente o que ele mandar no aquecimento, na técnica e no sparring.". Includes a mandatory checkbox to perform the "Self-Tapping" routine before leaving home.





### **Module 5: Mental Armor (A Blindagem)**

* **Progression Library:** A visual tracker ensuring reading progress is kept in the exact mandatory order:


1. "Nada Pode Me Ferir (Can't Hurt Me)".


2. "O Caminho da Luta (The Way of the Fight)".


3. "A Verdade Nua e Crua (Undisputed Truth)".


4. "Mindfighter: Neurociência e Psicologia para as Lutas".


5. "Meditações".




* **Desensitization Tools:**
* Written text guide for "Visualização (10 min/dia)", focusing on 1st-person perspective in chaotic scenarios (fatigue, taking a hard hit) and practicing stoic reactions: "recuar, fechar a guarda, respirar e continuar".


* Instructions for the "Self-Tapping" technique: hitting own face/forehead lightly with gloves while keeping eyes open and not blinking.




* **SOS Panic Modal (Respiração de Crise 4-6):** A prominent button for pre-sparring anxiety. When pressed, the web UI switches to an CSS-animated breathing component: an expanding circle for "4 segundos" (pull air through belly) and a contracting circle for "6 segundos" (release slowly), repeating automatically "10 vezes".